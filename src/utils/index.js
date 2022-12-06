class Movie {
    constructor (title, actor = "not specified") {
        this.title = title;
        this.actor = actor;
    };
     async create(movieCollection) {
        console.log("Entering create within index.js");
        await movieCollection.insertOne(this);
        // code to save to the database
    };
};

module.exports = Movie