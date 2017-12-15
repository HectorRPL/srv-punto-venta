/**
 * Created by Héctor on 14/08/2017.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {_} from "meteor/underscore";
import {VentasPagos} from './collection';

const ID = ['_id'];
const CAMPOS_VENTAS_PAGOS = ['ventaId', 'tiendaId', 'ventaOrdenId', 'tipoPagoId', 'tipoTarjetaId', 'bancoId', 'referencia', 'monto'];

export const crearVentaPago = new ValidatedMethod({
    name: 'ventasPagos.crearVentaPago',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_ventas_pagos'],
            group: 'ventas_pagos'
        }
    ],
    permissionsError: {
        name: 'ventasPagos.crearVentaPago',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasPagos.simpleSchema().pick(CAMPOS_VENTAS_PAGOS).validator({
        clean: true,
        filter: false
    }),
    run({
        ventaId, tiendaId, ventaOrdenId, tipoPagoId, tipoTarjetaId, bancoId, referencia, monto
    }) {
        if (Meteor.isServer) {
            const pago = {
                ventaId, tiendaId, ventaOrdenId, tipoPagoId, tipoTarjetaId, bancoId, referencia, monto
            };
            return VentasPagos.insert(pago, (err) => {
                if (err) {
                    throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
                }
            });
        }

    }
});

export const borrarVentaPago = new ValidatedMethod({
    name: 'ventasPagos.borrarVentaPago',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['borr_ventas_pagos'],
            group: 'ventas_pagos'
        }
    ],
    permissionsError: {
        name: 'ventasPagos.borrarVentaPago',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: VentasPagos.simpleSchema().pick(ID, ['ventaOrdenId']).validator({
        clean: true,
        filter: false
    }),
    run({
        _id, ventaOrdenId
    }) {

        if(Meteor.isServer) {
            return VentasPagos.remove({_id: _id, ventaOrdenId: ventaOrdenId}, (err) => {
                if (err) {
                    throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
                }
            });
        }
    }
});

const VENTAS_PAGOS_METHODS = _.pluck(
    [
        crearVentaPago,
        borrarVentaPago
    ], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(VENTAS_PAGOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
