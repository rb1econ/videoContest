var express = require('express');
var router = express.Router();


var currentSub = {};
var subArray = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/submit', function(req, res){
	res.render('submit', {title: 'Submit an Entry'});
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
    currentSub.subName = req.body.subName;
    currentSub.youtubeVideo = req.body.youtubeVideo;
    currentSub.title = req.body.title;
    currentSub.describe = req.body.describe;
    subArray.push(currentSub);
    console.log(subArray);
    // console.log('CONSOLE DOT LOG OF CURRENTSUB OBJ: ',currentSub);
    res.redirect('/thanks');
});

module.exports = router;
