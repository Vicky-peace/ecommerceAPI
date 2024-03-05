import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from './src/db/config.js';


// Routes
import authRoutes from "./src/Routes/authRoutes.js";
import customerRoutes from "./src/Routes/customerRoutes.js";
import productRoutes from "./src/Routes/productsRoutes.js";
import categoryRoute from "./src/Routes/categoryRoute.js";
import orderRoutes from "./src/Routes/orderRoutes.js";




const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


//instantiate the routes
authRoutes(app);
customerRoutes(app);
productRoutes(app);
categoryRoute(app);
orderRoutes(app)

app.get('/', (req,res)=>{
    res.sendStatus('Wecome to My Ecommerce API💻')
});

app.listen(config.port,() =>{
    console.log(`Server is listening at port ${config.port}`);
})