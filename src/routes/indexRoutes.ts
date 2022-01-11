import express from "express";
import authRoute from "./authRoutes";
import userRoute from "./userRoutes";
import postRoute from "./postRoutes";
import commentRoute from "./commentRoutes";
import likeRoute from "./likeRoutes";
import baseRoute from "./baseRoutes";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/",
    route: baseRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/posts",
    route: postRoute,
  },
  {
    path: "/comments",
    route: commentRoute,
  },
  {
    path: "/likes",
    route: likeRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


export default router;
