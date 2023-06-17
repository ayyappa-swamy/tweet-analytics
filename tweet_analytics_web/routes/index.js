var express = require('express');
var router = express.Router();

const path = require('path')
const multer = require('multer')
const fs = require('fs')
const { parse } = require('csv-parse')

const upload = multer({ dest: 'uploads/'})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/tweet_file_upload', upload.single('tweets'), function (req, res, next) {
  console.log(`File ${req.file.originalname} uploaded!`)

  var most_retweeted = ""
  var max_retweet_count = -1

  fs.createReadStream(req.file.path)
  .pipe(parse({ delimiter: ",", from_line: 2}))
  .on("data", function(row) {
    retweet_count = parseInt(row[row.length-1])

    if (retweet_count > max_retweet_count) {
      most_retweeted = row.join(',')
      max_retweet_count = retweet_count
      console.log(max_retweet_count.toString())
    }
  })
  .on("end", function() {
    console.log("finished")
    res.send("Most retweeted text: " + most_retweeted + "; count: " + max_retweet_count.toString())
  })
  .on("error", function(error) {
    console.log(error.message)
  });
})

module.exports = router;
