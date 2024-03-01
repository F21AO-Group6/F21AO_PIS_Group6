// models/user.js
const { MongoClient } = require('mongodb');

//const mongoUrl = 'mongodb://localhost:27017';
const mongoUrl = "mongodb+srv://dbuser:Dxb%402030_F21AO@f21aaocw1.mjq48eq.mongodb.net/?retryWrites=true&w=majority&appName=F21AAOCW1";
const dbName = 'PIS';

class PatientTreatment {

  
  //Record Patient Treatment
  static async create(patientName, doctorName, diagnosis, treatment, prescriptions, dailyProgress, transcription) {
    try {
      const client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);

        const newPatient = {
          patientName, 
          doctorName, 
          diagnosis, 
          treatment, 
          prescriptions, 
          dailyProgress, 
          transcription
      };

      const result = await db.collection('PatientTreatment').insertOne(newPatient);

      client.close();

      return result.ops; // Return the newly created user object
    } catch (error) {
      console.error('Error registering patient Treatment:', error);
      throw new Error('Internal server error');
    }
  }
}

module.exports = PatientTreatment;