/**
 * Created by Héctor on 04/05/2017.
 */
import './eligeProductoInventarios.html';

class EligeProductoInventarios{

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'DALTILE 1A 33X33 1 ALTHEA LIGTH GRAY (1.50 mts²)';
        this.tiendasProductos = [];

        // Las subscripciones
        this.miTienda = [{idTienda: 'miTienda', exitencia: '30',   nombre: 'Mi tienda'}];
        this.helpers({
            productos() {
                return this.inventario = [
                    {claveProducto: 'FA215', existencia: 45, tienda: 'CERAGRES',         tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
                    {claveProducto: 'FA215', existencia: 45, tienda: 'XOCHIMILCO',       tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
                    {claveProducto: 'FA215', existencia: 45, tienda: 'MERCADO',          tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
                    {claveProducto: 'FA215', existencia: 45, tienda: 'TLAHUAC',          tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
                    {claveProducto: 'FA215', existencia: 45, tienda: 'BODEGA COYOACAN',  tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
                    {claveProducto: 'FA215', existencia: 45, tienda: 'CHALCO',           tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
                    {claveProducto: 'FA215', existencia: 45, tienda: 'CHALCO',           tipoUnidad: 'PZA', cantidad: 0, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5,  nombre: 'ALTHEA LIGTH GRAY'},
                ];
            }
        });
        this.tiendas = [
            {idTienda: 'tiendaId-01', exitencia: '30',   nombre: 'Ceragres Xochimilco'},
            {idTienda: 'tiendaId-02', exitencia: '1',    nombre: 'Ceragres Veracruz'},
            {idTienda: 'tiendaId-03', exitencia: '30',   nombre: 'Centro Comercial Xochimilco'},
            {idTienda: 'tiendaId-04', exitencia: '60',   nombre: 'Ceragres Veracruz'},
            {idTienda: 'tiendaId-05', exitencia: '3',    nombre: 'Bodegas de Chalco'},
            {idTienda: 'tiendaId-06', exitencia: '30',   nombre: 'El Edificio'},
            {idTienda: 'tiendaId-07', exitencia: '30',   nombre: 'Buttique'},
            {idTienda: 'tiendaId-08', exitencia: '7',    nombre: 'Ceragres Veracruz'},
            {idTienda: 'tiendaId-09', exitencia: '30',   nombre: 'Ceragres Xochimilco'},
            {idTienda: 'tiendaId-10', exitencia: '30',   nombre: 'Centro Comercial Xochimilco'},
            {idTienda: 'tiendaId-11', exitencia: '8',    nombre: 'Ceragres Veracruz'},
            {idTienda: 'tiendaId-12', exitencia: '30',   nombre: 'Bodegas de Chalco'},
            {idTienda: 'tiendaId-13', exitencia: '0',    nombre: 'Ceragres Veracruz'},
            {idTienda: 'tiendaId-14', exitencia: '30',   nombre: 'El Edificio'},
            {idTienda: 'tiendaId-15', exitencia: '90',   nombre: 'Buttique'},
            {idTienda: 'tiendaId-16', exitencia: '30',   nombre: 'Ceragres Veracruz'},
        ];
    }

    // Crea el objeto que será regresado al punto de venta.
    calcularTotaRequerido(tienda) {
        if(tienda.cantidadSolicitada === undefined) {
            tienda.cantidadSolicitada = 0;
        }
        if (!this.tiendasProductos.find(x => x.idTienda === tienda.idTienda)) {
            this.tiendasProductos.push(tienda);
        }

        console.log(this.tiendasProductos);
    }

    // CALCULA EL NÚMERO TOTAL DE PRODUCTO A VENDER, LO MUESTRA EN EL CLIENTE.

    totalSolicitado() {
        var total = 0;
        for(var i = 0; i < this.tiendasProductos.length; i++){
            var product = this.tiendasProductos[i];
            total += (this.tiendasProductos[i].cantidadSolicitada);
        }
        return total;
    }

    aceptar() {
        console.log('Esto es lo que se va a enviar', this.tiendasProductos);
        this.modalInstance.close(this.tiendasProductos);
    }

    cancelarCerrar() {
        this.modalInstance.dismiss('Cancelado');
    }

}

const name = 'eligeProductoInventarios';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/${name}/${name}.html`,
        controllerAs: name,
        controller: EligeProductoInventarios,
        bindings: {
            productoselecciondo: '<',
            close: '&',
            dismiss: '&',
            modalInstance: "<",
            resolve: "<"
        }
    });

