import angular from "angular";
import angularMeteor from "angular-meteor";
import oclazyload from "oclazyload";
import uiRouter from "angular-ui-router";
import angularUBoostrap from "angular-ui-bootstrap";
import "./stylesheets/animate.css";
import "jquery/dist/jquery";
import "angular-ui-grid/ui-grid.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import {name as App} from "../imports/ui/components/app/app";
import {name as Login} from "../imports/ui/components/login/login";

class Main {}

const name = 'main';

export default angular
    .module('app-operativo', [
        angularMeteor,
        angularUBoostrap,
        oclazyload,
        uiRouter,
        App,
        Login
    ])
    .config(config);
function config($locationProvider, $urlRouterProvider, $stateProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/login');
}

