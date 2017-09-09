/**
 * Created by jvltmtz on 17/07/17.
 */
import {MesesIntereses} from "../../../../../api/catalogos/mesesIntereses/collection";
import template from "./elegirMesesIntereses.html";

class ElegirMesesIntereses {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('mesesIntereses.todos');

        this.helpers({
            meses() {
                return MesesIntereses.find();
            }
        });
    }

}

const name = 'elegirMesesIntereses';
// create a module

export default angular
    .module(name, [ ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        bindings: {
            mes: '='
        },
        controller: ElegirMesesIntereses
    });