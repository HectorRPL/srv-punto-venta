/**
 * Created by Héctor on 09/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {Productos} from "../collection";
import {TiposProductos} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('productos.todo', () => {
        return Productos.find();
    });


    Meteor.publish('productos.id', (selector) => {
        if (Object.keys(selector).length === 0 && selector.constructor === Object){
            this.ready();
        } else {
            return Productos.find(selector);
        }
    });



}
