import "./footer.html";

class Footer {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'footer';

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/app/${name}/${name}.html`,
        controllerAs: name,
        controller: Footer
    });
