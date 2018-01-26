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
const CAMPOS_VENTAS_ENTREGAS = ['partidaId', 'tiendaId', 'ventaOrdenId',
    'numProductos', 'tipo'];


export const actualizarEntrgFecha = new ValidatedMethod({
    name: 'ventasEntregas.actualizarEntrgFecha',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_entregas'],
            group: 'ventas_entregas'
        }
    ],
    permissionsError: {
        name: 'ventasEntregas.actualizarEntrgFecha',
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
    validate: VentasEntregas.simpleSchema().pick(CAMPOS_VENTAS_ENTREGAS).validator({
        clean: true,
        filter: false
    }),
    run({partidaId, tiendaId, ventaOrdenId, numProductos, tipo}) {
        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: Meteor.userId()});

            VentasEntregas.insert({
                partidaId: partidaId,
                tiendaId: tiendaId,
                ventaOrdenId: ventaOrdenId,
                tipo: tipo,
                numProductos: numProductos,
                empleadoSolicitaId: empleado._id
            }, (err) => {
                if (err) {
                    throw new Meteor.Error(500, 'Error al guardar la entrega en mostrador', 'ventas-entrega-no-insertar');
                }
            });
        }

    }
});

export const actualiarEntrgNumProdts = new ValidatedMethod({
    name: 'ventasEntregas.actualiarEntrgNumProdts',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_entregas'],
            group: 'ventas_entregas'
        }
    ],
    permissionsError: {
        name: 'ventasEntregas.actualiarEntrgNumProdts',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        _id: {type: String, regEx: SimpleSchema.RegEx.Id},
        numProductos: {type: Number}
    }).validator(),
    run({_id, numProductos}) {
        if (Meteor.isServer) {

            VentasEntregas.update({
                _id: _id
            }, {
                $set: {
                    numProductos: numProductos
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
        actualizarEntrgFecha,
        actualiarEntrgNumProdts,
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