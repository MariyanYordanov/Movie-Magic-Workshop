const { Cast } = require("../models/Cast");
const mongoose = require("mongoose");

async function createCast(data) {
    const cast = new Cast({
        name: data.name,
        age: data.age,
        born: data.born,
        nameInMovie: data.nameInMovie,
        imageURL: data.imageURL,
    });

    await cast.save();
    return cast;
}

async function getCastById(id) {
    const cast = await Cast.findOne({ _id: id }).lean();
    return cast;
}

module.exports = { createCast, getCastById };
