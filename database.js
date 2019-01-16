const moongose = require('mongoose');

const URI = 'mongodb://localhost/store';

moongose.connect(URI,{useNewUrlParser: true})
                .then(() =>  console.log('database is connected'))
                .catch(err => console.log(`error connected database ${err}`));

module.exports = moongose;