/**
 * Created by Héctor on 09/02/2017.
 */
import {name as Navigation} from "./navigation/navigation";
import {name as Topnavbar} from "./topnavbar/topnavbar";
import {name as PuntoVenta} from "../puntoVenta/puntoVenta";
// import {name as Compras} from "../compras/compras";
// import {name as Caja} from "../caja/caja";
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
        Topnavbar,
        PuntoVenta,
        // Compras,
        // Caja
    ]).component(name, {
        template,
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

