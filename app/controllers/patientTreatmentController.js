// controllers/patientTreatmentController.js
const PatientTreatment = require('../models/patientTreatment'); // Ensure this is the correct path
const User = require('../models/user');

class PatientTreatmentController {
  static async recordPatientTreatment(req, res) {
    const { patientName, diagnosis, treatment, prescriptions, dailyProgress, transcription } = req.body;

    try {
      const { username } = req.params;
      const user = await User.findByUsername(username);
      
      if (user.roleName !== 'Doctor') {
        return res.status(403).json({ error: 'Unauthorized: Only doctors are allowed to register patients' });
      }

      const newPatientTreatment = await PatientTreatment.create(patientName, username, diagnosis, treatment, prescriptions, dailyProgress, transcription);

      res.status(201).json({ message: 'Patient treatment registered successfully', patientTreatment: newPatientTreatment });
    } catch (error) {
      console.error('Error registering patient treatment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = PatientTreatmentController;
