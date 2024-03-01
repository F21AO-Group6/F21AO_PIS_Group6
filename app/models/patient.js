// models/user.js
const { MongoClient } = require('mongodb');

//const mongoUrl = 'mongodb://localhost:27017';
const mongoUrl = "mongodb+srv://dbuser:Dxb%402030_F21AO@f21aaocw1.mjq48eq.mongodb.net/?retryWrites=true&w=majority&appName=F21AAOCW1";
const dbName = 'PIS';

class Patient {

  //Check if patient already exist based on email Id
  static async findByEmail(email) {
    try {
      const client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);

      const patient = await db.collection('PatientsLog').findOne({ email });

      client.close();

      return patient;
    } catch (error) {
      console.error('Error fetching patient by email:', error);
      throw new Error('Internal server error');
    }
  }
  
  //Register new patient
  static async register(name, age, gender, address, email,registrationDate,complaints) {
    try {
      const client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);

      const newPatient = {
        name,
        age,
        gender,
        address,
        email,
        registrationDate,
        complaints
      };

      const result = await db.collection('PatientsLog').insertOne(newPatient);

      client.close();

      return result.ops; // Return the newly created user object
    } catch (error) {
      console.error('Error registering patient:', error);
      throw new Error('Internal server error');
    }
  }
}

module.exports = Patient;