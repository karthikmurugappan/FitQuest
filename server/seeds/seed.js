const db = require('../config/connection');
const { Exercise } = require('../models');
const exerciseSeeds = require('./exercises.json');

db.once('open', async () => {
  try {
    await Exercise.deleteMany();
    await Exercise.create(exerciseSeeds);

    process.exit(0);
  } catch (err) {
    throw err;
  }
});
