import template from "./preciosProducto.html";
import {ConfiguracionesGlobales} from "../../../../../../api/catalogos/configuracionesGlobales/collection";
import {MesesIntereses} from "../../../../../../api/catalogos/mesesIntereses/collection";
import {Promociones} from "../../../../../../api/promociones/collection";

class PreciosProducto {

    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.mostrarMeses = true;
        this.mostrarPromo = true;

        this.subscribe('mesesIntereses.todos');
        this.subscribe('configuracionesGlobales.lista', () => [{_id: 'iva'}]);
        this.subscribe('promociones.lista', () => [{_id: this.getReactively('promocionId')}]);
        this.fechaHoy = new Date();

        this.helpers({
            conf() {
                return ConfiguracionesGlobales.findOne({_id: 'iva'});
            },
            meses() {
                return MesesIntereses.find({});
            },
            promocion() {
                return Promociones.findOne({});
            }
        });
    }


    precioDescuento() {

        this.respuesta({
            mesesSinInteres: 0,
            descuento: this.promocion.descuento,
            precioFinal: this.precioFinal,
            iva: this.conf.valor,
            comision: 0
        });
    }

    precioMeses(mes) {

        this.respuesta({
            mesesSinInteres: mes._id,
            descuento: 0,
            precioFinal: this.precioFinal,
            iva: this.conf.valor,
            comision: mes.factor
        });
    }

    precioContado() {

        this.respuesta({
            mesesSinInteres: 0,
            descuento: 0,
            precioFinal: this.precioFinal,
            iva: this.conf.valor,
            comision: 0
        });

    }

    mostrarPreciosMeses() {
        this.mostrarMeses = !this.mostrarMeses;
        this.mostrarPromo = true;
    }

    mostrarPreciosPromo() {
        this.mostrarPromo = !this.mostrarPromo;
        this.mostrarMeses = true;
    }

}

const name = 'preciosProducto';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: PreciosProducto,
        bindings: {
            costo: '<',
            precio: '<',
            promocionId: '<',
            respuesta: '&'
        }
    });
