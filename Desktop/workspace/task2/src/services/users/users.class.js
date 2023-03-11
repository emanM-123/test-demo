const { Service } = require('feathers-mongoose');
const User = require('../../models/users.model');
const { BadRequest } = require('@feathersjs/errors');
exports.Users = class Users extends Service {
  async create(data) {
    const { email, password, name } = data;
    const user = new User({ email, password, name });
    return user.save();
  }
  async patch(id) {
    const user = await this.get(id);
    if (!user) {
      throw new BadRequest('USer not found');
    }
  }
};
