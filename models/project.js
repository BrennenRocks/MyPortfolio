var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
    title: String,
    address: String,
    image: String,
    category: String,
    description: String,
});

module.exports = mongoose.model("Project", projectSchema);