//initial config
import "dotenv/config"; 
import express from "express";
import mongoose from "mongoose";
import personRoutes from "./routes/personRoutes.js"; 
const app = express(); 
const port = 4000;
const { URI } = process.env;  


//middlewares
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use('/person', personRoutes); 


//initial route handler
app.get('/', (req, res) => {
    res.json({message: "Home page"}); 
}); 

//connect to database
mongoose.connect(`${URI}`)
.then(resp => {    
    //make a port available
    app.listen(port, () => {
        console.log(`App is running on http://localhost:${port}`);  
    }); 
})
.catch(err => {
    console.error(err); 
});


