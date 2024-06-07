const users = [/* ... */];

const database = require("../../database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      if (users != null){
        res.json(users); // use res.json instead of console.log
      } else {
        res.sendStatus(500).send('Not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
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
