import template from './entregasPartidas.html';
import {VentasEntregas} from "../../../../../../../../api/ventas/entregas/collection";

class EntregasPartidas {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('ventasEntregas.lista', () => [
            {partidaId: this.getReactively('partidaId')}, {}
        ]);

        this.helpers({
            entregas() {
                return VentasEntregas.find({
                    partidaId: this.getReactively('partidaId')
                });
            }
        });
    }

}

const name = 'entregasPartidas';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EntregasPartidas,
        bindings: {
            partidaId: '<'
        }
    });