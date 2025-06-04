/**
 *  Copyright 2023 Shadowcast
 *  Project Name - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const bcrypt = require("bcrypt");

/**
 * @method hash
 * @method compare
 */
class Password {
/**
   * @param {string} password 
   * @additionalInfo const salt = await bcrypt.genSalt(10);
   * @returns bcrypt.hash(password, salt)
   */
  static async hash(password) {
    const salt = await bcrypt.genSalt(10);
    return  bcrypt.hash(password, salt);
  }



  /**
   * 
   * @param {string} suppliedPassword 
   * @param {string} storedPassword 
   * @additionalInfo const match = await bcrypt.compare(suppliedPassword, storedPassword);
   * @returns match
   */
  static async compare(suppliedPassword, storedPassword) {
    const match = await bcrypt.compare(suppliedPassword, storedPassword);
    return match;
  }
}

module.exports = { Password };
