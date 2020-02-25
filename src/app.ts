import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/notes.routes";

export class App {
  private app: Application;
  constructor(private port?: number) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    this.app.set("port", process.env.PORT || this.port);
  }

  private middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(passport.initialize());
    passport.use(passportMiddleware);
  }

  private routes() {
    this.app.use("/api", authRoutes);
    this.app.use("/api", noteRoutes);
  }

  public async listen() {
    await this.app.listen(this.app.get("port"));
    console.log(`API is running in port ${this.app.get("port")}`);
  }
}
