/**
 * Created by jvltmtz on 8/03/17.
 */
import {Meteor} from "meteor/meteor";
import {Proveedores} from "../collection";

if (Meteor.isServer) {
    /*

    TODO: IMPORTANTE ¿Éste método (y varios más) lleva validación de objeto vació para no saturar el navegador?
    Aclaración: Este archivo lo he extraído de master; y master tiene el mismo tema.

    * */
    Meteor.publish('proveedores.todos', function (filter, options) {

        Counts.publish(this, 'numProveedores', Proveedores.find(filter), {
            noReady: true
        });
        return Proveedores.find(filter, options);
    });

}