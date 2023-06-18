var express = require('express');
var router = express.Router();
const multer = require('multer')

const { Tweets } = require('./tweets.js')

const upload = multer({ dest: 'uploads/'})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/tweet_file_upload', upload.single('tweets'), function (req, res, next) {
  console.log(`File ${req.file.originalname} uploaded!`)

  var tweets = new Tweets(req.file.path);
  tweets.process(
    function(error) {
      console.log(error.message)
    },
    function(stats) {
      console.log("finished")
      // res.send("Most retweeted text: " + stats.most_retweeted + "; count: " + stats.max_retweet_count.toString())
      // res.header("Content-Type",'application/json');
      // res.send(JSON.stringify(stats, null, 4));
      res.render('layout', stats)
    } 
  );
})

module.exports = router;
