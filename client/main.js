import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import angularUBoostrap from "angular-ui-bootstrap";
import angularMessages from "angular-messages";
import "./stylesheets/animate.css";
import "jquery/dist/jquery";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import {name as App} from "../imports/ui/components/app/app";

class Main {}

const name = 'main';

export default angular
    .module('app-punto-venta', [
        angularMeteor,
        angularUBoostrap,
        angularMessages,
        uiRouter,
        App
    ])
    .config(config);
function config($locationProvider, $urlRouterProvider, $stateProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/app/ventas/menudeo');
}

