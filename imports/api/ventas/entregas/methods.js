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
const CAMPOS_VENTAS_ENTREGAS = ['partidaId', 'tiendaId', 'numProdcutos', 'usuarioSolicitaId', 'tipo'];

export const actualizarVentaEntrega = new ValidatedMethod({
    name: 'ventasEntregas.actualizarVentaEntrega',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_entregas'],
            group: 'ventas_entregas'
        }
    ],
    permissionsError: {
        name: 'ventasEntregas.actualizarVentaEntrega',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasEntregas.simpleSchema().pick(CAMPO_ID, ['numProductosRechzds', 'observaciones']).validator({
        clean: true,
        filter: false
    }),
    run({_id, numProductosRechzds, observaciones}) {
        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: Meteor.userId()});
            return VentasEntregas.update({_id: _id},
                {
                    $set: {
                        usuarioEntregaId: empleado._id,
                        fechaEntrega: new Date(),
                        numProductosRechzds: numProductosRechzds,
                        observaciones: observaciones
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

export const crearVentaEntrega = new ValidatedMethod({
    name: 'ventasEntregas.crearVentaEntrega',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_entregas'],
            group: 'ventas_entregas'
        }
    ],
    permissionsError: {
        name: 'ventasEntregas.crearVentaEntrega',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaOrdenId: {type: String, regEx: SimpleSchema.RegEx.Id},
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        tipo: {type: String},
        entregas: {type: Object, blackbox: true},
    }).validator(),
    run({ventaOrdenId, tiendaId, tipo, entregas}) {
        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: Meteor.userId()});
            const props = Object.entries(entregas);
            props.forEach((item)=> {
                const entrega = {
                    partidaId: item[0],
                    tiendaId: tiendaId,
                    ventaOrdenId: ventaOrdenId,
                    numProductos: item[1],
                    empleadoSolicitaId: empleado._id,
                    tipo: tipo
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
        crearVentaEntrega,
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