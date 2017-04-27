/**
 * Created by Héctor on 07/03/2017.
 */
import {name as BuscarProducto} from "./producto/buscarProducto/buscarProducto";
import './panelAgregarBuscar.html';

class PanelAgregarBuscar {

    constructor($scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$uibModal = $uibModal;

        this.probandoobjeto = {objeto: 'este es un objeto'};
        this.probandostring = 'Esto es un string';

    }

    buscarProductos() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: "BuscarProducto",
            size: 'lg',
            resolve: {
                productoSeleccionado: function () {
                    return this.productoSeleccionado;
                }
            }
        }).result.then(this.$bindToContext((result) => {
            console.log("Se ha cerrado el modal y trajo consigo: ->", result);
            this.productoseleccionado = result;
            // this.listadoCompras.push(result);

            console.log(this.productoseleccionado);
        }, function(reason) {
            console.log("Se cerró el modal la razón fue: ->" + reason);
        }));


    }


}

const name = 'panelAgregarBuscar';

// Módulo
export default angular
    .module(name, [
        BuscarProducto
    ])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/${name}/${name}.html`,
        controllerAs: name,
        controller: PanelAgregarBuscar,
        bindings: {
            subtotal: '<'
        }
    });

