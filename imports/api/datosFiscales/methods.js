/**
 * Created by Héctor on 30/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {DatosFiscales} from "./collection";

const CAMPO_ID = ['_id'];
const CAMPOS_DATOS_FISCALES = ['rfc', 'tipoPersona', 'razonSocial'];
const CAMPOS_DIRECCION_FISCAL = ['calle', 'delMpio', 'estado', 'estadoId', 'colonia', 'codigoPostal', 'numExt', 'numInt', 'codigoPais'];

export const crearDatoFiscal = new ValidatedMethod({
    name: 'datosFiscales.crearDatoFiscal',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_datos_fiscales'],
            group: 'datos_fiscales'
        }
    ],
    permissionsError: {
        name: 'datosFiscales.crearDatoFiscal',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: DatosFiscales.simpleSchema().pick(CAMPOS_DATOS_FISCALES, CAMPOS_DIRECCION_FISCAL).validator({
        clean: true,
        filter: false
    }),
    run({
        rfc, tipoPersona, razonSocial,
        calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais
    }) {
        return DatosFiscales.insert({
            rfc, tipoPersona, razonSocial,
            calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais
        }, (err) => {
            if (err) {
                console.log('[ERR]', err);
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'datos-fiscales-no-creados');
            }
        });
    }
});

export const actualizarDatoFiscal = new ValidatedMethod({
    name: 'datosFiscales.actualizarDatoFiscal',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_datos_fiscales'],
            group: 'datos_fiscales'
        }
    ],
    permissionsError: {
        name: 'datosFiscales.actualizarDatoFiscal',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: DatosFiscales.simpleSchema().pick(CAMPO_ID, CAMPOS_DATOS_FISCALES, CAMPOS_DIRECCION_FISCAL).validator({
        clean: true,
        filter: false
    }),
    run({
        _id, rfc, tipoPersona, razonSocial,
        calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais
    }) {
        if (Meteor.isServer) {
            return DatosFiscales.update({_id: _id}, {
                $set: {
                    rfc: rfc,
                    tipoPersona: tipoPersona,
                    razonSocial: razonSocial,
                    calle: calle,
                    delMpio: delMpio,
                    estadoId: estadoId,
                    estado: estado,
                    colonia: colonia,
                    codigoPostal: codigoPostal,
                    numExt: numExt,
                    numInt: numInt
                }
            }); // TODO ¿lleva callpromes para cachar el error?
        }
    }
});

const DATOS_FISCALES_PROVEEDORES_METHODS = _.pluck(
    [
        crearDatoFiscal,
        actualizarDatoFiscal

    ], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(DATOS_FISCALES_PROVEEDORES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}