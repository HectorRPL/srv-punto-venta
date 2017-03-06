/**
 * Created by Héctor on 09/02/2017.
 */
import "./navigation.html";

class Navigation {
    constructor() {
        this.userName = 'Example user';
        this.helloText = 'Welcome in SeedProject';
        this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
    }
}

const name = 'navigation';

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/app/${name}/${name}.html`,
        controllerAs: name,
        controller: Navigation
    });

