/**
 * Created by jvltmtz on 25/05/17.
 */
import { Meteor } from 'meteor/meteor';
import {Promociones} from '../../../api/promociones/collection'
import {DatosFiscales} from '../../../api/datosFiscales/collection'

// Antigua manera de importar
var path = require('path');
// Obtenemos la ruta base para luego concatenarle lo demás.
var basePath = path.resolve('.').split('.meteor')[0].replace(/\/$/, '');
const csv = require('csvtojson');
var fs = require('fs');

Meteor.startup(function () {

    if(Promociones.find().count() === 0){
        const primeraPromocion = {
            nombre: "PRIMERA PROMO",
            descuento: 15,
            fechaInicio: new Date(),
            fechaFin: new Date()
        };

        Promociones.insert(primeraPromocion);

    }

    if (DatosFiscales.find().count() === 0) {
        var readStream = fs.createReadStream(basePath + "/private/datosFiscales.csv");

        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {
            DatosFiscales.insert(jsonObject, (err)=>{
                if(err){
                    console.log(err.message);
                }
            });

        }));
    }


});
