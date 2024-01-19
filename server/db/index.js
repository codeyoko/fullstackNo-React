
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://phungsongka:uUyV5gMKmuew35As@cluster0.3l30vtx.mongodb.net/')
        .then(() => console.log('connected mongo db'))
        .catch((err) => console.log(err));
