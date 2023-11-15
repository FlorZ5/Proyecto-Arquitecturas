import { ProductosModel } from "../models/productos.model.js";
import message from '../utils/messages.js';

const {messageGeneral} = message;

const productoCtrl = {};

productoCtrl.createProducto = async(req,res)=>{
    try 
    {
        const data = req.body;
        data.ganancia=(parseInt(data.precioalpublico)-parseInt(data.precio));
        const resp = await ProductosModel.create(data);
        messageGeneral(res,201,true,resp,"Producto dado de alta!!!");
    } 
    catch (error) 
    {
        messageGeneral(res,500,false,"",error.message);
    }
};

productoCtrl.listAllProductos=async(req,res)=>{
    try {
      console.log(req.params)
      const resp= await ProductosModel.find()  
      messageGeneral(res,200,true,resp,"Lista de productos");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  productoCtrl.listById = async(req,res) =>{
    try {
      const { id } = req.params;
      const resp = await ProductosModel.findById(id);
      if(!resp){
        return messageGeneral(res,404,false,"","Producto no encontrado");
      }
      messageGeneral(res,200,true,resp,"");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  productoCtrl.deleteProducto = async(req,res) =>{
    try {
      const { id } = req.params;
      const resp = await ProductosModel.findById( id );
      if(!resp){
        return messageGeneral(res,404,false,"","Producto no encontrado");
      }
      await resp.deleteOne();
      messageGeneral(res,200,true,"","Producto eliminado!!!");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  productoCtrl.updateProducto = async(req,res) =>
  {
      try 
      {
        const { id } = req.params;
        const resp = await ProductosModel.findById(id);
        if(!resp)
        {
          return messageGeneral(res,404,false,"","Producto no encontrado");
        }
          if (req.body.codigodebarras != undefined){
            resp.codigodebarras = req.body.codigodebarras;
          }
          if (req.body.nombre != undefined){
            resp.nombre = req.body.nombre;
          }
          if (req.body.marca != undefined){
            resp.marca = req.body.marca;
          }
          if (req.body.contenido != undefined){
            resp.contenido = req.body.contenido;
          }
          if (req.body.presentacion != undefined){
            resp.presentacion = req.body.presentacion;
          }
          if (req.body.precio != undefined){
            resp.precio = req.body.precio;
          }
          if (req.body.precioalpublico != undefined){
            resp.precioalpublico  = req.body.precioalpublico;
          }  
          if (req.body.existencias != undefined){
            resp.existencias  = req.body.existencias;
          } 
          if (req.body.empresaproveedora != undefined){
            resp.empresaproveedora  = req.body.empresaproveedora;
          }         
          resp.ganancia=(parseInt(resp.precioalpublico)-parseInt(resp.precio));
        await resp.updateOne(resp);
        await resp.updateOne( req.body );
        console.log(resp);
        messageGeneral(res,200,true,"","Producto actualizado!!!");
      }
      catch (error) 
      {
        messageGeneral(res,500,false,"",error.message);
      }
  };

  productoCtrl.searchproducto = async(req,res) =>{
    try {
      //buscar por nombres
      const { nombre } = req.params;
      //busca los empleados con la expresión que indica que busca los nombres
      //que inicien o contengan la cadena de la expresión.
      const resp = await ProductosModel.find({
        nombre:{$regex:".*"+nombre+".*"},
        producto: req.productoid,
      });
      messageGeneral(res,200,true,resp,"");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  export default productoCtrl;