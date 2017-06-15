/**
 * Created by Héctor on 30/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {DatosFiscales} from "./collection";


const CAMPOS_DATOS_FISCALES = [
    '_id',
    'propietarioId',
    'nombre',
    'apellidoPaterno',
    'apellidoMaterno',
    'razonSocial',
    'email',
    'calle',
    'delMpio',
    'estado',
    'estadoId',
    'colonia',
    'codigoPostal',
    'numExt',
    'numInt',
    'tipoPersona',
    'curp'
    // 'codigoPais', // se deja pendiente, pero deberá estar
];

export const insertarDatosFiscales = new ValidatedMethod({
    name: 'datosFiscales.insertarDatosFiscales',
    validate: DatosFiscales.simpleSchema().pick(CAMPOS_DATOS_FISCALES).validator({
        clean: true,
        filter: false
    }),
    run(
        {
            _id,
            propietarioId,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            razonSocial,
            email,
            calle,
            delMpio,
            estado,
            estadoId,
            colonia,
            codigoPostal,
            numExt,
            numInt,
            tipoPersona,
            curp
    }
    ) {
        return DatosFiscales.insert({
            _id,
            propietarioId,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            razonSocial,
            email,
            calle,
            delMpio,
            estado,
            estadoId,
            colonia,
            codigoPostal,
            numExt,
            numInt,
            tipoPersona,
            curp
        });
    }
});

export const existeRFC = new ValidatedMethod({
    name: 'datosFiscales.existeRFC',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        rfc: {type: String}
    }).validator(),
    run({rfc}) {
        const resultado = DatosFiscales.findOne({_id: rfc});
        return resultado ? true : false;
    }
});

const DATOS_FISCALES_PROVEEDORES_METHODS = _.pluck([insertarDatosFiscales, existeRFC], 'name');
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