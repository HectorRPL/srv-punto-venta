/**
 * Created by Héctor on 09/02/2017.
 */
import {name as Navigation} from "./navigation/navigation";
import {name as Topnavbar} from "./topnavbar/topnavbar";
import {name as PuntoVenta} from "../puntoVenta/puntoVenta";
import {name as Compras} from "../compras/compras";
import {name as Caja} from "../caja/caja";
import "metismenu/dist/metisMenu.js";
import "./app.html";

class App {
    constructor() {
        this.userName = 'Example user';
        this.helloText = 'Welcome in SeedProject';
        this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

    }
}

const name = 'app';

export default angular
    .module(name, [
        Navigation,
        Topnavbar,
        PuntoVenta,
        Compras,
        Caja
    ]).component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: App
    }).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app', {
            url: '/app',
            template: '<app></app>'
        });
};

