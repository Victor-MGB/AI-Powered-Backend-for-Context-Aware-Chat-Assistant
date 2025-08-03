const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalName: String,
  storedName: String,
  fileType: String,
  fileSize: Number,
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Upload", uploadSchema);
