import {Router} from "express";
import empleadoCtrl from "../controllers/empleado.controller.js";
import { verificarToken } from "../midlewares/Auth.js";

const route = Router();

route.post('/register',verificarToken,empleadoCtrl.createEmployee);//
route.post('/login',empleadoCtrl.login);
route.get('/',empleadoCtrl.listAllEmployees);
route.get('/listid/:id',empleadoCtrl.listById);
route.delete('/delete/:id',empleadoCtrl.deleteEmployee);
route.put('/update/:id',empleadoCtrl.updateEmployee);
route.get('/listboss',empleadoCtrl.listEmployeeBoss);
route.get('/listSearch/:nombre',empleadoCtrl.searchEmployee);//id jefe nombre del empleado

export default route;