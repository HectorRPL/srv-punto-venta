/**
 * Created by Héctor on 13/02/2017.
 */
import template from "./minimalize.html";

class Minimalize {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.minimalize();

    }

    minimalize = () => {
        $("body").toggleClass("mini-navbar");
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            $('#side-menu').hide();
            // For smoothly turn on menu
            setTimeout(
                () => {
                    $('#side-menu').fadeIn(400);
                }, 200);
        } else if ($('body').hasClass('fixed-sidebar')) {
            $('#side-menu').hide();
            setTimeout(
                () => {
                    $('#side-menu').fadeIn(400);
                }, 100);
        } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            $('#side-menu').removeAttr('style');
        }
    }

}

const name = 'minimalize';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: Minimalize
    });
