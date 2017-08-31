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
const CAMPOS_DATOS_FISCALES = ['propietarioId', 'rfc', 'tipoPersona', 'nombres', 'apellidos', 'razonSocial', 'tipoSociedad'];
const CAMPOS_DIRECCION_FISCAL = ['calle', 'delMpio', 'estado', 'estadoId', 'colonia', 'codigoPostal', 'numExt', 'numInt', 'codigoPais'];

export const altaDatosFiscales = new ValidatedMethod({
    name: 'datosFiscales.altaDatosFiscales',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_fisc'],
            group: 'crudfiscales'
        }
    ],
    permissionsError: {
        name: 'datosFiscales.altaDatosFiscales',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: DatosFiscales.simpleSchema().pick(CAMPOS_DATOS_FISCALES, CAMPOS_DIRECCION_FISCAL).validator({
        clean: true,
        filter: false
    }),
    run({
        propietarioId, rfc, tipoPersona, nombres, apellidos, razonSocial, tipoSociedad,
        calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais
    }) {
        return DatosFiscales.insert({
            propietarioId, rfc, tipoPersona, nombres, apellidos, razonSocial, tipoSociedad,
            calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'datos-fiscales-no-creados');
            }
        });
    }
});

export const cambiosDatosFiscales = new ValidatedMethod({
    name: 'datosFiscales.cambiosDatosFiscales',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_fisc'],
            group: 'crudfiscales'
        }
    ],
    permissionsError: {
        name: 'datosFiscales.cambiosDatosFiscales',
        message: ()=> {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: DatosFiscales.simpleSchema().pick(CAMPO_ID, CAMPOS_DATOS_FISCALES, CAMPOS_DIRECCION_FISCAL).validator({
        clean: true,
        filter: false
    }),
    run({
        _id, propietarioId, rfc, tipoPersona, nombres, apellidos, razonSocial, tipoSociedad,
        calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais
    }) {

        if (tipoPersona === 'PM') {
            return DatosFiscales.update({_id: _id}, {
                $set: {
                    propietarioId: propietarioId, rfc: rfc, tipoPersona: tipoPersona, razonSocial: razonSocial,
                    tipoSociedad: tipoSociedad, calle: calle, delMpio: delMpio, estadoId: estadoId, estado: estado,
                    colonia: colonia, codigoPostal: codigoPostal, numExt: numExt, numInt: numInt
                },
                $unset: {
                    nombres: "", apellidos: ""
                }
            });
        } else {
            return DatosFiscales.update({_id: _id}, {
                $set: {
                    propietarioId: propietarioId, rfc: rfc, tipoPersona: tipoPersona, nombres: nombres,
                    apellidos: apellidos, calle: calle, delMpio: delMpio, estadoId: estadoId, estado: estado,
                    colonia: colonia, codigoPostal: codigoPostal, numExt: numExt, numInt: numInt
                },
                $unset: {
                    tipoSociedad: ""
                }
            });
        }

    }
});

const DATOS_FISCALES_PROVEEDORES_METHODS = _.pluck(
    [
        altaDatosFiscales,
        cambiosDatosFiscales

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