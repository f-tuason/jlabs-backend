const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AuthSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

/**
 * Mongoose middleware that will trigger before the saving
 */
AuthSchema.pre('save', async function (next) {
  try {
    if (!this.userId) {
      this.userId = this._id.toString();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

AuthSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

const Auth = mongoose.model('user', AuthSchema);
module.exports = Auth;
