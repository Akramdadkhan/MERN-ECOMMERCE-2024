import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://mongoad17:mongoad17@cluster0.bnwri2j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        dbName: "Ecomerce_2024",
      }
    )
    .then((db) => console.log(`DB Connected at ${db.connection.host}`))
    .catch((error) => console.log(error));
};
