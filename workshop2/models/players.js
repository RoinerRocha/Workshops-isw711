const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: { type: String },
    lasName: {type: String},
    position: { type: String },
    number: {type: String},
  });

  const playerModel = mongoose.model('player', playerSchema);
  module.exports = {
    schema: playerSchema,
    model: playerModel
  }