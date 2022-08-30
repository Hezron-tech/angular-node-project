import express, { json } from "express";
import router from "./Routes/router";
import cors from 'cors'
import routers from "./Routes/project_routes";

const app = express();


app.use(json());

app.use(cors())

app.use("/users", router);
app.use("/projects", routers);

app.listen(5000, () => {
  console.log("server is running");
});