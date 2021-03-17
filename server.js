const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const DB = process.env.DB_STRING.replace('<PASSWORD>', process.env.DB_PW);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected!');
  });

const app = require('./app');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name!'],
    unique: true,
  }, // SCHEMA TYPE OPTIONS
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a price!'] },
  difficulty: String,
  premium: Boolean,
});

const Tour = mongoose.model('Tour', tourSchema);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
