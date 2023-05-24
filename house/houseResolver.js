const db = require('./models');

const houseResolver = {
  getHouseById: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM houses WHERE id = ?`,
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  },

  getAllHouses: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM houses`,
        [],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  },

  addHouse: ({ address, surface, roomsCount, cost }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO houses (address, surface, roomsCount, cost) VALUES (?, ?, ?, ?)`,
        [address, surface, roomsCount, cost],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, address, surface, roomsCount, cost });
          }
        }
      );
    });
  },

  updateHouse: ({ id, address, surface, roomsCount, cost }) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE houses SET address = ?, surface = ?, roomsCount = ?, cost = ? WHERE id = ?',
        [address, surface, roomsCount, cost, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, address, surface, roomsCount, cost });
          }
        }
      );
    });
  },

  deleteHouse: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM houses WHERE id = ?`,
        [id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(`House with id ${id} deleted.`);
          }
        }
      );
    });
  }
};