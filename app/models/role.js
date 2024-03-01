// models/role.js
const { MongoClient } = require('mongodb');

//const mongoUrl = 'mongodb://localhost:27017';
const mongoUrl = "mongodb+srv://dbuser:Dxb@2030_F21AO@f21aaocw1.mjq48eq.mongodb.net/?retryWrites=true&w=majority&appName=F21AAOCW1";
const dbName = 'PIS';

class Role {
  static async findById(roleId) {
    try {
      const client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);

      const role = await db.collection('Roles').findOne({ _id: roleId });

      client.close();

      return role;
    } catch (error) {
      console.error('Error fetching role by ID:', error);
      throw new Error('Internal server error');
    }
  }
}

module.exports = Role;
