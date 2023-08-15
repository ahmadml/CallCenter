
const dbService = require('../models/callcenter_model');


const db = dbService.getDbServiceInstance();

exports.getNextCall = () => {
  try {
      const response = db.getRandomeCustomer()
      return response
  } catch (error) {
      console.log(error);
  }
}

exports.updateById = (id,prev) => {
  try {
      const response = db.updatePrevCallById(id, prev)
      return response
  } catch (error) {
      console.log(error);
  }
}

exports.recarr = () => {
    dbService.recarrCustomerId();
}

