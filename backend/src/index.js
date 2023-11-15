//const express=require('express');
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './database.js';
import userRoute from './routes/usuario.route.js';
import empleadoRoute from './routes/empleado.route.js';
import servicesRoute from './routes/servicios.route.js';
import productosRoute from './routes/productos.route.js';

connectDB();
//se crea la constante con la funcionalidad
//de express
const app = express();
//definir el puerto por el que va escuchar
//el servidor
app.set('Port',4000);
app.use(morgan('dev'));
//se establece la respuesta del servidor
//en formato json
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors({origen:'*'}));

app.use('/api',userRoute);
app.use('/api/employee',empleadoRoute);
app.use('/api/services', servicesRoute);
app.use('/api/productos', productosRoute);

app.listen(app.get('Port'), ()=>{
  //console.log('Servidor escuchando por el puerto: ',app.get('Port'));
  console.log(`Servidor escuchando por el puerto ${app.get('Port')}`);
});

app.use('/',(req,res)=>{
  res.status(200).json({
    ok:true,
    message: "Mi primera petición a un servidor NodeJS!!",
  });
});

