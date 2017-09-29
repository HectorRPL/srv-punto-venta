import {Empleados} from "../../../../api/empleados/collection";
import {name as Minimalize} from "./minimalize/minimalize";
import {name as NavTopLoginLinea} from "./navTopLoginLinea/navTopLoginLinea";
import template from "./topNavbar.html";

class TopNavbar {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('empleados.logeado');
        this.helpers({
            empleado(){
                return Empleados.findOne();
            }
        })
    }
    login() {
        console.log('El wero es gay');
    }
}

const name = 'topNavbar';

export default angular
    .module(name, [
        Minimalize,
        NavTopLoginLinea
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: TopNavbar
    });
