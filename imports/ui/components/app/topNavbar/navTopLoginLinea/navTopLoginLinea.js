/**
 * Created by Héctor on 29/09/2017.
 */
import {Empleados} from "../../../../../api/empleados/collection";
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
                    this.msj = 'Combinación de usuario y contraseña incorrectos.';
                    this.tipoMsj = 'danger';
                } else {
                    console.log('SE logeo con exito');
                    this.$state.reload();
                }
            })
        );
    }

    cerrarSesion() {
        console.log('Fala dar funcionalidad de salir');
    }
}

const name = 'navTopLoginLinea';

export default angular.module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: NavTopLoginLinea
    });