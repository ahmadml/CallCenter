const sql = require("./db");
let instance = null;
var arrCustomerId = [];

class DbService {

  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  static recarrCustomerId() {
    while (arrCustomerId.length) {
      arrCustomerId.pop();
    }
    return;
  }

  async getRandomeCustomer() {
    try {
      var id = Math.floor(Math.random() * 11) + 1
      //console.log(id);
      while ((arrCustomerId.indexOf(id) !== -1)) {
        id = Math.floor(Math.random() * 11) + 1
        //if (arrCustomerId.indexOf(id) === -1){arrCustomerId.push(id)}
      }
      arrCustomerId.push(id)
      //console.log(id);
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM Customers WHERE CustNumber = ?";

        sql.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result[0]);
        })
      });

      return response
    } catch (error) {
      console.log(error);

    }
  }

  async updatePrevCallById(id, prev) {
    try {
      id = parseInt(id);
      prev = parseInt(prev);
      prev++;
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE Customers SET PrevCall = ? WHERE PersonID = ?";

        sql.query(query, [prev, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        })
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}

module.exports = DbService;