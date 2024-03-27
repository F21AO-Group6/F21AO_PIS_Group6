const chai = require('chai');
const expect = chai.expect;
const { isValidEmail } = require('../utils/validator'); // Adjust the path as necessary

describe('Validator Utilities', function() {
    describe('Email Validation', function() {
        it('should return true for a valid email address', function() {
            const result = isValidEmail('test@example.com');
            expect(result).to.be.true;
        });

        it('should return false for an invalid email address', function() {
            const result = isValidEmail('test@example');
            expect(result).to.be.false;
        });
    });
});
