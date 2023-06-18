const fs = require('fs')
const { parse } = require('csv-parse')
const Heap = require('heap')

class Tweet {
    constructor(tweet_row) {
        this.date = tweet_row[0]
        this.id = tweet_row[1]
        this.content = tweet_row[2]
        this.username = tweet_row[3]
        this.likes_count = tweet_row[4]
        this.retweet_count = tweet_row[5]
    }
}

class Tweets {
    constructor(tweets_file_path) {
        this.file_path = tweets_file_path;
        
        this.retweetsHeap = new Heap(function(a, b) {
            return a.retweet_count - b.retweet_count;
        })

        this.likesHeap = new Heap(function(a, b) {
            return a.likes_count - b.likes_count;
        })
    }

    analyzeRow(tweet_row) {
        // var tweet = new Tweet(row);
        var tweet = {
            date : tweet_row[0],
            id : tweet_row[1],
            content : tweet_row[2],
            username : tweet_row[3],
            like_count : tweet_row[4],
            retweet_count : tweet_row[5]
        };

        if (this.retweetsHeap.size() < 5) {
            this.retweetsHeap.push(tweet);
        }
        else {
            this.retweetsHeap.pushpop(tweet);
        }

        if (this.likesHeap.size() < 5) {
            this.likesHeap.push(tweet);
        }
        else {
            this.likesHeap.pushpop(tweet);
        }        
    }

    process(err_cb, end_cb) {
        fs.createReadStream(this.file_path)
        .pipe(parse({ delimiter: ",", from_line: 2}))
        .on("data", function(row) {
            this.analyzeRow(row);
        }.bind(this))
        .on("end", function() {
            var stats = {
                top_retweets: this.retweetsHeap.toArray(),
                top_likes: this.likesHeap.toArray()
            };
            // console.log(JSON.stringify(stats, null, 4));
            end_cb(stats);
        }.bind(this))
        .on("error", () => {
            err_cb("some error");
        });
    }
}


module.exports = {
    Tweets: Tweets
}