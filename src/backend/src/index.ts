import express, { Application } from "express";
import productRoutes from "./routes/productRoutes";

const app: Application = express();
const port: number = 3003;

app.use(express.json());

//Base root for all endpoints.
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
