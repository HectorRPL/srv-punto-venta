/**
 * Created by jvltmtz on 19/07/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {Empleados} from "../../api/empleados/collection";
import {Ventas} from "./collection";
import {VentasOrdenes} from "./ordenes/collection";
import {_} from "meteor/underscore";


export const actualizarNumVentaOrden = new ValidatedMethod({
    name: 'ventas.actualizarNumVentaOrden',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_ventas_ordenes'],
            group: 'ventas_ordenes'
        }
    ],
    permissionsError: {
        name: 'ventas.actualizarNumVentaOrden',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        ventaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({ventaId, tiendaId}) {
        if (Meteor.isServer) {
            try {
                VentasOperaciones.actualiazarNoVenta(ventaId, tiendaId);
            } catch (e) {
                throw e;
            }
        }
    }
});

export const crearVentaId = new ValidatedMethod({
    name: 'ventas.crearVentaId',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: PermissionsMixin.LoggedIn,
    permissionsError: {
        name: 'ventas.crearVentaId',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    }).validator(),
    run({tiendaId}) {
        if (Meteor.isServer) {
            return Ventas.insert({
                tiendaId: tiendaId
            }, (err) => {
                if (err) {
                    throw new Meteor.Error(403, MENSAJE_ERROR_ORDEN_VENTA, 'venta-no-valida');
                }
            });
        }
    }
});


const ORDENES_VENTAS_METHODS = _.pluck(
    [
        crearVentaId,
        actualizarNumVentaOrden
    ], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(ORDENES_VENTAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
