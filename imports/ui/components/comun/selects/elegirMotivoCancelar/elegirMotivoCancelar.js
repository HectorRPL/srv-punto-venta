import template from "./elegirMotivoCancelar.html";

class ElegirMotivoCancelar {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.motivos = [
            {_id: '0', descripcion: 'VENTA DIA'},
            {_id: '1', descripcion: 'CLIENTE CANCELA'},
            {_id: '2', descripcion: 'MAL ESTADO'},
            {_id: '3', descripcion: 'PRODUCTO NO ENTREGADO'},
        ]
    }

}

const name = 'elegirMotivoCancelar';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        bindings: {
            motivo: '='
        },
        controller: ElegirMotivoCancelar
    });