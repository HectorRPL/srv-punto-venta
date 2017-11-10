/**
 * Created by Héctor on 20/10/2017.
 */
import {Meteor} from "meteor/meteor";
import {ConfiguracionesGlobales} from "../collection";

Meteor.publish('configuracionesGlobales.lista', function (selector) {
    if (Object.keys(selector).length === 0 && selector.constructor === Object){
        this.ready();
    } else {
        return ConfiguracionesGlobales.find(selector);
    }
});