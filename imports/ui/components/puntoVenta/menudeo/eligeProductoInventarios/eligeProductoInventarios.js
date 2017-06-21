/**
 * Created by Héctor on 04/05/2017.
 */
import './eligeProductoInventarios.html';
import {Productos} from '../../../../../api/catalogos/productos/collection'
import {Marcas} from '../../../../../api/catalogos/marcas/collection'
import {ProductosInventarios} from '../../../../../api/inventarios/productosInventarios/collection'
import {name as ExistenciaOtrasTiendas} from './existenciaOtrasTiendas/existenciaOtrasTiendas'

class EligeProductoInventarios {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.totalProductosTiendas = 0;
        this.cantidadSolicitada = 0;
        this.productosTiendas = new Map();
        this.precioFinal = '';
        this.descuentoFinal = 0;
        this.mesesSinInteres = false;
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
        this.productosTiendas.set(this.resolve.producto.tiendaId, this.cantidadSolicitada);
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
            mesesSinInteres: this.mesesSinInteres,
            total: this.cantidadSolicitada + this.totalProductosTiendas
        };

        this.modalInstance.close(prod);
    }

    cancelarCerrar() {
        this.modalInstance.dismiss('Cancelado');
    }

    asignarDescuento(desc) {
        this.descuentoFinal = desc;
    }

    asignarMeses() {
        this.mesesSinInteres = true;
    }

}

const name = 'eligeProductoInventarios';

// Módulo
export default angular
    .module(name, [
        ExistenciaOtrasTiendas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/menudeo/${name}/${name}.html`,
        controllerAs: name,
        controller: EligeProductoInventarios,
        bindings: {
            close: '&',
            dismiss: '&',
            modalInstance: '<',
            resolve: '<'
        }
    });

