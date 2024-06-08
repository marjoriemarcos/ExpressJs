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

module.exports = {
  getUsers,
  getUsersByName,
};
