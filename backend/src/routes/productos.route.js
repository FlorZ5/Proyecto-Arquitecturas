import { Router } from "express";
import productoCtrl from "../controllers/productos.controller.js";

const route = Router();
route.post('/', productoCtrl.createProducto);
route.get('/', productoCtrl.listAllProductos);
route.get('/listProductoId/:id', productoCtrl.listById);
route.delete('/deleteProducto/:id', productoCtrl.deleteProducto);
route.put('/updateProducto/:id', productoCtrl.updateProducto);
route.get('/listSearch/:nombre',productoCtrl.searchproducto);

export default route;