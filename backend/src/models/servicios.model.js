import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const servicesSchema = new Schema({
    nombre:{
        type:String,
        required:true
    },
    telefono:{
        type:Number, 
        required:true
    },
    modelo:{
        type:String,
        required:true
    },
    color:{
        type:String, 
        required:true
    },
    marca:{
        type:String, 
        required:true
    },
    ano:{
        type:Number, 
        required:true
    },
    lav:{
        type:Number, 
        required:true
    },
    eyp:{
        type:Number, 
        required:true
    },
    asp:{
        type:Number, 
        required:true
    },
    lm:{
        type:Number, 
        required:true
    },
    monto:{
        type:Number, 
        required:true
    },
    pago:{
        type:Number, 
        required:true
    },
    saldo:{
        type:Number, 
        required:true
    },
    empleado:{
        type:String/*Schema.ObjectId*/, 
        required:true
        /*ref:"empleado"*/
    }},
    {
        timestamps:true
})
export const ServicesModel = model('servicios', servicesSchema);
//especificaciones sobre lp que debe cumplir el registro de ususarios