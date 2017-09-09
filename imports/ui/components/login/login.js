import template from './login.html';

class Login {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
    }

}

const name = 'login';

// create a module
export default angular.module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Login
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('login', {
            url: '/loginLinea',
            template: '<loginLinea></loginLinea>'
        });
}
