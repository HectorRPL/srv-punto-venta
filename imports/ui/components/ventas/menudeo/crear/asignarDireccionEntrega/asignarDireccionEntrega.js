/**
 * Created by jvltmtz on 1/08/17.
 */
import {Direcciones} from '../../../../../../api/direcciones/collection';
import {name as FormaDireccion} from "../../../../comun/formas/formaDireccion/formaDireccion";
import {actualizarDireccion, crearDireccion} from '../../../../../../api/direcciones/methods';
import {actualizarDirccnEntrg} from '../../../../../../api/ventas/ordenes/methods';
import template from './asignarDireccionEntrega.html';

class AsignarDireccionEntrega {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.direccion = {};
        this.state = $state;

        this.subscribe('direcciones.propietario', () => [
            {propietarioId: this.getReactively('resolve.clienteId')}
        ]);

        this.helpers({
            direccionCliente() {
                return Direcciones.findOne(
                    {propietarioId: this.getReactively('resolve.clienteId')}) || {};
            }
        });
    }

    guardar() {
        this.crearDireccion();
        this.direccion.propietarioId = this.resolve.clienteId;

        crearDireccion.callPromise(this.direccion)
            .then(this.$bindToContext((result) => {
                return actualizarDirccnEntrg.callPromise({
                    ventaId: this.resolve.ventaId, direccionId: result
                });
            }))
            .then(this.$bindToContext((result) => {
                this.modalInstance.close(true);
            }))
            .catch(this.$bindToContext((err) => {
                this.tipoMsj = 'danger';
            }));
    }

    actualizar() {
        this.crearDireccion();

        actualizarDireccion.callPromise(this.direccion)
            .then(this.$bindToContext((result) => {
                let datosTemp = {ventaId: this.resolve.ventaId, direccionId: this.direccion._id};
                return actualizarDirccnEntrg.callPromise(datosTemp);
            }))
            .then(this.$bindToContext((result) => {
                this.modalInstance.close(true);
            }))
            .catch(this.$bindToContext((err) => {
                this.tipoMsj = 'danger';
            }));
    }


    crearDireccion() {
        this.direccion = angular.copy(this.direccionCliente);
        delete this.direccion.colonias;
        delete this.direccion.fechaCreacion;
    }

    aceptar() {
        this.modalInstance.close(true);
    }

    cerrar() {
        this.modalInstance.dismiss('Cancelado');
    }
}

const name = 'asignarDireccionEntrega';

// create a module
export default angular
    .module(name, [
        FormaDireccion
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: AsignarDireccionEntrega,
        bindings: {
            close: '&',
            dismiss: '&',
            modalInstance: '<',
            resolve: '<'
        }
    });