/**
 * Created by jvltmtz on 13/06/17.
 */
import {name as FormaDireccion} from '../../../comun/direccion/formaDireccion/formaDireccion';
import {Direcciones} from '../../../../../api/direcciones/collection';
import {cambiosDireccion, altaDireccion} from '../../../../../api/direcciones/methods';
import {cambiosDireccionEntrega} from '../../../../../api/ordenesVentas/methods';
import './asignarDireccionEntrega.html';

class AsignarDireccionEntrega {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.direccion = {};
        this.state = $state;
        this.clienteId = $stateParams.clienteId;
        this.subscribe('direcciones.propietario', ()=> [{propietarioId: this.clienteId}]);

        this.helpers({
            direccionCliente(){
                return Direcciones.findOne({propietarioId: this.clienteId}) || {};
            }
        });
    }

    guardar() {
        this.crearDireccion();
        altaDireccion.call(this.direccion, this.$bindToContext((err, result)=> {
            if (err) {
                console.log('err', err);

            } else {
                this.asignar(result);
                console.log('result', result);
            }
        }));
    }

    actualizar() {
        this.crearDireccion();

        cambiosDireccion.call(this.direccion, this.$bindToContext((err)=> {
            if (err) {

            } else {
                this.asignar(this.direccion._id);
            }
        }));
    }

    asignar(direccionId) {
        cambiosDireccionEntrega.call({clienteId: this.clienteId, direccionId: direccionId},
            this.$bindToContext((err)=> {
                if(err){

                } else{
                    this.state.go('app.crearventa.fiscales', {clienteId: this.clienteId});
                }

            }));

    }

    crearDireccion() {
        this.direccion = angular.copy(this.direccionCliente);
        delete this.direccion.colonias;
    }
}

const name = 'asignarDireccionEntrega';

// create a module
export default angular
    .module(name, [
        FormaDireccion
    ])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/crearOrdenVenta/${name}/${name}.html`,
        controllerAs: name,
        controller: AsignarDireccionEntrega
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.crearventa.direccion', {
            url: '/:clienteId/direccion',
            template: '<asignar-direccion-entrega></asignar-direccion-entrega>'
        });
}