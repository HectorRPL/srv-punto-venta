/**
 * Created by jvltmtz on 25/05/17.
 */
import { Meteor } from 'meteor/meteor';
import {Promociones} from '../../../api/promociones/collection'

Meteor.startup(function () {

    console.log(Promociones.find().count());
    if(Promociones.find().count() === 0){
        const primeraPromocion = {
            nombre: "PRIMERA PROMO",
            descuento: 15,
            fechaInicio: new Date(),
            fechaFin: new Date()
        };

        Promociones.insert(primeraPromocion);

    }

});
