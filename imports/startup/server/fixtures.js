/**
 * Created by Héctor on 07/03/2017.
 */
import { Meteor } from 'meteor/meteor';
import { Inventarios } from '../../api/inventarios/collection';
import { Clientes } from '../../api/clientes/collection';
import { Marcas } from '../../api/marcas/collection';
import { Tiendas } from '../../api/tiendas/collection';

Meteor.startup(function () {
    /*
    if (Inventarios.find().count() === 0) {
        const inventario =[
            {stock: 514, cantidad: 1, marca: 'DALTILE', clase: '1A', medida: '33X33', stock: 90,  metrosCaja: 1.5 , lista:'0', precioUnitario: 105, costoUnitario: 10, fechaCompra: '01 ENE 2016', descuentoPublico:  5, linea: 'PLATINUM',  nombre: 'PIEDRA LAJA ', color: 'NEGRO'},
            {stock: 456, cantidad: 1, marca: 'DALTILE', clase: '2A', medida: '40X40', stock: 30,  metrosCaja: 2.0 , lista:'0', precioUnitario: 300, costoUnitario: 20, fechaCompra: '31 ENE 2016', descuentoPublico: 10, linea: 'PLATINUM',  nombre: 'POSITANO ', color: 'BEIGE'},
            {stock: 510, cantidad: 1, marca: 'DALTILE', clase: '3A', medida: '45X90', stock: 45,  metrosCaja: 2.0 , lista:'0', precioUnitario: 230, costoUnitario: 50, fechaCompra: '16 JUL 2016', descuentoPublico: 40, linea: 'CLASICA',   nombre: 'STONE VIEW', color: 'VIEW BEIGE'},
            {stock: 794, cantidad: 1, marca: 'GREDA',   clase: '1A', medida: '90X90', stock: 10,  metrosCaja: 1.9 , lista:'0', precioUnitario: 199, costoUnitario: 50, fechaCompra: '17 AGO 2016', descuentoPublico: 50, linea: 'CLASICA',   nombre: 'MARANELLO', color: 'BEIGE1'},

        ];

        inventario.forEach((inventario) => {
            Inventarios.insert(inventario)
        });
    }
     */

    /*
    if (Clientes.find().count() === 0) {
        const cliente = [
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '45030', numeroExterior: '7', numeroInterior: '2', nombre: 'HÉCTOR',      apellidoPaterno: 'FLORES',      apellidoMaterno: 'RODRIGUEZ',   estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.01@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '16540', numeroExterior: '7', numeroInterior: '2', nombre: 'RODOLFO',     apellidoPaterno: 'PÉREZ',       apellidoMaterno: 'PÉREZ',       estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.02@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '14930', numeroExterior: '7', numeroInterior: '2', nombre: 'ARMANDO',     apellidoPaterno: 'RODRIGUEZ',   apellidoMaterno: 'VIZUET',      estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.03@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '12230', numeroExterior: '7', numeroInterior: '2', nombre: 'BART',        apellidoPaterno: 'SAMUDIO',     apellidoMaterno: 'ROSALES',     estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.04@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '12220', numeroExterior: '7', numeroInterior: '2', nombre: 'HOMERO',      apellidoPaterno: 'GONZÁLES',    apellidoMaterno: 'JACKSON',     estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.05@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '18830', numeroExterior: '7', numeroInterior: '2', nombre: 'SEBASTÍAN',   apellidoPaterno: 'ROSALES',     apellidoMaterno: 'SALINAS',     estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.06@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502',  pais: 'México', codigoPostal: '16930', numeroExterior: '7', numeroInterior: '2', nombre: 'ANA M',       apellidoPaterno: 'PRADO',       apellidoMaterno: 'MARTÍNEZ',    estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.07@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '17030', numeroExterior: '7', numeroInterior: '2', nombre: 'PEDRO',       apellidoPaterno: 'VALENTÍN',    apellidoMaterno: 'SÁNCHEZ',     estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.08@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '96030', numeroExterior: '7', numeroInterior: '2', nombre: 'PEPE',        apellidoPaterno: 'SÁNCHEZ',     apellidoMaterno: 'PÉREZ',       estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.09@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '10030', numeroExterior: '7', numeroInterior: '2', nombre: 'BART',        apellidoPaterno: 'SALINAS',     apellidoMaterno: 'VIZUET',      estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.10@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '11230', numeroExterior: '7', numeroInterior: '2', nombre: 'HOMERO',      apellidoPaterno: 'POZADAS',     apellidoMaterno: 'JACKSON',     estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.11@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '99930', numeroExterior: '7', numeroInterior: '2', nombre: 'MAXIMILIANO', apellidoPaterno: 'VILLAFUERTE', apellidoMaterno: 'ROSALES',     estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.12@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '16030', numeroExterior: '7', numeroInterior: '2', nombre: 'RODOLFO',     apellidoPaterno: 'HERRERA',     apellidoMaterno: 'LAZARUS',     estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.13@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '11232', numeroExterior: '7', numeroInterior: '2', nombre: 'ARMANDO',     apellidoPaterno: 'MARTÍNEZ',    apellidoMaterno: 'BUTCH',       estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.14@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
            {razonSocial: 'Rhane Servicios Iformáticos S.A. de C.V.', rfc: 'FOVH3110839x9', telefono: '(55 5676-9502)', pais: 'México', codigoPostal: '18550', numeroExterior: '7', numeroInterior: '2', nombre: 'HÉCTOR',      apellidoPaterno: 'JACKSON',     apellidoMaterno: 'PÁRAMO',      estado: 'Ciudad De México', delegacionMunicipio: 'Xochimilco', colonia: 'Potrero de San Bernardino', calle: 'Roselina', factura: {razonSocial: 'RHANE SERVICIOS INFORMATICOS S.A.B DE C.V. DE ', rfc: 'FOVH3110839X9', email: 'ejemplo.15@ejemplo.com', numeroInterior: '2', numeroExterior: '7', calle: 'ROSELINA', colonia: 'POTRERO DE SAN BERNARDINO', delegacionMunicipio: 'XOCHIMILCO', estado: 'CIUDAD DE MEXICO', correoElectronico: 'hector.kaizen@gmail.com', telefonoUno: '55 5676 9502', telefonoDos: '55 6102 4884'}},
        ];
        cliente.forEach((cliente) => {
            Clientes.insert(cliente)
        });
    }
     */

    // // Proveedores
    // if (Proveedores.find().count() === 0) {
    //     const proveedor =[
    //         {nombre: "Daltile"},
    //         {nombre: "Acuere"},
    //         {nombre: "Acuaspa"},
    //         {nombre: "Madisam"},
    //         {nombre: "Hidroplast"},
    //         {nombre: "Helvex"},
    //         {nombre: "Valmex"},
    //         {nombre: "Riquetti"},
    //     ];
    //
    //     proveedor.forEach((proveedor) => {
    //         Proveedores.insert(proveedor)
    //     });
    // }
    //
    // // Tiendas
    // if (Tiendas.find().count() === 0) {
    //     const tienda =[
    //         {nombre: "Ceragres Xochimilco", activo: true},
    //         {nombre: "Ceragres Acapulco"},
    //         {nombre: "Cerebro"},
    //         {nombre: "EL Edificio"},
    //         {nombre: "Tláhuac"},
    //     ];
    //
    //     tienda.forEach((tienda) => {
    //         Tiendas.insert(tienda)
    //     });
    // }
    //
    // // Productos
    // if (Productos.find().count() === 0) {
    //     const producto =[
    //         {marcaId: '', nombre: '', color: '', primera: true, codigoMarca: 'es un string', tipoProductoId: 'aqui va el id', factores: [1.5, 1.6, 1.7, 1.8]},
    //     ];
    //     producto.forEach((producto) => {
    //         Productos.insert(producto)
    //     });
    // }
    //
    // // Tipo de Producto
    // if (TipoProductos.find().count() === 0) {
    //     const tipoProductos =[
    //         {descripcion: 'ticano'},
    //         {descripcion: 'monomando'},
    //         {descripcion: 'ticano'},
    //     ];
    //
    //     tipoProductos.forEach((tipoProductos) => {
    //         TipoProductos.insert(tipoProductos)
    //     });
    // }
    //
    // // Inventario
    // if (Inventario.find().count() === 0) {
    //     const tipoProductos =[
    //         {tiendaId: 'aqui va el id de la tienda'}
    //     ];
    //
    //     tipoProductos.forEach((tipoProductos) => {
    //         Inventario.insert(tipoProductos)
    //     });
    // }
    //
    // // Stock
    // if (Stock.find().count() === 0) {
    //     const stock =[
    //         {inventarioId: '', productoId: '', existencia: 10, compraId: ''}
    //     ];
    //     stock.forEach((stock) => {
    //         Stock.insert(stock)
    //     });
    // }

});
