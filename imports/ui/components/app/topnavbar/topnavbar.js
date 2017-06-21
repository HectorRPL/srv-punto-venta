import {name as Minimalize} from "./minimalize/minimalize";
import template from "./topnavbar.html";

class Topnavbar {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'topnavbar';

export default angular
    .module(name, [
        Minimalize
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Topnavbar
    });
