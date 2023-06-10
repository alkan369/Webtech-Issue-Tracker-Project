import { model } from 'mongoose';
import { ProjectSchema } from '../schemas/project.schema';

export const ProjectModel = model('Project', ProjectSchema);