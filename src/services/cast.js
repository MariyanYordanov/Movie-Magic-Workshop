const { Cast } = require("../models/Cast");

async function createCast(data) {
    const cast = new Cast({
        name: data.name,
        age: data.age,
        born: data.born,
        character: data.characterName,
        mageURL: data.imageURL || "/img/logo.png",
        movie: data.movie || [],
    });

    await cast.save();
    return cast;
}

async function getCastById(id) {
    const cast = await Cast.findOne({ _id: id }).lean();
    return cast;
}

module.exports = { createCast, getCastById };
