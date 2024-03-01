// models/user.js
const { MongoClient } = require('mongodb');

//const mongoUrl = 'mongodb://localhost:27017';
const mongoUrl = "mongodb+srv://dbuser:Dxb%402030_F21AO@f21aaocw1.mjq48eq.mongodb.net/?retryWrites=true&w=majority&appName=F21AAOCW1";
const dbName = 'PIS';
const jwt = require('jsonwebtoken');
const secret_key='ZCY4PK8wd1vn6LtQTx9xVd42Vh92apmDWs6S2zPzyM4d85eRfgE6wA8eNsyHqh75';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
/*const client = new MongoClient(mongoUrl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});*/

class User {
  static async findByUsername(username) { //method to verify user name
    try {
      const client = await MongoClient.connect(mongoUrl);
      //await client.connect();
      const db = client.db(dbName);

      const user = await db.collection('Users').findOne({ username });

      client.close();
      
      return user;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      throw new Error('Internal server error');
    }
  }
  static generateToken(payload, expiresIn = '1h') { //method to generat token
    return jwt.sign(payload, secret_key, { expiresIn });
  }
  static verifyToken(token) {
    try {
      return jwt.verify(token, secret_key);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //Method to create a new User
  static async create(username, password, roleName,name,email) {
    try {
      const client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);

      const newUser = {
        username,
        password,       
        name,
        email,
        roleName
      };

      const result = await db.collection('Users').insertOne(newUser);
      console.log('Inserted user result:', result); // Log the entire result object
      client.close();

      return result.ops; // Return the newly created user object
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Internal server error');
    }
  }
}

module.exports = User;
