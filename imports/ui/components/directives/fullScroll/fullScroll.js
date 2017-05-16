/**
 * Created by Héctor on 11/05/2017.
 */

class FullScroll {
    constructor($scope) {
        'ngInject';
        this.colonias = {};
        this.direccion = {};
    }
}

const name = 'fullScroll';

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            direccion: '='
        },
        controller: FullScroll
    })
    .directive('fullScroll', ['$q', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                $timeout(function(){
                    element.slimscroll({
                        height: '100%',
                        railOpacity: 0.9
                    });

                });
            }
        };
    }]);