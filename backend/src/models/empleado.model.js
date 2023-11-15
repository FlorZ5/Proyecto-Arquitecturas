import mongoose from 'mongoose';
const {Schema, model} = mongoose;
//age     : Number,
//stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
//});
const employeeSchema= new Schema(
  {
    nombre:{ type:String,required:true },
    apellidos:{ type:String,required:true },
    edad:{ type:String,required:true},
    correo:{ type:String,required:true},
    password:{ type:String,required:true},
    //id:{ type:String,required:true },
    nivel:{ type:Number,required:true },
    jefe:{ type:Schema.ObjectId,ref:"usuario" },
  },
  {timestamps:true}
)

export const EmpleadoModel = model('empleado',employeeSchema);