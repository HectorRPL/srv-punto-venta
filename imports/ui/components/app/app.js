/**
 * Created by Héctor on 09/02/2017.
 */
import {name as Navigation} from "./navigation/navigation";
import {name as TopNavbar} from "./topNavbar/topNavbar";
import {name as PuntoVenta} from "../puntoVenta/puntoVenta";
import {name as Alertas} from "../comun/alertas/alertas";
import "metismenu/dist/metisMenu.js";
import template from "./app.html";
import {Session} from "meteor/session";

class App {
    constructor() {
        this.userName = 'Example user';
        this.helloText = 'Welcome in SeedProject';
        this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
        Session.setPersistent('estacionTrabajoId', Meteor.settings.public.tiendaConf.tiendaId);

    }
}

const name = 'app';

export default angular
    .module(name, [
        Navigation,
        TopNavbar,
        PuntoVenta,
        Alertas
    ]).component(name, {
        template: template.default,
        controllerAs: name,
        controller: App
    })
    .config(config)
    .run(run);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app', {
            url: '/app',
            template: '<app></app>'
        });
};

function run($rootScope, $state) {
    'ngInject';

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('app.venta.menudeo');
            }
        }
    );
}
