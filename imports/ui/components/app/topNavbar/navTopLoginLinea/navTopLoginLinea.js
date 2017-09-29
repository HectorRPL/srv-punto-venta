/**
 * Created by Héctor on 29/09/2017.
 */
import {Meteor} from "meteor/meteor";
import {Empleados} from "../../../../../api/empleados/collection";
import {name as Alertas} from "../../../comun/alertas/alertas";
import template from "./navTopLoginLinea.html";

class NavTopLoginLinea {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.credentials = {
            username: '',
            password: ''
        };
        this.msj = '';
        this.tipoMsj = '';

        this.subscribe('empleados.logeado');
        this.helpers({
            empleado(){
                return Empleados.findOne();
            }
        })
    }

    login() {
        this.tipoMsj = '';
        Meteor.loginWithPassword(this.credentials.username, this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    console.log(err);
                    this.msj = 'Error Usuario y/o Constraseña';
                    this.tipoMsj = 'danger';
                } else {
                    console.log('SE logeo con exito');
                    /*TODO: El botón apiñar menú se activa con el reload*/
                    this.$state.reload();
                }
            })
        );
    }

    salir() {
        Meteor.logout();
    }
}

const name = 'navTopLoginLinea';

export default angular.module(name, [
    Alertas
])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: NavTopLoginLinea
    });