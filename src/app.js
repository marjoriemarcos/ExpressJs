const express = require("express");

const app = express();
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const usersController = require("./controllers/usersController");

const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser.js");

app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);

app.post("/api/users", validateUser, usersController.postUser);
app.put("/api/users/:id", validateUser, usersController.updateUser);

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie);
app.put("/api/movies/:id", movieControllers.updateMovie);

app.get("/api/users", usersController.getUsers);
app.get("/api/users/:id", usersController.getUsersByName);
app.post("/api/users", usersController.postUser);
app.put("/api/users/:id", usersController.updateUser);


module.exports = app;
