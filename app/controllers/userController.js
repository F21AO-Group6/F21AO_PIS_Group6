const User = require('../models/user');

class UserController {
  static async createUser(req, res) {
    const { username, password, roleName,name,email } = req.body;

    try {
      // Check if the username already exists
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Create the new user
      const newUser = await User.create(username, password, roleName,name,email);

      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UserController;
