/**
 * Created by jvltmtz on 1/08/17.
 */
import {Direcciones} from '../../../../../../../api/direcciones/collection';
import {cambiosDireccion, altaDireccion} from '../../../../../../../api/direcciones/methods';
import {asignarDireccionEntregaVnt} from '../../../../../../../api/ventas/methods';
import {cambiosClienteCel} from '../../../../../../../api/clientes/methods';
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
        altaDireccion.callPromise(this.direccion)
            .then(this.$bindToContext((result)=> {
                const datosTemp = {ventaId: this.ventaId, direccionId: result};
                return datosTemp;
            }))
            .then(this.$bindToContext((datos)=> {
                console.log('asignarDireccionEntregaVnt ', datos);
                return asignarDireccionEntregaVnt.callPromise(datos);
            }))
            .then(this.$bindToContext((result)=> {
                this.datosContacto._id = this.clienteId;
                console.log(this.datosContacto);
                return cambiosClienteCel.callPromise(this.datosContacto)
            }))
            .catch(this.$bindToContext((err)=> {
                console.log('Error altaDireccion ', err);
                this.tipoMsj = 'danger';
            }))

            .catch(this.$bindToContext((err)=> {
                console.log("Error al asignas DireccionId o actualizar Tel");
            }))
            .then(this.$bindToContext((result)=> {
                this.state.go('app-venta.orden.comprobante');
            }));
    }

    actualizar() {
        this.crearDireccion();

        cambiosDireccion.callPromise(this.direccion)
            .then(this.$bindToContext((result)=> {
                const datosTemp = {ventaId: this.ventaId, direccionId: this.direccion._id};
                return datosTemp;
            }))
            .catch(this.$bindToContext((err)=> {
                console.log('Error altaDireccion ', err);
                this.tipoMsj = 'danger';
            }))
            .then(this.$bindToContext((datos)=> {
                console.log(datos);
                return asignarDireccionEntregaVnt.callPromise(datos);
            }))
            .then(this.$bindToContext((result)=> {
                this.datosContacto._id = this.clienteId;
                return cambiosClienteCel.callPromise(this.datosContacto)
            }))
            .catch(this.$bindToContext((err)=> {
                console.log("Error al asignas DireccionId o actualizar Tel");
            }))
            .then(this.$bindToContext((result)=> {
                this.state.go('app-venta.orden.comprobante');
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
        template,
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