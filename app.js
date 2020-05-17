const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// test route
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.post('/send', async (req, res) => {
  const output = `
  <h3>New request</h3>
  <p>${req.body.name}</p>
  <p>${req.body.email}</p>
  <p>${req.body.text}</p>
  `;

  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.jino.ru',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'test@kamchatka-tc.ru',
      pass: '12345678',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Kamchatka Travel" <test@kamchatka-tc.ru>',
    to: 'pavlov.cmc@gmail.com',
    subject: 'Kamchatka-TC request',
    html: output,
  });

  res.send(output);
});

const port = 5000;

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
