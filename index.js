const app=require('./app.js');
// const mongoose=require('mongoose');
// const mongoDB=async ()=>{
//     await mongoose.connect("mongodb://localhost:27017/revly");
// }
// mongoDB().then(()=>{
//     console.log("MongoDB connected...........................................................");
// }).catch((err)=>{
//     console.log("MongoDB disconnected........................................................");
// })

app.listen(3002,()=>{
    console.log("listening on................................................................");
})
