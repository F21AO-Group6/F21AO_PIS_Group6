const User = require('../models/user');
const Role = require('../models/role');

class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findByUsername(username);

      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password.....' });
      }

      //const role = await Role.findById(user.role_id);
      /*res.json({ 
        message: `${username} authenticated successfully. User role is: ${role.name}. User privileges are: ${role.privileges}` 
      });*/

      // If authentication is successful, generate a token
      const token = User.generateToken({ username });
      //res.json({ token });

      res.json({ 
        message: `${username} authenticated successfully. User role is: ${user.roleName}. token generated is: ${token}}` 
      });

      //res.json({ user, role });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      console.log(token);
      const decoded = User.verifyToken(token);
      console.log (decoded);
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
}

module.exports = AuthController;
