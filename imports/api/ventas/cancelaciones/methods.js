/**
 * Created by Héctor on 19/10/2017.
 */
import {Meteor}               from "meteor/meteor";
import {DDPRateLimiter}       from "meteor/ddp-rate-limiter";
import {_}                    from "meteor/underscore";
import {ValidatedMethod}      from "meteor/mdg:validated-method";
import {CallPromiseMixin}     from "meteor/didericis:callpromise-mixin";
import {PermissionsMixin}     from "meteor/didericis:permissions-mixin";
import {Empleados}            from '../../empleados/collection';
import {VentasCancelaciones} from './collection';

const CAMPOS_COMPRAS_CANCELACIONES = [
    'partidaId',
    'tiendaId',
    'compraOrdenId',
    'observaciones',
    'numProductos',
    'fechaCancelacion',
    'fechaCreacion'
];

export const crearVentasCancelacion = new ValidatedMethod({
    name: 'ventasCancelaciones.crearVentasCancelacion',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_cancelaciones'],
            group: 'ventas_cancelaciones'
        }
    ],
    permissionsError: {
        name: 'ventasCancelaciones.crearVentasCancelacion',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasCancelaciones.simpleSchema().pick(CAMPOS_COMPRAS_CANCELACIONES).validator({
        clean: true,
        filter: false
    }),
    run({
        partidaId,
        tiendaId,
        compraOrdenId,
        observaciones,
        numProductos
    }) {
        if (Meteor.isServer) {
            const empleado = Empleados.findOne({propietarioId: Meteor.userId()});
            return VentasCancelaciones.insert(
                {
                    partidaId,
                    tiendaId,
                    compraOrdenId,
                    empleadoCanceloId: empleado._id,
                    observaciones,
                    numProductos
                },
                (err) => {
                    if (err) {
                        throw new Meteor.Error(500, 'Error al realizar la operación.', 'compras-cancelaciones-no-creada');
                    }
                }
            );
        }
    }
});

const VENTAS_CANCELACIONES_METHODS = _.pluck(
    [
        crearVentasCancelacion
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