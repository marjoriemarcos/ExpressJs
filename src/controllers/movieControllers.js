const movies = [/* ... */];

const database = require("../../database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      if (movies != null){
        res.json(movies); // use res.json instead of console.log
      } else {
        res.sendStatus(500).send('Not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(`select * from movies where id = ${id}`)
    .then(([movie]) => {
      if (movie.length > 0) {
        res.json(movie);
      } else {
        res.status(404).send('Not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500)
    });
};

module.exports = {
  getMovies,
  getMovieById,
};
