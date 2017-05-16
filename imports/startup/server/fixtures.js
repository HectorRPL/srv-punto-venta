/**
 * Created by Héctor on 07/03/2017.
 */
import { Meteor } from 'meteor/meteor';
import { Inventarios } from '../../api/inventarios/collection';
import { Clientes } from '../../api/clientes/collection';
import { Marcas } from '../../api/marcas/collection';
import { Tiendas } from '../../api/tiendas/collection';
import { Bancos } from '../../api/catalogos/bancos/collection';

Meteor.startup(function () {
    // BANCOS
    /*
     if (Bancos.find().count() === 0) {
         const bancos =[
             {"_id": "002", "nombre": "BANAMEX"},
             {"_id": "006", "nombre": "BANCOMEXT"},
             {"_id": "009", "nombre": "BANOBRAS"},
             {"_id": "012", "nombre": "BBVA BANCOMER"},
             {"_id": "014", "nombre": "SANTANDER"},
             {"_id": "019", "nombre": "BANJERCITO"},
             {"_id": "021", "nombre": "HSBC"},
             {"_id": "030", "nombre": "BAJIO"},
             {"_id": "032", "nombre": "IXE"},
             {"_id": "036", "nombre": "INBURSA"},
             {"_id": "037", "nombre": "INTERACCIONES"},
             {"_id": "042", "nombre": "MIFEL"},
             {"_id": "044", "nombre": "SCOTIABANK"},
             {"_id": "058", "nombre": "BANREGIO"},
             {"_id": "059", "nombre": "INVEX"},
             {"_id": "060", "nombre": "BANSI"},
             {"_id": "062", "nombre": "AFIRME"},
             {"_id": "072", "nombre": "BANORTE"},
             {"_id": "102", "nombre": "THE ROYAL BANK"},
             {"_id": "103", "nombre": "AMERICAN EXPRESS"},
             {"_id": "106", "nombre": "BAMSA"},
             {"_id": "108", "nombre": "TOKYO"},
             {"_id": "110", "nombre": "JP MORGAN"},
             {"_id": "112", "nombre": "BMONEX"},
             {"_id": "113", "nombre": "VE POR MAS"},
             {"_id": "116", "nombre": "ING"},
             {"_id": "124", "nombre": "DEUTSCHE"},
             {"_id": "126", "nombre": "CREDIT SUISSE"},
             {"_id": "127", "nombre": "AZTECA"},
             {"_id": "128", "nombre": "AUTOFIN"},
             {"_id": "129", "nombre": "BARCLAYS"},
             {"_id": "130", "nombre": "COMPARTAMOS"},
             {"_id": "131", "nombre": "BANCO FAMSA"},
             {"_id": "132", "nombre": "BMULTIVA"},
             {"_id": "133", "nombre": "ACTINVER"},
             {"_id": "134", "nombre": "WAL-MART"},
             {"_id": "135", "nombre": "NAFIN"},
             {"_id": "136", "nombre": "INTERBANCO"},
             {"_id": "137", "nombre": "BANCOPPEL"},
             {"_id": "138", "nombre": "ABC CAPITAL"},
             {"_id": "139", "nombre": "UBS BANK"},
             {"_id": "140", "nombre": "CONSUBANCO"},
             {"_id": "141", "nombre": "VOLKSWAGEN"},
             {"_id": "143", "nombre": "CIBANCO"},
             {"_id": "145", "nombre": "BBASE"},
             {"_id": "166", "nombre": "BANSEFI"},
             {"_id": "168", "nombre": "HIPOTECARIA FEDERAL"},
             {"_id": "600", "nombre": "MONEXCB"},
             {"_id": "601", "nombre": "GBM"},
             {"_id": "602", "nombre": "MASARI"},
             {"_id": "605", "nombre": "VALUE"},
             {"_id": "606", "nombre": "ESTRUCTURADORES"},
             {"_id": "607", "nombre": "TIBER"},
             {"_id": "608", "nombre": "VECTOR"},
             {"_id": "610", "nombre": "B&B"},
             {"_id": "614", "nombre": "ACCIVAL"},
             {"_id": "615", "nombre": "MERRILL LYNCH"},
             {"_id": "616", "nombre": "FINAMEX"},
             {"_id": "617", "nombre": "VALMEX"},
             {"_id": "618", "nombre": "UNICA"},
             {"_id": "619", "nombre": "MAPFRE"},
             {"_id": "620", "nombre": "PROFUTURO"},
             {"_id": "621", "nombre": "CB ACTINVER"},
             {"_id": "622", "nombre": "OACTIN OPERADORA"},
             {"_id": "623", "nombre": "SKANDIA"},
             {"_id": "626", "nombre": "CBDEUTSCHE"},
             {"_id": "627", "nombre": "ZURICH"},
             {"_id": "628", "nombre": "ZURICHVI"},
             {"_id": "629", "nombre": "SU CASITA"},
             {"_id": "630", "nombre": "CB INTERCAM"},
             {"_id": "631", "nombre": "CI BOLSA"},
             {"_id": "632", "nombre": "BULLTICK CB"},
             {"_id": "633", "nombre": "STERLING"},
             {"_id": "634", "nombre": "FINCOMUN"},
             {"_id": "636", "nombre": "HDI SEGUROS"},
             {"_id": "637", "nombre": "ORDER"},
             {"_id": "638", "nombre": "AKALA"},
             {"_id": "640", "nombre": "CB JPMORGAN"},
             {"_id": "642", "nombre": "REFORMA"},
             {"_id": "646", "nombre": "STP"},
             {"_id": "647", "nombre": "TELECOMM"},
             {"_id": "648", "nombre": "EVERCORE"},
             {"_id": "649", "nombre": "SKANDIA"},
             {"_id": "651", "nombre": "SEGMTY"},
             {"_id": "652", "nombre": "ASEA"},
             {"_id": "653", "nombre": "KUSPIT"},
             {"_id": "655", "nombre": "SOFIEXPRESS"},
             {"_id": "656", "nombre": "UNAGRA"},
             {"_id": "659", "nombre": "OPCIONES EMPRESARIALES DEL NOROESTE"},
             {"_id": "901", "nombre": "CLS"},
             {"_id": "902", "nombre": "INDEVAL"},
             {"_id": "670", "nombre": "LIBERTAD"},
             {"_id": "999", "nombre": "OTRO"}
         ];

         bancos.forEach((banco) => {
             Bancos.insert(banco)
         });
     }
     */

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
