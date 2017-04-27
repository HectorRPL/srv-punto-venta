/**
 * Created by Héctor on 06/03/2017.
 */
import {name as ListadoProductos} from "./listadoProductos/listadoProductos";
import {name as GenerarNotaFactura} from "./generarNotaFactura/generarNotaFactura";
import {name as DesglosePago} from "./desglosePago/desglosePago";
import {name as DatosEntrega} from "./datosEntrega/datosEntrega";
import {name as DatosFiscalesCliente} from "./datosFiscalesCliente/datosFiscalesCliente";
import './tabsNotaFacDev.html';

class TabsNotaFacDev {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);


    }

}

const name = 'tabsNotaFacDev';

// Módulo
export default angular
    .module(name, [
        ListadoProductos,
        GenerarNotaFactura,
        DesglosePago,
        DatosEntrega,
        DatosFiscalesCliente
    ])
    .component(name, {
        templateUrl: `imports/ui/components/puntoVenta/${name}/${name}.html`,
        controllerAs: name,
        controller: TabsNotaFacDev,
        bindings: {
            pedido: '<'
        }
    });

