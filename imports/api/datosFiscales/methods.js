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

const CAMPOS_DATOS_FISCALES = ['_id', 'rfc', 'propietarioId', 'nombres', 'apellidos', 'razonSocial', 'tipoPersona', 'tipoSociedad'];

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
    validate: DatosFiscales.simpleSchema().pick(CAMPOS_DATOS_FISCALES).validator({
        clean: true,
        filter: false
    }),
    run({_id, propietarioId, rfc, nombres, apellidos, razonSocial, tipoPersona, tipoSociedad}) {
        return DatosFiscales.insert({
            _id,
            rfc,
            propietarioId,
            nombres,
            apellidos,
            apellidoMaterno,
            razonSocial,
            tipoPersona,
            tipoSociedad
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'datos-fiscales-no-creados');
            }
        });
    }
});

const DATOS_FISCALES_PROVEEDORES_METHODS = _.pluck([altaDatosFiscales], 'name');
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