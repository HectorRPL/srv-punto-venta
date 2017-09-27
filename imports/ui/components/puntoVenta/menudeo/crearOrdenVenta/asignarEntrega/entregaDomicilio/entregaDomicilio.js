/**
 * Created by jvltmtz on 1/08/17.
 */
import {Direcciones} from '../../../../../../../api/direcciones/collection';
import {actualizarDireccion, crearDireccion} from '../../../../../../../api/direcciones/methods';
import {actualizarVentaDireccionEntrega} from '../../../../../../../api/ventas/ordenes/methods';
import {actualizarClienteCel} from '../../../../../../../api/clientes/methods';
import template from './entregaDomicilio.html';

class EntregaDomicilio {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.direccion = {};
        this.state = $state;
        this.clienteId = $stateParams.clienteId;
        this.ventaId = $stateParams.ventaId;
        console.log(this.clienteId);
        this.datos = {
            telefonos: [{telefono: ''}]
        };

        this.subscribe('direcciones.propietario', ()=> [{propietarioId: this.clienteId}]);
        this.helpers({
            direccionCliente(){
                return Direcciones.findOne({propietarioId: this.clienteId}) || {};
            }
        });
    }

    guardar() {
        this.crearDireccion();

        crearDireccion.callPromise(this.direccion)
            .then(this.$bindToContext((result)=> {
                return result;
            }))
            .then(this.$bindToContext((direccionId)=> {
                return actualizarVentaDireccionEntrega.callPromise({
                    ventaId: this.ventaId, direccionId: direccionId
                });
            }))
            .then(this.$bindToContext((result)=> {
                this.datosContacto._id = this.clienteId;
                return cambiosClienteCel.callPromise(this.datosContacto)
            }))
            .then(this.$bindToContext((result)=> {
                this.state.go('app.venta.orden.comprobante.factura', {clienteId: this.clienteId});
            }))
            .catch(this.$bindToContext((err)=> {
                this.tipoMsj = 'danger';
            }));

    }

    actualizar() {
        this.crearDireccion();

        console.log(this.direccion);
        actualizarDireccion.callPromise(this.direccion)
            .then(this.$bindToContext((result)=> {
                let datosTemp = {ventaId: this.ventaId, direccionId: this.direccion._id};
                return actualizarVentaDireccionEntrega.callPromise(datosTemp);
            }))
            .then(this.$bindToContext((result)=> {
                this.datosContacto._id = this.clienteId;
                return actualizarClienteCel.callPromise(this.datosContacto)
            }))
            .then(this.$bindToContext((result)=> {
                this.state.go('app.venta.orden.comprobante.factura', {clienteId: this.clienteId});
            }))
            .catch(this.$bindToContext((err)=> {
                console.log(err);
                this.tipoMsj = 'danger';
            }));

    }



    crearDireccion() {
        this.direccion = angular.copy(this.direccionCliente);
        delete this.direccion.colonias;
        delete this.direccion.fechaCreacion;
        this.direccion.propietarioId = this.clienteId;
    }

    agregarTelefono() {
        if (!this.datos.telefonos) {
            this.datos.telefonos = [{telefono: ''}];
        } else {
            this.telefono = {
                telefono: '',
                extension: ''
            };
            this.datos.telefonos.push(this.telefono);
        }
    }
}

const name = 'entregaDomicilio';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EntregaDomicilio
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.venta.orden.entrega.domicilio', {
            url: '/domicilio',
            template: '<entrega-domicilio></entrega-domicilio>'
        });
}