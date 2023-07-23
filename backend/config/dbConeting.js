import mongoose from "mongoose";
mongoose.set('strictQuery', true);

const dbconnection = ()=>{
    mongoose.connect(process.env.Mongo_Uri,({
        useNewUrlParser : true,
        useUnifiedTopology: true
    
    }))
    .then(data => {
        console.log(`Database connected with ${data.connection.host}`)
    })
    .catch(err =>{
        console.log(err)
    })  
}
   export default dbconnection;
