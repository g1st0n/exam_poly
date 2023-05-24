const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./houses.sqlite', err => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Database connected.');
});

// Create the houses table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS houses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  address TEXT NOT NULL,
  surface TEXT NOT NULL,
  roomsCount INTEGER NOT NULL,
  cost INTEGER NOT NULL
)`);

// Define the House class
class House {
  constructor(address, surface, roomsCount, cost) {
    this.address = address;
    this.surface = surface;
    this.roomsCount = roomsCount;
    this.cost = cost;
  }

  // Save a new House to the database
  save(callback) {
    db.run(
      `INSERT INTO houses (address, surface, roomsCount, cost) VALUES (?, ?, ?, ?)`,
      [this.address, this.surface, this.roomsCount, this.cost],
      function (err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`House added with the ID: ${this.lastID}`);
        callback(null, this.lastID);
      }
    );
  }

  // Find all houses in the database and return them as House objects
  static findAll(callback) {
    db.all(`SELECT * FROM houses`, [], function (err, rows) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      const houses = rows.map(
        row => new House(row.address, row.surface, row.roomsCount, row.cost)
      );
      callback(null, houses);
    });
  }

  // Find a House by ID and return it as a House object
  static findById(id, callback) {
    db.get(`SELECT * FROM houses WHERE id = ?`, [id], function (err, row) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      if (!row) {
        return callback(new Error('House not found'));
      }
      const house = new House(row.address, row.surface, row.roomsCount, row.cost);
      callback(null, house);
    });
  }

  // Update a house by ID with the provided information
  updateById(id, address, surface, roomsCount, cost, callback) {
    db.run(
      `UPDATE houses SET address = ?, surface = ?, roomsCount = ?, cost = ? WHERE id = ?`,
      [address, surface, roomsCount, cost, id],
      function (err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`House with the ID: ${id} has been updated.`);
        callback(null);
      }
    );
  }

  // Delete a house by ID
  deleteById(id, callback) {
    db.run(`DELETE FROM houses WHERE id = ?`, [id], function (err) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      console.log(`The house with the ID: ${id} has been deleted.`);
      callback(null);
    });
  }
}

// Export the database object for use in other parts of the application
module.exports = db;
