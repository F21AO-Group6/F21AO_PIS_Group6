// controllers/patientController.js
const Patient = require('../models/PatientTreatment');
const User = require('../models/user');

class patientTreatmentController {
  static async recordPatientTreatment(req, res) {
    const { patientName, diagnosis, treatment, prescriptions, dailyProgress, transcription} = req.body;

    try {
      // Check if the user is a registration clerk 
      const { username } = req.params;
      const user = await User.findByUsername(username);
      console.log('Inserted user result:', user);
      if (user.roleName !== 'Doctor') {
        return res.status(403).json({ error: 'Unauthorized: Only doctors are allowed to register patients' });
      }

      // Register the patient
      const newPatient = await Patient.create(patientName, username, diagnosis, treatment, prescriptions, dailyProgress, transcription);

      res.status(201).json({ message: 'Patient treatment registered successfully', patient: newPatient });
    } catch (error) {
      console.error('Error registering patient treatment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = patientTreatmentController;

