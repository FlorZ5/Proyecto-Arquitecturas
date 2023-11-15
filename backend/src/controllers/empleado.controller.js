import { EmpleadoModel } from "../models/empleado.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import message from '../utils/messages.js';

const {messageGeneral} = message;

const empleadoCtrl = {};

empleadoCtrl.createEmployee = async(req,res)=>{
  try {
    const data = req.body;
    const resp= await EmpleadoModel.findOne({correo:data.correo});
    //const resp = await EmpleadoModel.create(data);
    if(resp){
      return messageGeneral(res,400,false,"","El correo ya existe");
    }
    data.password = await bcrypt.hash(data.password,10);
    const newEmployee = await EmpleadoModel.create({...data,usuario:req.userid});
    const token= jwt.sign({_id:newEmployee._id},"secreta");
    messageGeneral(res,201,true,{...newEmployee._doc,password:null,token},
      "El empleado se creó correctamente!!!");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

empleadoCtrl.login = async(req,res) =>{
  try {
    const data=req.body;
    const resp = await EmpleadoModel.findOne({correo:data.correo});
    if (!resp){
      return messageGeneral(res,400,false,"","El correo no existe");
    }

    //reconvertir la contraseña encriptada para compararla
    const match = await bcrypt.compare(data.password, resp.password);
    if (match){
      //crear token
      const token = jwt.sign({_id:resp._id},"secreta");
      //imprime la respuesta, y oculta el pw para que no lo vean 
      return messageGeneral(res,201,true,{...resp._doc,password:null,token},"Bienvenido!!!");
    }
    messageGeneral(res,400,false,"","La contraseña es incorrecta!!!");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
}

empleadoCtrl.listAllEmployees=async(req,res)=>{
  try {
    //hace el inner join con el usuario y que no muestre el password.
    const resp= await EmpleadoModel.find();
    messageGeneral(res,200,true,resp,"Lista de empleados");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

empleadoCtrl.listById = async(req,res) =>{
  try {
    const { id } = req.params;
    const resp = await EmpleadoModel.findById(id);
    if(!resp){
      return messageGeneral(res,404,false,"","Empleado no encontrado");
    }
    messageGeneral(res,200,true,resp,"");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

empleadoCtrl.deleteEmployee = async(req,res) =>{
  try {
    const { id } = req.params;
    const resp = await EmpleadoModel.findById(id);
    if(!resp){
      return messageGeneral(res,404,false,"","Empleado no encontrado");
    }
    await resp.deleteOne();
    messageGeneral(res,200,true,"","Empleado eliminado!!!");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

empleadoCtrl.updateEmployee = async(req,res) =>{
  try {
    const { id } = req.params;
    const resp = await EmpleadoModel.findById(id);
    if(!resp){
      return messageGeneral(res,404,false,"","Empleado no encontrado");
    }
    await resp.updateOne(req.body);
    messageGeneral(res,200,true,"","Empleado actualizado!!!");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

empleadoCtrl.listEmployeeBoss = async(req,res) =>{
  try {
   //const { id } = req.params;

   const resp = await EmpleadoModel.find({ usuario:req.usuarioid }).populate(
    {
      path:"jefe",
      selector:"-password"});
    messageGeneral(res,200,true,resp,"");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

empleadoCtrl.searchEmployee = async(req,res) =>{
  try {
    //buscar por nombres
    const { nombre } = req.params;
    //busca los empleados con la expresión que indica que busca los nombres
    //que inicien o contengan la cadena de la expresión.
    const resp = await EmpleadoModel.find({
      nombre:{$regex:".*"+nombre+".*"},
      usuario: req.userid,
    });
    messageGeneral(res,200,true,resp,"");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

export default empleadoCtrl;