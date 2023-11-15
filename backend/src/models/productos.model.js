import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const productosSchema= new Schema({
  codigodebarras:{
        type: Number,
        required: true
  }, 
  nombre:{
    type:String,
    required:true
  },
  marca:{
    type:String,
    required:true
  },
  contenido:{
    type:String,
    required:true
  },
  presentación:{
    type:String,
    required:true
  },
  precio:{
    type:Number,
    required:true
  }, 
  precioalpublico:{
    type:Number,
    required:true
  },
  ganancia:{
    type:Number,
    required:true
  },
  existencias:{
    type:Number,
    required:true
  },
  empresaproveedora:{
    type:String,
    required:true
  }
  },{
    timestamps:true
})
export const ProductosModel = model('productos',productosSchema);