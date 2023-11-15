import { Router } from "express";
import servicesCtrl from "../controllers/servicios.controller.js";

const route = Router();
route.post('/', servicesCtrl.createService);
route.get('/', servicesCtrl.listAllServices);
route.get('/listServicesid/:id', servicesCtrl.listById);
route.delete('/deleteService/:id', servicesCtrl.deleteService);
route.put('/updateService/:id', servicesCtrl.updateService);
route.get('/listServicesEmployee/:id', servicesCtrl.listServicesEmployee);
route.get('/listSearchService/:id/:nombre', servicesCtrl.searchService);//id empleado nombre del duseño del vehiculo

export default route;