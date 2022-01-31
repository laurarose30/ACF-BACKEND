const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
  date: Date,
  lesson: Array,
  equipment: Array,
  dress: Array,
  level: String,
  instructor: Array,
  subject: Array,
  
})
lessonSchema.index({name: 'lessontext', 'lesson': 'text'});

module.exports.Lesson = mongoose.model('Lesson', lessonSchema, 'lesson')
