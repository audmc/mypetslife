const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
    {
        title: String,
        photo: String,
        name: String,
        author: String,
        publication_date: Date,
        content: String,
    },
);

module.exports = mongoose.model("Blog", blogSchema);
