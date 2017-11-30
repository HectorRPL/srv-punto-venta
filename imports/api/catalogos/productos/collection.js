/**
 * Created by Héctor on 09/03/2017.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Productos = new Mongo.Collection('productos');

Productos.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});


Productos.schema = new SimpleSchema({
    _id:                {type: String,  regEx: SimpleSchema.RegEx.Id},
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    marcaId:            {type: String,  regEx: SimpleSchema.RegEx.Id},
    factorDefaultId:    {type: String,  regEx: SimpleSchema.RegEx.Id},
    codigoProveedor:    {type: String},
    campoBusqueda:      {type: String},
    tipoProductoId:     {type: String},
    descp1:{type:String, optional:true},
    descp2:{type:String, optional:true},
    descp3:{type:String, optional:true},
    descp4:{type:String, optional:true},
    descp5:{type:String, optional:true},
    descp6:{type:String, optional:true},
    descp:{type:String, optional:true},
    calidad:            {type: Number,  defaultValue: 1},
    unidad:            {type:String, defaultValue: 'PZA'},
    costoProveedor:     {type: Number,  decimal: true},
    descontinuado:      {type: Boolean, defaultValue: false},
    linea:              {type: String,  optional:true},
    nombre:             {type: String,  optional:true},
    color:              {type: String,  optional:true},
    importado:          {type: Boolean, defaultValue: false},
    activo:             {type: Boolean, defaultValue: true},
    medidas:            {type: [Number], decimal:true, blackbox: true, optional:true},
    metrosCaja:         {type: Number, decimal:true, optional:true},
    rectificado:        {type: Boolean, optional:true}
});

Productos.attachSchema(Productos.schema);
