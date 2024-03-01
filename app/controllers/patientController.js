// controllers/patientController.js
const Patient = require('../models/patient');
const User = require('../models/user');

class PatientController {
  static async registerPatient(req, res) {
    const { name, age, gender, address, email,registrationDate,complaints} = req.body;

    try {
      // Check if the user is a registration clerk 
      const { username } = req.params;
      const user = await User.findByUsername(username);
      console.log('Inserted user result:', user);
      if (user.roleName !== 'Registration Clerk') {
        return res.status(403).json({ error: 'Unauthorized: Only registration clerks are allowed to register patients' });
      }

      
      // Check if patient already exists
      const existingPatient = await Patient.findByEmail(email);
      if (existingPatient) {
        return res.status(403).json({ error: 'Patient already exists with this email address' });
        //throw new Error('Patient already exists with this email address');
      }

      // Register the patient
      const newPatient = await Patient.register(name, age, gender, address, email,registrationDate,complaints);

      res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
    } catch (error) {
      console.error('Error registering patient:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = PatientController;

