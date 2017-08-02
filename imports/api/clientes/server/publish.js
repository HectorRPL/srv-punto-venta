/**
 * Created by Héctor on 07/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {Clientes} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('clientes.todos', function (selector, options) {
        if (Object.keys(selector).length === 0 && selector.constructor === Object){
            this.ready();
        } else {
            console.log('clientes.todos', selector);
            return Clientes.find(selector, options);
        }

    });
}