const express = require('express')
const Vimeo = require('vimeo').Vimeo
const client = new Vimeo("5f8655ce645e892ffab88c703859aab091301ed3", "sJblbrDHuIlHRViPqKnRgC5a3t30HcRWpz359vxmj0vA/tusgNoO11vnzj+dZKZiQGHvXfY0IREv/Jw23J9qiKnmVoaKNyCNwdKymFPmfBQdOUu8iRQxSrQNZOLFESH0", "17fb45a5043a9a5e10b621716dc47af9");
const hbs = require('hbs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const breadcrumb = require('express-url-breadcrumb')
const app = express()


app.use(express.static('./public'))
app.use(breadcrumb())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', hbs)

// connect to db
mongoose.connect('mongodb://localhost/SuperiorCreativity', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to db')
});

// bring in models
let User = require('./models/user')

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

app.get('/admin/login', (req, res) => {
    res.render('./admin/login.hbs')
})

app.post('/admin/login', (req, res) => {
    let loginForm = {
        email: req.body.email,
        password: req.body.password
    }
    let newUser = new User(loginForm)
    newUser.save(() => {
        res.redirect('/admin/users')
    })
    console.log('user created',newUser)
})

app.get('/admin/users', (req, res) => {
    User.find({}, (err, users) => {
        res.render('./admin/users.hbs', {
            users: users
        })
    })
    
    // User.find({}, function(err, users) {
    //     res.render('/admin/users', {
    //         users: users
    //     })
    // })
})

app.post('/admin/users/:_id/delete', (req, res)=> {
    User.findByIdAndRemove({_id: req.params._id},(err, users) => {
        console.log(err, req.params._id, 'deleted')
        res.redirect('/admin/users')
    })
})

app.get('/admin/users/:_id/update', (req, res) => {
    User.findOne({_id: req.params._id}, (err, user) => {
        res.render('./admin/update.hbs', {
            user: user
        })
    })
})
app.post('/admin/users/:_id/update', (req, res) => {
    User.findOneAndUpdate({_id: req.params._id}, {email: req.body.email, password: req.body.password}, (err, user) => {
        res.redirect('/admin/users')
    })
})

//upload images




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});
