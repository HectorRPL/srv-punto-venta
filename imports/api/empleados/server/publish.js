/**
 * Created by jvltmtz on 3/08/17.
 */
import {Meteor} from "meteor/meteor";
import {Empleados} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('empleados.logeado', function () {
        if (this.userId) {
            const options = {fields: {nombreCompleto: 1, departamentoId: 1}};
            return Empleados.find({propietarioId: this.userId}, options);
        } else {
            this.ready();
        }
    });
}