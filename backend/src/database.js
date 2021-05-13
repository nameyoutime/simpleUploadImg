const mongoose = require("mongoose");

class Database {
  /**
   *
   * @type {Database}
   */
  static _cache = null;

  /**
   *
   * @returns {Promise<mongoose.Connection>}
   */
  async connectToDb(connectionString) {
    //connect to db using promise and async
    return new Promise((resolve, reject) => {
      mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = mongoose.connection;
      //connection failed
      db.on("error", (err) => {
        reject("connection error:");
      });
      //connect successs!
      db.once("open", function () {
        console.log("connected to server!");
        resolve(db);
      });
    });
  }

  async createTask(task) {
    try {
      await task.save();
    } catch (err) {
      console.log("fail to create item!");
    }
  }

  /**
   *
   * @type {Database}
   */
  static get instance() {
    if (this._cache == null) {
      this._cache = new Database();
    }
    return this._cache;
  }
}

module.exports = Database;
