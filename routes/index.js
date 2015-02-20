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

var subArray = [];
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
    
});

router.get('/viewsub', function(req, res){
	res.render('viewsub', {title: 'View Submissions', aSubmission: subArray});
});

router.get('/winner', function(req, res){
	res.render('winner', {title: 'Winner'});
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
