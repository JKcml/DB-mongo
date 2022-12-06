const yargs = require("yargs");

const { client, connect } = require("./db/connection");
const Movie = require("./utils/index");

async function app(yargsinput) {
  const movieCollection = await connect();
  if (yargsinput.create) {
    console.log("Entering create");
    const newMovie = new Movie(yargsinput.title, yargsinput.actor);
    await newMovie.create(movieCollection);
    // code to add movie put here

  } else if (yargsinput.read) {
    console.log("Entering read");
    // code to list movies goes here
    const results = await movieCollection.find({}).toArray();
    console.table(results);

  } else if (yargsinput.updateActor) {
    console.log("Entering actor update");
    //  code to update movie detail goes here
    const myQuery = { title: yargsinput.title };
    const update = { $set: { actor: yargsinput.actor } };

    const updateResult = await movieCollection.updateOne(myQuery, update);
    console.log(updateResult);

  } else if (yargsinput.updateTitle) {
    console.log("Entering title update");
    //  code to update movie detail goes here
    const myQuery = { title: yargsinput.title };
    const updateTitle = { $set: { title: yargsinput.newTitle } };
    console.log(updateTitle);
    const updateResult = await movieCollection.updateOne(myQuery, updateTitle);
    console.log(updateResult);

  } else if (yargsinput.update) {
    console.log("Entering update of all");
    //  code to update movie detail goes here
    const myQuery = {title:yargsinput.title};
    const update = {title:yargsinput.newTitle, actor:yargsinput.actor};
    const updateResult = await movieCollection.replaceOne(myQuery, update);

  } else if (yargsinput.delete) {
    console.log("Entering delete");
    // code to delete a movie goes here
    const myQuery = { title: yargsinput.title };
    const deleteResult = await movieCollection.deleteOne(myQuery);
    console.log(deleteResult);

  } else {
    console.log("Command not recognised");
  }
  await client.close();
}

app(yargs.argv);
