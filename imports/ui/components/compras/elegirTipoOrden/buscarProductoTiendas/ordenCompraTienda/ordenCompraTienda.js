/**
 * Created by Héctor on 04/05/2017.
 */
import './ordenCompraTienda.html';

class OrdenCompraTienda{

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'Generar una Orden de Compra';
        this.pasoActual = 1;
        this.tipoMsj = '';

        this.pedido = [
            {claveProducto: 'FA215', existencia: 45, tienda: 'CERAGRES',         tipoUnidad: 'PZA', cantidad: 15, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'XOCHIMILCO',       tipoUnidad: 'PZA', cantidad: 20, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'CHALCO',           tipoUnidad: 'PZA', cantidad: 30, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
        ];
    }

}

const name = 'ordenCompraTienda';

// Módulo
export default angular
    .module(name, [
    ])
    .component(name, {
        templateUrl: `imports/ui/components/compras/elegirTipoOrden/buscarProductoTiendas/${name}/${name}.html`,
        controllerAs: name,
        controller: OrdenCompraTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.compras.ordencompratienda', {
            url: '/ordencompratienda',
            template: '<orden-compra-tienda></orden-compra-tienda>'
        });
}
