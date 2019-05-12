const express = require('express');
const app = express();

var allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allowCrossDomain);

app.post("/validateTodo", (req, res) => {
  console.log(req.body);

  if (!req.body.title || req.body.title.length < 10 || req.body.title.length > 255)
    return res.status(400).send('"Title" is required and should have more than 10 and less than 255 characters.');

  if (req.body.description && req.body.description.length > 255)
    return res.status(400).send('"Description" should have less than 255 characters.');

  return res.status(200).send('OK');
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));