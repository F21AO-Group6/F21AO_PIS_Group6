// test/patientService.test.js

import chai from 'chai';
const expect = chai.expect;
const { addPatient } = require('../src/patientService');

describe('Patient Service', () => {
  describe('addPatient function', () => {
    it('should throw an error if required details are missing', async () => {
      try {
        await addPatient({});
        chai.assert.fail("Expected error not thrown");
      } catch (error) {
        expect(error.message).to.equal("Missing required patient details");
      }
    });

    it('should return a patient object with an id if required details are provided', async () => {
      const patientDetails = { name: "John Doe", email: "johndoe@example.com" };
      const result = await addPatient(patientDetails);

      expect(result).to.have.property('id');
      expect(result.name).to.equal(patientDetails.name);
      expect(result.email).to.equal(patientDetails.email);
    });
  });
});
