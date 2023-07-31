/* eslint-disable no-console */
import express, { Application } from "express";
import cors from "cors";
import auth from "./routes/auth";
import trips from "./routes/trips";
import dbConnection from "./database/database";
import { errorHandler } from "./helpers/errorHandler";

class Server {
  public app: Application;
  public port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    void this.conectDB();
    this.middlewares();
    this.routes();
    this.handleError();
  }

  async conectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Parse body
    this.app.use(express.json());

    // Public
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/api/v1/auth", auth);
    this.app.use("/api/v1/trips", trips);
  }

  handleError() {
    this.app.use(errorHandler);
  }

  listen() {
    this.app
      .listen(this.port, () => {
        console.log("The server is running in port", this.port);
      })
      .on("error", _error => {
        return console.log("Error starting the server");
      });
  }
}
export default Server;
