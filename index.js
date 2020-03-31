const express = require('express')
const Vimeo = require('vimeo').Vimeo
const client = new Vimeo("5f8655ce645e892ffab88c703859aab091301ed3", "sJblbrDHuIlHRViPqKnRgC5a3t30HcRWpz359vxmj0vA/tusgNoO11vnzj+dZKZiQGHvXfY0IREv/Jw23J9qiKnmVoaKNyCNwdKymFPmfBQdOUu8iRQxSrQNZOLFESH0", "17fb45a5043a9a5e10b621716dc47af9");
const hbs = require('hbs')
const app = express()


app.use(express.static('./public'))
app.set('view engine', hbs)


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

app.get('/videos/:id', (req, res)=> {
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

app.listen(3000, () => {
    console.log('server started on port 3000')
})
