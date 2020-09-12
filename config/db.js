const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoDb');

const connectDb = async () => {
    try {
        await mongoose.connect(db,
            { useNewUrlParser: true,
              useUnifiedTopology: true 
            });
        await mongoose.set('useFindAndModify', false);
        console.log('Database is connected');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDb