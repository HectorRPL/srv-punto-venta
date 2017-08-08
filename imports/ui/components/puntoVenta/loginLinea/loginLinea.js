import template from "./loginLinea.html";

class LoginLinea {
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
}

const name = 'loginLinea';

// create a module
export default angular.module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: LoginLinea
    });
