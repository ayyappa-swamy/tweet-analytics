const fs = require('fs')
const { parse } = require('csv-parse')

class Tweets {
    constructor(tweets_file_path) {
        this.file_path = tweets_file_path;
        this.max_retweet_counts = -1;
    }

    process(err_cb, end_cb) {
        var max_retweet_count = -1;
        var most_retweeted = "";
        
        fs.createReadStream(this.file_path)
        .pipe(parse({ delimiter: ",", from_line: 2}))
        .on("data", function(row) {
          var retweet_count = parseInt(row[row.length-1])
      
          if (retweet_count > max_retweet_count) {
            most_retweeted = row.join(',')
            max_retweet_count = retweet_count
            console.log(max_retweet_count.toString())
            this.max_retweet_counts = max_retweet_count;
          }
        }.bind(this))
        .on("end", function() {
            end_cb({
                max_retweet_count: max_retweet_count,
                most_retweeted: most_retweeted
            });
        }.bind(this))
        .on("error", () => {
            err_cb("some error");
        });
    }
}


module.exports = {
    Tweets: Tweets
}