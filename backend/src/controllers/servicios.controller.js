import {ServicesModel} from '../models/servicios.model.js';
import message from '../utils/messages.js';

const {messageGeneral}=message;
 
const servicesCtrl={};

servicesCtrl.createService = async(req,res)=>
    {
        try 
        {
            const data = req.body;
            data.monto=(parseInt(data.lav)+parseInt(data.eyp)+parseInt(data.asp)+parseInt(data.lm));
            data.saldo=(parseInt(data.pago)-(parseInt(data.monto)));
            data.pagoTotal = (parseInt(data.pago)+parseInt(data.saldo));
            const resp = await ServicesModel.create(data);
            messageGeneral(res,201,true,resp,"Servicio creado!!!");
        } 
        catch (error) 
        {
            messageGeneral(res,500,false,"",error.message);
        }
    };
  
  servicesCtrl.listAllServices=async(req,res)=>{
    try {
      //hace el inner join con el usuario y que no muestre el password.
      console.log(req.params)
      const resp= await ServicesModel.find().populate({
        path: "empleado",
        select: req.params.id
      });
        
      messageGeneral(res,200,true,resp,"Lista de servicios");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };
  
  servicesCtrl.listById = async(req,res) =>{
    try {
      const { id } = req.params;
      const resp = await ServicesModel.findById(id);
      if(!resp){
        return messageGeneral(res,404,false,"","Servicio no encontrado");
      }
      messageGeneral(res,200,true,resp,"");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  servicesCtrl.deleteService = async(req,res) =>{
    try {
      const { id } = req.params;
      const resp = await ServicesModel.findById(id);
      if(!resp){
        return messageGeneral(res,404,false,"","Servicio no encontrado");
      }
      await resp.deleteOne();
      messageGeneral(res,200,true,"","Servicio eliminado!!!");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  servicesCtrl.updateService = async(req,res) =>
  {
      try 
      {
        const { id } = req.params;
        const resp = await ServicesModel.findById(id);
        if(!resp)
        {
          return messageGeneral(res,404,false,"","Servicio no encontrado");
        }
          if (req.body.lav != undefined){
            resp.lav = req.body.lav;
          }
          if (req.body.eyp != undefined){
            resp.eyp = req.body.eyp;
          }
          if (req.body.asp != undefined){
            resp.asp = req.body.asp;
          }
          if (req.body.lm != undefined){
            resp.lm = req.body.lm;
          }
          if (req.body.pago != undefined){
            resp.pago  = req.body.pago;
          }
          //console.log(resp.lav);
          //console.log(resp.monto);
          resp.monto=(parseInt(resp.lav)+parseInt(resp.eyp)+parseInt(resp.asp)+parseInt(resp.lm));
          console.log(resp.monto);
          resp.saldo=(parseInt(resp.pago)-(parseInt(resp.monto)));
          resp.pagoTotal = (parseInt(resp.pago)+parseInt(resp.saldo));
          console.log(resp);
        await resp.updateOne(resp);
        await resp.updateOne(req.body);
        messageGeneral(res,200,true,"","Servicio actualizado!!!");
        
      }
      catch (error) 
      {
        messageGeneral(res,500,false,"",error.message);
      }
  };

  servicesCtrl.listServicesEmployee = async(req,res) =>{
    try {
     const { id } = req.params;
     const resp = await ServicesModel.find({ empleado:id });
      messageGeneral(res,200,true,resp,"");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  servicesCtrl.searchService = async(req,res) =>{
    try {
      //buscar por nombres
      const { id, nombre } = req.params;
      //busca los empleados con la expresión que indica que busca los nombres
      //que inicien o contengan la cadena de la expresión.
      const resp = await ServicesModel.find({
        nombre:{$regex:".*"+nombre+".*"},
        empleado: id,
      });
      messageGeneral(res,200,true,resp,"");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  export default servicesCtrl; 