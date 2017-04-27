/**
 * Created by Héctor on 06/03/2017.
 */
import './puntoVenta.html';
import {name as TabsNotaFacDev} from "./tabsNotaFacDev/tabsNotaFacDev";
import {name as PanelAgregarBuscar} from "./panelAgregarBuscar/panelAgregarBuscar";


class PuntoVenta {

    constructor($scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$uibModal = $uibModal;
        this.mostrarCliente = true;
        this.mostrarClienteMostrador = false;
        this.vendedores = [
            {_id: '15', nombre: 'Héctor Flores'},
            {_id: '10', nombre: 'Martha Sánchez'},
            {_id: '90', nombre: 'Ruben Pérez'},
            {_id: '50', nombre: 'Julia Roberts'},
            {_id: '77', nombre: 'Luis Miguel'},
            {_id: '58', nombre: 'Pedro Páramo'},
            {_id: '76', nombre: 'Bart Simpson'},
            {_id: '95', nombre: 'Homero Simpson'},
        ];
        this.importe = 0;
        this.listadoCompras = [
            {cantidad: 1, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '33X33', lista: '1', metrosCaja: 1.5, precioUnitario: 100, descuento: 5, nombre: 'ALTHEA LIGTH GRAY'},
            {cantidad: 1, _id: '412321', marca: 'DALTILE', clase: '2A', medida: '44X44', lista: '1', metrosCaja: 1.5, precioUnitario: 130, descuento: 15, nombre: 'MARFIL IMPERIAL CREMA MATE'},
            {cantidad: 1, _id: '456121', marca: 'DALTILE', clase: '1A', medida: '60X60', lista: '1', metrosCaja: 1.6, precioUnitario: 132, descuento: 30, nombre: 'STORM DARK GRAY'},
            {cantidad: 1, _id: '453121', marca: 'DALTILE', clase: '2A', medida: '33X33', lista: '1', metrosCaja: 1.3, precioUnitario: 198, descuento: 20, nombre: 'SANDSTONE GRAY RECT'},
            {cantidad: 1, _id: '126321', marca: 'DALTILE', clase: '1A', medida: '20X20', lista: '1', metrosCaja: 2.5, precioUnitario: 115, descuento: 3, nombre: 'PERTH STONE GRAY MATE BTE'},
            {cantidad: 1, _id: '556321', marca: 'DALTILE', clase: '1A', medida: '15X15', lista: '1', metrosCaja: 2.0, precioUnitario: 111, descuento: 9, nombre: 'SIERRA COBRIZADO'},
        ];

    }

    buscarCliente() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: "ModalBuscaCliente",
            size: 'lg',
            resolve: {
                clienteSeleccionado: function () {
                    return this.clienteSeleccionado;
                }
            }
        }).result.then(this.$bindToContext((result) => {
            console.log("Se ha cerrado el modal y trajo consigo: ->", result);
            this.cliente = (result);
            this.mostrarCliente = false;
            this.mostrarClienteMostrador = true;

            console.log(this.producto);
        }, function(reason) {
            console.log("Se cerró el modal la razón fue: ->" + reason);
        }));

    }

    agregarCliente() {
        console.log('Está entrando al modal agregarCliente');
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: "ModalAgregarCliente",
            size: 'lg',
            resolve: {
                nuevoCliente: function () {
                    return this.nuevoCliente;
                }
            }
        }).result.then(this.$bindToContext((result) => {
            console.log("Se ha cerrado el modal y trajo consigo: ->", result);
            this.cliente = (result);
            this.mostrarCliente = false;
            this.mostrarClienteMostrador = true;

            console.log(this.producto);
        }, function(reason) {
            console.log("Se cerró el modal la razón fue: ->" + reason);
        }));

    }

    seleccionarVendedor(nombre) {
        this.vendedorActivo = nombre;
    }

    getTotal() {
        var total = 0;
        for(var i = 0; i < this.listadoCompras.length; i++){
            var product = this.listadoCompras[i];
            total += (this.listadoCompras[i].precioUnitario * this.listadoCompras[i].cantidad);
        }
        return total;
    }

    quitarArticulo(index) {
        console.log(index);
        if (index > -1) {
            this.listadoCompras.splice(index, 1);
        }
    }

    buscarProductos() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: "ModalBuscaArticulos",
            size: 'lg',
            resolve: {
                articuloSeleccionado: function () {
                    return this.articuloSeleccionado;
                }
            }
        }).result.then(this.$bindToContext((result) => {
            console.log("Se ha cerrado el modal y trajo consigo: ->", result);
            this.listadoCompras.push(result);

            console.log(this.producto);
        }, function(reason) {
            console.log("Se cerró el modal la razón fue: ->" + reason);
        }));


    }

    aplicarDescuento() {
        console.log('Está entrando al modal aplicarDescuento');
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: "ModalAplicarDescuento",
            size: 'md',
            resolve: {
                descuento: function () {
                    return this.descuento;
                }
            }
        }).result.then(this.$bindToContext((result) => {
            console.log("Se ha cerrado el modal y trajo consigo: ->", result);
        }, function(reason) {
            console.log("Se cerró el modal la razón fue: ->" + reason);
        }));

    }

    limpiarTodo() {
        this.cliente = {};
        this.listadoCompras = [];
        this.mostrarCliente = true;
        this.mostrarClienteMostrador = false;
        this.vendedorActivo = '';

    }

}

const name = 'puntoVenta';

// Módulo
export default angular
    .module(name, [
        TabsNotaFacDev,
        PanelAgregarBuscar
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: PuntoVenta,
        bindings: {
            productoseleccionado: '@',
            probandoobjeto: '@',
            probandostring: '@'
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

