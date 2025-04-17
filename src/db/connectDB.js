import mongoose from "mongoose";
const connectDB =  async()=>{
    try {
      const mongoURI = `${process.env.MONGODB_URL}/Cluster0`
      console.log(mongoURI)
      const connectionInstance = await mongoose.connect(mongoURI)
      console.log("Connection Successfull" , connectionInstance.connection.host)
    } catch (error) {
        console.log("Error connecting to the database" , error)   
        process.exit(1)
    }
}

export default connectDB