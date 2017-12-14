/**
 * Created by Héctor on 29/09/2017.
 */
import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";
import {Empleados} from "../../../../../api/empleados/collection";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {crearVentaId} from "../../../../../api/ventas/methods";
import template from "./navTopLoginLinea.html";

class NavTopLoginLinea {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = Session.get('estacionTrabajoId');
        this.credentials = {
            username: '',
            password: ''
        };
        this.msj = '';
        this.tipoMsj = '';

        this.subscribe('empleados.logeado');
        this.helpers({
            empleado() {
                return Empleados.findOne();
            }
        })
    }

    login() {
        this.tipoMsj = '';
        Meteor.loginWithPassword(this.credentials.username, this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    this.msj = 'Error Usuario y/o Constraseña';
                    this.tipoMsj = 'danger';
                } else {
                    crearVentaId.callPromise({tiendaId: this.tiendaId})
                        .then(this.$bindToContext((result) => {
                            this.$state.go('app.ventas.menudeo.crear', {ventaId: result});
                        }));
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