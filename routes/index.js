const express = require('express');
const router = new express.Router();

//User Authentication route
const loginController = require('../app/controllers/login.js')
router.post('/api/login', loginController.login);
// Protected route that requires authentication
router.get('/api/protected', loginController.verifyToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully', user: req.user });
  });

//User Registration route
const UserController = require('../app/controllers/userController.js');
router.post('/api/createUser', UserController.createUser);

//Patient Registration route
const PatientController = require('../app/controllers/patientController');
router.post('/api/registerPatient/:username', PatientController.registerPatient);

//Patient Treatment route
const patientTreatmentController = require('../app/controllers/patientTreatmentController');
router.post('/api/TreatPatient/:username', patientTreatmentController.recordPatientTreatment);

module.exports = router;