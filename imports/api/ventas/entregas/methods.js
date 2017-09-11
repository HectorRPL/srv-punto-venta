/**
 * Created by jvltmtz on 25/08/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {Empleados} from '../../empleados/collection';
import {VentasEntregas} from './collection';
import {_} from "meteor/underscore";

const CAMPO_ID = ['_id'];
const CAMPOS_VENTAS_ENTREGAS = ['partidaId', 'numProdcutos', 'usuarioSolicitaId', 'tipo'];

export const altaEntrega = new ValidatedMethod({
    name: 'ventasEntregas.altaEntrega',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ventasEntregas.altaEntrega',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasEntregas.simpleSchema().pick(CAMPOS_VENTAS_ENTREGAS).validator({
        clean: true,
        filter: false
    }),
    run({partidaId, numProdcutos, tipo}) {
        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: Meteor.userId()});
            return VentasEntregas.insert(
                {
                    partidaId, numProdcutos,
                    usuarioSolicitaId: empleado._id,
                    tipo
                },
                (err)=> {
                    if (err) {
                        throw new Meteor.Error(500, 'Error al realizar la operación.', 'ventas-entregas-no-creada');
                    }
                }
            );
        }

    }
});

export const asignarEntrega = new ValidatedMethod({
    name: 'ventasEntregas.asignarEntrega',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ventasEntregas.asignarEntrega',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasEntregas.simpleSchema().pick(CAMPO_ID, ['partidaId', 'fechaEntrega',
        'numProductosRechazados', 'tipo', 'observaciones']).validator({
        clean: true,
        filter: false
    }),
    run({_id, partidaId, fechaEntrega, numProductosRechazados, tipo, observaciones}) {
        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: Meteor.userId()});
            return VentasEntregas.update({_id: _id},
                {
                    $set: {
                        partidaId: partidaId,
                        usuarioEntregaId: empleado._id,
                        fechaEntrega: fechaEntrega,
                        numProductosRechazados: numProductosRechazados,
                        tipo: tipo,
                        observaciones: observaciones,
                        entregada: true
                    }
                },
                (err)=> {
                    if (err) {
                        throw new Meteor.Error(500, 'Error al realizar la operación.', 'ventas-entregas-no-actualizada');
                    }
                }
            );
        }

    }
});

export const ventaEntregarMostrador = new ValidatedMethod({
    name: 'ventasEntregas.ventaEntregarMostrador',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['gene_orde_vent_menu'],
            group: 'vendedores'
        }
    ],
    permissionsError: {
        name: 'ventasEntregas.ventaEntregarMostrador',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaOrdenId: {type: String, regEx: SimpleSchema.RegEx.Id},
        entregas: {type: Object, blackbox: true},
    }).validator(),
    run({ventaOrdenId, entregas}) {
        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: Meteor.userId()});
            const props = Object.entries(entregas);
            props.forEach((item)=> {
                const entrega = {
                    partidaId: item[0],
                    ventaOrdenId: ventaOrdenId,
                    numProductos: item[1],
                    usuarioSolicitaId: empleado._id,
                    tipo: 'mostrador'
                };
                return VentasEntregas.insert(entrega, (err)=>{
                    if(err){
                        throw new Meteor.Error(500, 'Error al guardar la entrega en mostrador', 'ventas-entrega-no-insertar');
                    }
                });
            })
        }

    }
});

const ENTREGAS_VENTAS_METHODS = _.pluck(
    [
        altaEntrega,
        asignarEntrega,
        ventaEntregarMostrador
    ], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(ENTREGAS_VENTAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}