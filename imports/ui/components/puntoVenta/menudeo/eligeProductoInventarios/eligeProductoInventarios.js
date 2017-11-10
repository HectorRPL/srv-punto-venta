/**
 * Created by Héctor on 04/05/2017.
 */
import template from "./eligeProductoInventarios.html";
import {Productos} from "../../../../../api/catalogos/productos/collection";
import {Marcas} from "../../../../../api/catalogos/marcas/collection";
import {ProductosInventarios} from "../../../../../api/inventarios/productosInventarios/collection";
import {name as ExistenciaOtrasTiendas} from "./existenciaOtrasTiendas/existenciaOtrasTiendas";
import {name as ElegirMesesIntereses} from "../../../comun/selects/elegirMesesIntereses/elegirMesesIntereses";

class EligeProductoInventarios {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.totalProductosTiendas = 0;
        this.cantidadSolicitada = 0;
        this.productosTiendas = new Map();
        this.precioFinal = '';
        this.descuentoFinal = 0;
        this.mesesSinInteres = '0';

        this.subscribe('productos.id', ()=> [{_id: this.getReactively('resolve.producto._id')}]);
        this.subscribe('marcas.id', ()=> [{_id: this.getReactively('resolve.producto.marcaId')}]);
        this.subscribe('productosInventarios.miInventario', ()=> [
            {
                tiendaId: this.getReactively('resolve.producto.tiendaId'),
                productoId: this.getReactively('resolve.producto._id')
            }]);

        this.helpers({
            marca(){
                return Marcas.findOne();
            },
            producto() {
                return Productos.findOne();
            },
            miInventario() {
                return ProductosInventarios.findOne();
            }
        });
    }


    aceptar() {
        let prodFaltante = 0;
        if(this.cantidadSolicitada > this.miInventario.cantidad){
            prodFaltante = this.cantidadSolicitada - this.miInventario.cantidad;
        }

        const miProd = {
            proveedorId: this.resolve.producto.tiendaId,
            noProductos: (this.cantidadSolicitada - prodFaltante),
            prodFaltante: prodFaltante,
            deMiInventario: true,
        };

        this.productosTiendas.set(this.miInventario._id, miProd);

        const prod = {
            _id: this.producto._id,
            marcaDesc: this.marca.nombre,
            descripcion: this.producto.campoBusqueda,
            unidad: this.producto.unidad,
            tiendas: Array.from(this.productosTiendas),
            factorId: this.miInventario.factorId,
            precioFinal: this.precioFinal,
            precioBase: this.miInventario.precioUno(),
            descuento: this.descuentoFinal,
            total: this.cantidadSolicitada + this.totalProductosTiendas,
            mesesSinInteres: this.mesesSinInteres
        };

        this.modalInstance.close(prod);
    }

    calcularPrecioMeses() {

    }

    cancelarCerrar() {
        this.modalInstance.dismiss('Cancelado');
    }

    asignarDescuento(desc) {
        this.descuentoFinal = desc;
    }

    asignarMeses(meses) {
        this.mesesSinInteres = meses;
    }

}

const name = 'eligeProductoInventarios';

// Módulo
export default angular
    .module(name, [
        ExistenciaOtrasTiendas,
        ElegirMesesIntereses
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EligeProductoInventarios,
        bindings: {
            close: '&',
            dismiss: '&',
            modalInstance: '<',
            resolve: '<'
        }
    });

