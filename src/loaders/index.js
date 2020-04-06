// Module which will load external components needed to start the Errand application
//Eg connect to MySql DB and set-up Express with proper settings

async function loader( expressApp ) {
  let mySqlConnection = await require('./mySql');
  console.log("MySQL DB Loaded and Ready 📊");

  let expressSetUp = await require('./express');
  expressSetUp(expressApp);
  console.log("Express Loaded and Ready 🚀")
}

module.exports = loader
