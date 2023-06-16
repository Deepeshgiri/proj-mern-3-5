import mongoose from "mongoose";
import chalk from "chalk";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      chalk.bgMagenta(`Connected to mongoDB database ${conn.connection.host}`)
    );
  } catch (error) {
    console.log(chalk.red(`Error in mongodb ${error}`));
  }
};
export default connectDb;
