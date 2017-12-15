/**
 * Created by Héctor on 19/10/2017.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {Empleados} from '../../empleados/collection';
import {VentasCancelaciones} from './collection';
import {VentasOrdenes} from "../ordenes/collection";

const CAMPOS_VENTAS_CANCELACIONES = [
    'partidaId',
    'tiendaId',
    'ventaOrdenId',
    'productoId',
    'numProductos',
    'motivo',
    'requiereNota'
];

export const crearVentaCancelacion = new ValidatedMethod({
    name: 'ventasCancelaciones.crearVentaCancelacion',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_cancelaciones'],
            group: 'ventas_cancelaciones'
        }
    ],
    permissionsError: {
        name: 'ventasCancelaciones.crearVentaCancelacion',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasCancelaciones.simpleSchema()
        .pick(CAMPOS_VENTAS_CANCELACIONES)
        .validator({
            clean: true,
            filter: false
        }),
    run({
            partidaId,
            tiendaId,
            ventaOrdenId,
            productoId,
            motivo,
            numProductos
        }) {
        if (Meteor.isServer) {

            const empleado = Empleados.findOne({propietarioId: this.userId}, {fields: {nombre: 1}});

            return VentasCancelaciones.insert(
                {
                    partidaId,
                    tiendaId,
                    ventaOrdenId,
                    productoId,
                    empleadoCanceloId: empleado._id,
                    motivo,
                    numProductos
                },
                (err) => {
                    if (err) {
                        console.log(err);
                        throw new Meteor.Error(500, 'Error al realizar la operación.', 'compras-cancelaciones-no-creada');
                    }
                }
            );
        }
    }
});

const VENTAS_CANCELACIONES_METHODS = _.pluck(
    [
        crearVentaCancelacion
    ],
    'name'
);
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(VENTAS_CANCELACIONES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}