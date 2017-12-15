/**
 * Created by jvltmtz on 05/12/17.
 */
import {VentasPartidasOrdenes} from "../../../../../../api/ventas/ordenes/partidas/collection";
import {borrarPartidaOrden} from "../../../../../../api/ventas/ordenes/partidas/methods";
import template from "./partidasVentaOrden.html";

class PartidasVentaOrden {

    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.ventaId = $stateParams.ventaId;
        console.log(this.ventaId);

        this.subscribe('ventasPartidasOrdenes.lista', () => [{ventaId: this.ventaId}, {}
        ]);

        this.helpers({
            partidas() {
                return VentasPartidasOrdenes.find({ventaId: this.ventaId});
            }
        });
    }

    quitarArticulo(_id) {
        borrarPartidaOrden.callPromise({_id: _id})
            .then(this.$bindToContext((result) => {
                console.log(result);
            }))
            .catch(this.$bindToContext((error) => {
                console.log(error);
            }));
    }


}

const name = 'partidasVentaOrden';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: PartidasVentaOrden
    });