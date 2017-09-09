/**
 * Created by Héctor on 09/02/2017.
 */
import template from "./iboxTools.html";

class IboxTools {
    constructor($scope, $reactive, $element, $timeout) {
        'ngInject';
        $reactive(this).attach($scope);
        this.element = $element;
        this.timeout = $timeout;

    }

    // Function for collapse ibox
    showhide = function () {
        var ibox = this.element.closest('div.ibox');
        var icon = this.element.find('i:first');
        var content = ibox.children('.ibox-content');
        content.slideToggle(200);
        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        this.timeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    };
    // Function for close ibox
    closebox = function () {
        var ibox = this.element.closest('div.ibox');
        ibox.remove();
    }
}

const name = 'iboxTools';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: IboxTools
    });
