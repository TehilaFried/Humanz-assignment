const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required:[true, 'Client must have a first name']
  },
  lastName: {
    type: String,
    required:[true, 'Client must have a last name']
  },
  id: {
    type: String,
    unique: true,
    maxLength:9
  },
  phone: {
    type: String,
    validate: {
        validator: function(v) {
          return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    required: [true, 'User phone number required']
  },
  ip: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
