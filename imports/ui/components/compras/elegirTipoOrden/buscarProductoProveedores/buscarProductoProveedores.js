/**
 * Created by Héctor on 10/05/2017.
 */
import {name as OrdenCompraProveedor} from './ordenCompraProveedor/ordenCompraProveedor';
import './buscarProductoProveedores.html';

class BuscarProductoProveedores{

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'Generar una Orden de Compra';
        this.pasoActual = 1;
        this.tipoMsj = '';

        /**/


        console.log('Bueno, almenos esto está funcionando');


        /**/

        this.pedido = [
            {claveProducto: 'FA215', existencia: 45, tienda: 'CERAGRES',         tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'XOCHIMILCO',       tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'MERCADO',          tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'TLAHUAC',          tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'BODEGA COYOACAN',  tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'CHALCO',           tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'CERAGRES',         tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'XOCHIMILCO',       tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'MERCADO',          tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'TLAHUAC',          tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'BODEGA COYOACAN',  tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'CHALCO',           tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'CERAGRES',         tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'XOCHIMILCO',       tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'MERCADO',          tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'TLAHUAC',          tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'BODEGA COYOACAN',  tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'CHALCO',           tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'CHALCO',           tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
            {claveProducto: 'FA215', existencia: 45, tienda: 'CHALCO',           tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
        ];
    }

    siguiente() {
        this.pasoActual++;
    }

    aceptar(productoSelecciondo) {
        this.modalInstance.close(productoSelecciondo);
    }

}

const name = 'buscarProductoProveedores';

// Módulo
export default angular
    .module(name, [
        OrdenCompraProveedor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/compras/elegirTipoOrden/${name}/${name}.html`,
        controllerAs: name,
        controller: BuscarProductoProveedores
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.compras.buscarproductoproveedores', {
            url: '/buscarproductoproveedores',
            template: '<buscar-producto-proveedores></buscar-producto-proveedores>'
        });
}
