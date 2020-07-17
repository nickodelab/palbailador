import { userMiddleware } from './user';
import { videosMiddleware } from './videos';

export const appMdl = [userMiddleware, videosMiddleware];
