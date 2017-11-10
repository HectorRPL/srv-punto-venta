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
const CAMPOS_VENTAS_ENTREGAS = ['partidaId', 'tiendaId', 'numProductos', 'usuarioSolicitaId', 'tipo'];


export const actualizarVentEntrgMostrdr = new ValidatedMethod({
    name: 'ventasEntregas.actualizarVentEntrgMostrdr',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_entregas'],
            group: 'ventas_entregas'
        }
    ],
    permissionsError: {
        name: 'ventasEntregas.actualizarEntregMostrdr',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasEntregas.simpleSchema().pick(CAMPO_ID, ['numProductos', 'observaciones']).validator({
        clean: true,
        filter: false
    }),
    run({_id, numProductos}) {
        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: this.userId});
            return VentasEntregas.update({_id: _id},
                {
                    $set: {
                        empleadoEntregaId: empleado._id,
                        fechaEntrega: new Date(),
                        numProductos: numProductos
                    }
                },
                (err) => {
                    if (err) {
                        throw new Meteor.Error(500, 'Error al realizar la operación.', 'ventas-entregas-no-actualizada');
                    }
                }
            );
        }

    }
});

export const crearVentEntrg = new ValidatedMethod({
    name: 'ventasEntregas.crearVentEntrg',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_entregas'],
            group: 'ventas_entregas'
        }
    ],
    permissionsError: {
        name: 'ventasEntregas.crearVentEntrg',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaOrdenId: {type: String, regEx: SimpleSchema.RegEx.Id},
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        partidaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        entrgsMos: {type: Number},
        entrgsDom: {type: Number}
    }).validator(),
    run({ventaOrdenId, tiendaId, partidaId, entrgsMos, entrgsDom}) {
        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: Meteor.userId()});

            VentasEntregas.insert({
                ventaOrdenId: ventaOrdenId,
                tiendaId: tiendaId,
                partidaId: partidaId,
                tipo: 'mostrador',
                numProductos: entrgsMos,
                empleadoSolicitaId: empleado._id
            }, (err) => {
                if (err) {
                    throw new Meteor.Error(500, 'Error al guardar la entrega en mostrador', 'ventas-entrega-no-insertar');
                }
            });


            VentasEntregas.insert({
                ventaOrdenId: ventaOrdenId,
                tiendaId: tiendaId,
                partidaId: partidaId,
                tipo: 'domicilio',
                numProductos: entrgsDom,
                empleadoSolicitaId: empleado._id
            }, (err) => {
                if (err) {
                    console.log(err);
                    throw new Meteor.Error(500, 'Error al guardar la entrega en mostrador', 'ventas-entrega-no-insertar');
                }
            });


        }

    }
});

export const actualiarNumProductos = new ValidatedMethod({
    name: 'ventasEntregas.actualiarNumProductos',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_entregas'],
            group: 'ventas_entregas'
        }
    ],
    permissionsError: {
        name: 'ventasEntregas.actualiarNumProductos',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        partidaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        entrgsMos: {type: Number},
        entrgsDom: {type: Number}
    }).validator(),
    run({partidaId, entrgsMos, entrgsDom}) {
        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: Meteor.userId()});

            VentasEntregas.update({
                partidaId: partidaId,
                tipo: 'mostrador'
            }, {
                $set: {
                    numProductos: entrgsMos
                }
            }, (err) => {
                if (err) {
                    throw new Meteor.Error(500, 'Error al guardar la entrega en mostrador', 'ventas-entrega-no-insertar');
                }
            });


            VentasEntregas.update({
                partidaId: partidaId,
                tipo: 'domicilio'
            }, {
                $set: {
                    numProductos: entrgsDom
                }
            }, (err) => {
                if (err) {
                    throw new Meteor.Error(500, 'Error al guardar la entrega en mostrador', 'ventas-entrega-no-insertar');
                }
            });


        }

    }
});

const ENTREGAS_VENTAS_METHODS = _.pluck(
    [
        actualizarVentEntrgMostrdr,
        actualiarNumProductos,
        crearVentEntrg
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