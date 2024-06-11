const users = [/* ... */];

const database = require("../../database");

const getUsers = (req, res) => {
  const initialSql = "select * from users";
  const where = [];

  if (req.query.language != null) {
    where.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    })
  }
  if (req.query.city != null) {
    where.push({
      column: "city",
      value: req.query.city,
      operator: "=",
    })
  }
  console.log('where', where)
  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
        ),
        where.map(({ value }) => value)
      )
    .then(([users]) => {
        res.json(users); 
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsersByName = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(`select * from users where id = ${id}`)
    .then(([user]) => {
      if (user.length > 0) {
        res.json(user);
      } else {
        res.status(404).send('Not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500)
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  const id = parseInt(req.params.id);

  database
  .query(
    "insert into users(firstname, lastname, email, city, language) VALUE(?, ?, ?, ?, ?)",
    [firstname, lastname, email, city, language,  id]
  )
  .then(([result]) => {
    if (result.insertId) {
      res.status(201).send(`User ${result.insertId} has juste created`);
    } else {
      res.status(404).send("Not found");
    }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

// PUT

const updateUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  const id = parseInt(req.params.id);

  database
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


// DELETE

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

   database
    .query(`DELETE FROM users WHERE id = ${id}`)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send(`User ${id} has juste deleted`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUsersByName,
  postUser,
  updateUser,
  deleteUser,
};
