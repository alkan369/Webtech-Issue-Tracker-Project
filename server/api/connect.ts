import { Application, Router } from "express";
import projectsController from "./projects/projects-controller";
import ticketsController from "./tickets/tickets-controller";
import usersController from "./users/users-controller";

const router = Router();

export const connect = (app: Application, path: string): void =>{
    router.use('/tickets', ticketsController);
    router.use('/projects', projectsController);
    router.use('/users', usersController)
    app.use(path, router);
}