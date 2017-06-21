/**
 * Created by Héctor on 01/05/2017.
 */
import {name as OrdenCompraTienda} from "./ordenCompraTienda/ordenCompraTienda";
import template from "./buscarProductoTiendas.html";

class BuscarProductoTiendas{

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'Generar una Orden de Compra';
        this.pasoActual = 1;
        this.tipoMsj = '';

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

const name = 'buscarProductoTiendas';

// Módulo
export default angular
    .module(name, [
        OrdenCompraTienda
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: BuscarProductoTiendas
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.compras.buscarproductotiendas', {
            url: '/buscarproductotiendas',
            template: '<buscar-producto-tiendas></buscar-producto-tiendas>'
        });
}
