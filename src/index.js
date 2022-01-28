/// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');

const { Lesson } = require('../models/Lesson');
const { Cart } = require('../models/cart');
const { User } = require('../models/user');
const { Register} = require('../models/register')
mongoose.connect('mongodb+srv://Sazzle:sazzlemongo1@cluster0.opbm5.mongodb.net/ACFTrainingProgram?retryWrites=true&w=majority');
const port = process.env.PORT || 3002
// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));


app.post('/auth', async (req,res) => {
  const user = await User.findOne({ userName: req.body.userName})
  console.log(req.body)
  console.log(user)
  if(!user) {
    return res.sendStatus(401);
  }
  if( req.body.password !== user.password ){
    return res.sendStatus(403)
  }

  user.token = uuidv4()
  await user.save()
  res.send({token: user.token, role: user.role})

})

app.post('/register', async (req, res) => {
  const newRegister = req.body;
  const register = new User(newRegister);
  await register.save();
  res.send({ message: 'New user inserted.' });
});

app.use( async (req,res,next) => {
  const authHeader = req.headers['authorization']
  const user = await User.findOne({token: authHeader})
  if(user) {
    next()
  }else {
    res.sendStatus(403);
  }
})


// defining CRUD operations
app.get('/', async (req, res) => {
  res.send(await Lesson.find());
});

app.post('/', async (req, res) => {
  const newLesson = req.body;
  const lesson = new Lesson(newLesson);
  await lesson.save();
  res.send({ message: 'New lesson inserted.' });
  // if(!role'admin') {
  //   return res.sendStatus(401);
  console.log()
});

app.delete('/:id', async (req, res) => {
  await Lesson.deleteOne({ _id: ObjectId(req.params.id) })
  res.send({ message: 'Lesson removed.' });
  // if(!user'admin') {
  //   return res.sendStatus(401);
});

app.put('/:id', async (req, res) => {
  await Lesson.findOneAndUpdate({ _id: ObjectId(req.params.id)}, req.body )
  res.send({ message: 'Lesson updated.' });
  // if(!user'admin') {
  //   return res.sendStatus(401);
});

app.get('/lesson/:equipment', async (req, res) => {
  const result = await Lesson.find({ equipment: req.params.equipment} ).lean()
  res.send(result);
});

app.post('/lesson/search', async (req, res) => {
  console.log(req.body)
  const {sLesson, sLevel, sEquipment, sDress, dateMin, dateMax } = req.body.sLesson
  const query = {}
  if (sLesson) {
    query.lesson = {$regex: sLesson,$options:'i'}
  }
  if (sLevel){
    query.level = {$regex: sLevel,$options:'i'}
  }
  if (sEquipment){
    query.equipment = {$regex: sEquipment,$options:'i'}
  }
  if (sDress){
    query.dress = {$regex: sDress,$options:'i'}
  }

  if (dateMin){
    query.date = { $gte: dateMin }
  }
  if (dateMax) {
  query.date ={$lte : dateMax}
  }
  if (!dateMax && dateMin){
    query.date={$eq:dateMin}
  }
  console.log(sLesson)
  res.send(await Lesson.find(query))
})




// defining CRUD operations
app.get('/todo', async (req, res) => {
  res.send(await Todo.find());
});



app.delete('/todo/:id', async (req, res) => {
  await Todo.deleteOne({ _id: ObjectId(req.params.id) })
  res.send({ message: 'todo removed.' });
});

app.put('/todo/:id', async (req, res) => {
  await Todo.findOneAndUpdate({ _id: ObjectId(req.params.id)}, req.body )
  res.send({ message: 'todo updated.' });
});






// starting the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Database connected!")
});
