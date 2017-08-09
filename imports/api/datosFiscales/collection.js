/**
 * Created by jvltmtz on 25/03/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const DatosFiscales = new Mongo.Collection('datosFiscales');

DatosFiscales.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

const Schema = {};

Schema.datosFiscales = new SimpleSchema({
    _id:{
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true
    },
    rfc: {
        type: String,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }
        }
    },
    propietarioId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    nombres: {
        type: String, min: 2, max: 30,
        regEx: /^[a-zA-ZñÑ\s]+$/,
        optional: true,
        custom: function () {
            let shouldBeRequired = this.field('tipoPersona').value == 'PF';
            if (shouldBeRequired) {
                if (!this.operator) {
                    if (!this.isSet || this.value === null || this.value === '') return "required";
                }
            }
        },
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase();
            }
        }
    },
    apellidos: {
        type: String,
        regEx: /^[a-zA-Z-Ññ-\s\d]+$/,
        optional: true,
        custom: function () {
            let shouldBeRequired = this.field('tipoPersona').value == 'PF';
            if (shouldBeRequired) {
                if (!this.operator) {
                    if (!this.isSet || this.value === null || this.value === '') return "required";
                }
            }
        },
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }
        }
    },
    razonSocial: {
        type: String,
        regEx: /^[a-zA-Z-Ññ.,-\s\d]+$/,
        autoValue: function () {
            if (this.value) {
                let razonSocial = '';
                if (this.field('tipoPersona').value == 'PF') {
                    if (this.field('nombres').value && this.field('apellidos').value) {
                        razonSocial += this.field('nombres').value.toUpperCase();
                        razonSocial += ' ' + this.field('apellidos').value.toUpperCase();
                        return razonSocial;
                    }
                } else {
                    return this.value.toUpperCase();
                }
            }
        }
    },
    tipoPersona: {
        type: String
    },
    tipoSociedad: {
        type: String,
        optional: true,
        custom: function () {
            let shouldBeRequired = this.field('tipoPersona').value == 'PM';
            if (shouldBeRequired) {
                if (!this.operator) {
                    if (!this.isSet || this.value === null || this.value === '') return "required";
                }
            }
        },
    }
});

DatosFiscales.attachSchema(Schema.datosFiscales);
