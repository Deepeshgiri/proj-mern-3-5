import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/config.js";
import router from "./routes/authRoute.js";
import cors from 'cors' // import cors
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'

const app = express();
// configure env
dotenv.config();
//database configure
connectDb();
//middleware
app.use(express.json());
app.use(morgan("dev"));
// implement cors 
app.use(cors());


//routes
app.use('/api/v1/auth',router)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

//PORT
const PORT = process.env.PORT || 8800;
//REST API
app.get("/", (req, res) => {
  res.send({ message: "welcome to ecommece app" });
});
app.listen(PORT, () =>
  console.log(
    chalk.bgBlue.white.bold(
      `server is running on ${process.env.DEV_MODE} mode ${PORT}`
    )
  )
);
