var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('underscore');


var getByName = function(aName){
    return _.find(subArray, function(item){
        return aName === item.subName;
    });
};

// var getByName = function(aName){
//     subArray.filter(function(item){
//         if(item.sub)
//     });
// };

var subArray = [
    {
        subName: 'Ryan',
        youtubeVideo: 'https://www.youtube.com/watch?v=MC6aAs4kkbY',
        title: 'Black Moth on a Super Rainbow',
        describe: "great vid, much rainbow",
        vote: 4
    },
    {
        subName: 'Matt',
        youtubeVideo: 'https://www.youtube.com/watch?v=MC6aAs4kkbY',
        title: 'Black Moth on a Super Rainbow',
        describe: "great vid, much rainbow",
        vote: 2
    },
    {
        subName: 'Jack',
        youtubeVideo: 'https://www.youtube.com/watch?v=MC6aAs4kkbY',
        title: 'Black Moth on a Super Rainbow',
        describe: "great vid, much rainbow",
        vote: 6
    },
    {
        subName: 'Michelle',
        youtubeVideo: 'https://www.youtube.com/watch?v=MC6aAs4kkbY',
        title: 'Black Moth on a Super Rainbow',
        describe: "great vid, much rainbow",
        vote: 1
    },
    {
        subName: 'Lauren',
        youtubeVideo: 'https://www.youtube.com/watch?v=MC6aAs4kkbY',
        title: 'Black Moth on a Super Rainbow',
        describe: "great vid, much rainbow",
        vote: 2
    },
    {
        subName: 'Amy',
        youtubeVideo: 'https://www.youtube.com/watch?v=MC6aAs4kkbY',
        title: 'Black Moth on a Super Rainbow',
        describe: "great vid, much rainbow",
        vote: 5
    },
    {
        subName: 'Charlotto',
        youtubeVideo: 'https://www.youtube.com/watch?v=MC6aAs4kkbY',
        title: 'Black Moth on a Super Rainbow',
        describe: "great vid, much rainbow",
        vote: 2
    },
    {
        subName: 'Jameson',
        youtubeVideo: 'https://www.youtube.com/watch?v=MC6aAs4kkbY',
        title: 'Black Moth on a Super Rainbow',
        describe: "great vid, much rainbow",
        vote: 3
    }
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/submit', function(req, res){
    if(subArray.length>=8){
        res.render('sorry', {title: 'Sorry'});
    }
    else{
	   res.render('submit', {title: 'Submit an Entry'});
    }
});

router.get('/vote/:videoName', function(req, res){
    var video = getByName(req.params.videoName);
    console.log('THIS IS A CONSOLE DOT LOG OF video: ', video);
    video.vote++;
    // console.log('THIS IS A CONSOLE DOT LOG: ', req.params.videoName);
    res.redirect('/viewsub');
});

router.get('/final', function(req, res){
    var length = subArray.length;

    for (var i = 0; i<subArray.length; i++) {
        if(subArray[i].vote<subArray[i+1].vote){
            subArray.splice(i,1);
        } 
        else{
            subArray.splice(i+1,1);
        }
    }
    if(subArray.length===1){
        res.redirect('winner');
    }
    // (subArray[0].vote>subArray[1].vote)? subArray.splice(1,1): subArray.splice(0,1);
    // (subArray[2].vote>subArray[3].vote)? subArray.splice(3,1): subArray.splice(2,1);
    // (subArray[4].vote>subArray[5].vote)? subArray.splice(5,1): subArray.splice(4,1);
    // (subArray[6].vote>subArray[7].vote)? subArray.splice(7,1): subArray.splice(6,1);
    res.redirect('/viewsub');
});

router.get('/viewsub', function(req, res){
	res.render('viewsub', {title: 'View Submissions', aSubmission: subArray});
});

router.get('/winner', function(req, res){
	res.render('winner', {title: 'Winner', aSubmission: subArray});
});

router.get('/thanks', function(reg, res){
    res.render('thanks', {title: 'Thanks!'});
});

router.post('/formsubmit', function(req, res){
    var currentSub = {};
    currentSub.subName = req.body.subName;
    currentSub.youtubeVideo = req.body.youtubeVideo;
    currentSub.title = req.body.title;
    currentSub.describe = req.body.describe;
    currentSub.vote = 0;
    // currentSub.getByName = function(name){
    //     return _.find(subArray, function(item){
    //         return name === item.name;
    //     });
    // };

    // fs.appendFile('subFile.txt', JSON.stringify(currentSub)+',\n', function(err){
    //     if(err) throw err;
    //     console.log('It\'s Saved!!')
    // });

    subArray.push(currentSub);
    // console.log(subArray);
    // console.log('CONSOLE DOT LOG OF CURRENTSUB OBJ: ',currentSub);
    res.redirect('/thanks');
});

module.exports = router;
