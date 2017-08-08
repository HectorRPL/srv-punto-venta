import {name as Minimalize} from "./minimalize/minimalize";
import template from "./topNavbar.html";
import {Empleados} from "../../../../api/empleados/collection";

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
}

const name = 'topNavbar';

export default angular
    .module(name, [
        Minimalize
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: TopNavbar
    });
