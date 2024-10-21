import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
   const connectionState = mongoose.connection.readyState;

   if(connectionState === 1) {
      console.log('terkoneksi...')
   }

   if(connectionState === 2){
      console.log("tersambung")
      return;
   }
   
   try {
      mongoose.connect(MONGODB_URI!, {
         dbName: 'crud',
         bufferCommands: true
      });
   }catch(err: any){
      console.log('Error: ', err);
      throw new Error("Error: ", err);
   }
}

export default connect;