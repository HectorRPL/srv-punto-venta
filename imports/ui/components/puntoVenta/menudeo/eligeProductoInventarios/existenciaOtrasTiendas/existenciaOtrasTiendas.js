/**
 * Created by Héctor on 16/05/2017.
 */
import "./existenciaOtrasTiendas.html";
import {ProductosInventarios} from '../../../../../../api/inventarios/productosInventarios/collection'

class ExistenciaOtrasTiendas {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('productosInventarios.todasTiendas', ()=> [
            {
                productoId: this.getReactively('productoid'),
                tiendaId: this.getReactively('tiendaid')
            }
        ]);

        this.helpers({
            otrosInventarios() {
                return ProductosInventarios.find();
            }
        });

    }

    generarProdsTiendas(productoTienda) {
        productoTienda.numProds = 0;
    }

    totalProductosTiendas() {
        let total = 0;
        this.otrosInventarios.forEach((item)=> {
            if (item.numProds && item.numProds > 0) {
                this.productostienda.set(item._id, item.numProds);
                total += item.numProds;
            }
        });
        this.total = total;
    }


}

const name = 'existenciaOtrasTiendas';

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/menudeo/eligeProductoInventarios/${name}/${name}.html`,
        controllerAs: name,
        controller: ExistenciaOtrasTiendas,
        bindings: {
            tiendaid: '<',
            productoid: '<',
            productostienda: '=',
            total: '='
        }
    });
