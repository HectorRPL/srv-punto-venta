/**
 * Created by jvltmtz on 13/06/17.
 */
import {name as FormaDireccion} from '../../../comun/direccion/formaDireccion/formaDireccion';
import {Direcciones} from '../../../../../api/direcciones/collection';
import {actualizarDireccion, crearDireccion} from '../../../../../api/direcciones/methods';
import {actualizarDireccionEntrega} from '../../../../../api/ordenesVentas/methods';
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
        crearDireccion.call(this.direccion, this.$bindToContext((err, result)=> {
            if (err) {

            } else {
                this.asignar(result);
            }
        }));
    }

    actualizar() {
        this.crearDireccion();

        actualizarDireccion.call(this.direccion, this.$bindToContext((err)=> {
            if (err) {

            } else {
                this.asignar(this.direccion._id);
            }
        }));
    }

    asignar(direccionId) {
        actualizarDireccionEntrega.call({clienteId: this.clienteId, direccionId: direccionId},
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