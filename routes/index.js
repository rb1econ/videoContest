var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('underscore');


var getByName = function(aName){
    return _.find(subArray, function(item){
        return aName === item.subName;
    });
};

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

    subArray.push(currentSub);
    res.redirect('/thanks');
});

module.exports = router;
