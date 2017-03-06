import {name as Minimalize} from "./minimalize/minimalize";
import "./topnavbar.html";

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
        templateUrl: `imports/ui/components/app/${name}/${name}.html`,
        controllerAs: name,
        controller: Topnavbar
    });
