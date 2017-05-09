/**
 * Created by Héctor on 06/03/2017.
 */
import './puntoVenta.html';
import {name as EligeProductoInventarios} from './eligeProductoInventarios/eligeProductoInventarios';


class PuntoVenta {

    constructor($scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$uibModal = $uibModal;
        this.importe = 0;
        this.pedido = [];
    }

    buscarProducto(productoBuscado) {
        const BUSCA_ESTO = productoBuscado;
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: "EligeProductoInventarios",
            size: 'lg',
            resolve: {
                idProducto: function () {
                    return BUSCA_ESTO;
                }
            }
        }).result.then(this.$bindToContext((result) => {
            console.log("Se ha cerrado el modal y trajo consigo: ->", result);
            this.pedido.push(result);

        }, function(reason) {
            console.log("Se cerró el modal la razón fue: ->" + reason);
        }));
    }

    // CALCULAR Y DESGLOSAR
    getTotal() {
        var total = 0;
        for(var i = 0; i < this.pedido.length; i++){
            var product = this.pedido[i];
            total += (this.pedido[i].precioUnitario * this.pedido[i].cantidad);
        }
        console.log('total', total);
        return total;
    }

    quitarArticulo(index) {
        console.log(index);
        if (index > -1) {
            this.pedido.splice(index, 1);
        }
    }

    limpiarTodo() {
        this.cliente = {};
        this.pedido = [];
        this.mostrarCliente = true;
        this.mostrarClienteMostrador = false;
        this.vendedorActivo = '';

    }

}

const name = 'puntoVenta';

export default angular
    .module(name, [
        EligeProductoInventarios
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: PuntoVenta,
        bindings: {
            productoseleccionado: '@',
        }
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.puntoventa', {
            url: '/puntoventa',
            template: '<punto-venta></punto-venta>'
        });
}

