// Import required modules
const mongoose = require("mongoose");

// Connect to the database
mongoose.connect("mongodb://127.0.0.1:27017/node-checkpoint", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create a model for the Person schema
const Person = mongoose.model("Person", personSchema);

// Create and Save a Record of a Model
const createPerson = (done) => {
  const person = new Person({
    name: "John Joe",
    age: 25,
    favoriteFoods: ["Pizza", "Jollof"],
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Create Many Records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);

    person.favoriteFoods.push("Hamburger");
    person.save((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 24 },
    { new: true },
    (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    }
  );
};

// Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// MongoDB and Mongoose - Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  Person.remove({ name: "Esther" }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  Person.find({ favoriteFoods: "burritos" })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
};

// Export the functions
module.exports = {
  createPerson,
  createManyPeople,
  findPeopleByName,
  findOnePerson,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};
