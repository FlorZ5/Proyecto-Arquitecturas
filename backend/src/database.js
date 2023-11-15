import mongoose, { Mongoose } from "mongoose";
//const URI = "mongodb://177.249.160.248/32/abarrotes";
//Creamos la conexión

const connectDB=async()=>{
  mongoose.connect("mongodb+srv://Services_roo7UTNA:Ropa.1324@atlascluster.5liafqh.mongodb.net/abarrotes?retryWrites=true&w=majority").then(()=> console.log("Connectec to MongoDB Atlas")).catch((error)=> console.error(error));
  /*try {
    const db = await mongoose.connect(URI);
    console.log('Base de datos conectada: ',db.connection.name);
  } catch (error) {
    console.log('Error:',error.message);
  }*/
}

export default connectDB;