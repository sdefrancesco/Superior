const express = require('express')
const Vimeo = require('vimeo').Vimeo
const client = new Vimeo("5f8655ce645e892ffab88c703859aab091301ed3", "sJblbrDHuIlHRViPqKnRgC5a3t30HcRWpz359vxmj0vA/tusgNoO11vnzj+dZKZiQGHvXfY0IREv/Jw23J9qiKnmVoaKNyCNwdKymFPmfBQdOUu8iRQxSrQNZOLFESH0", "17fb45a5043a9a5e10b621716dc47af9");
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const hbs = require('hbs')
const breadcrumb = require('express-url-breadcrumb')
const app = express()


app.use(express.static('./public'))
app.use(breadcrumb())

app.set('view engine', hbs)

//body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


 

// app.use(express.static('public'))

hbs.registerHelper('returnVimeoId', function(url) { 
    var regex = new RegExp(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);

    if ( regex.test(url) ) {
        return regex.exec(url)[5];
    }
 });

app.get('/', (req, res) => {
    client.request({
      method: 'GET',
      path: '/me/videos', 
      query: {
          per_page: 4,
          fields: 'uri, name, description, link',
          filter: 'featured',
      }
    }, function (error, body, status_code, headers) {
      if (error) {
        console.log(error);
      }
      res.render('./index.hbs', {
          serverSays: 'Hello from the backend',
          videos: body.data,
      })
    //   console.log(body)
    })
})
app.get('/videos', breadcrumb(), (req, res) => {
    client.request({
        method: 'GET',
        path: '/me/videos',
        query: {
            name: req.query.title
        }
    }, function(err, body, status_code, headers) {
        if (err) {
            console.log(err);
          }
        //   console.log(body)
          res.render('./videos.hbs', {
              video: body
          })
    })
})
app.get('/photography', (req, res) => {
    res.render('./photography.hbs', {
        title: 'Photography'
    })
})
app.get('/videos/:id', breadcrumb(), (req, res)=> {
    client.request({
        method: 'GET',
        path: '/me/videos/' + req.params.id,
        query: {
            name: req.query.title
        }

    }, function(err, body, status_code, headers) {
        if (err) {
            console.log(err);
          }
        //   console.log(body)
          res.render('./video.hbs', {
              video: body
          })
    })
})

app.get('/about', breadcrumb(), (req, res)=> {
    res.render('about.hbs', {
        title: 'About Us'
    })
})

//add email
app.post('/send-email', (req, res) => {
    console.log(req.body)

    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.firstname} ${req.body.lastname}</li>
            <li>date: ${req.body.date}</li>
            <li>Phone Number: ${req.body.phone}</li>
            <li>Location: ${req.body.location}</li>
            <li>Email: ${req.body.email}</li>
            <li>Event Type: ${req.body.partytype}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `
    // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: 'superiorcreativitynyc@gmail.com', // generated ethereal user
      pass: 'Dirtymexican93', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Nodemailer Contact" <superiorcreativitynyc@gmail.com>', // sender address
    to: 'sdefrancesco37@gmail.com', // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
          return console.log(err)
      }
      console.log('message sent', info.messageId)
      res.render('./inquiry.hbs', {
          body: req.body
      })
  })
})

app.get('/inquiry', (req, res) => {
    res.render('./inquiry.hbs', {

    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});
