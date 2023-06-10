import { Application, Router } from "express";
import projectsController from "./projects/projects-controller";
import ticketsController from "./tickets/tickets-controller";

const router = Router();

export const connect = (app: Application, path: string): void =>{
    router.use('/tickets', ticketsController);
    router.use('/projects', projectsController);
    app.use(path, router);
}