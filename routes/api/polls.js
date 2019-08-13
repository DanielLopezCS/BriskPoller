//req.connection.remoteAddress
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');


const Poll = require('../../models/Poll');


// @route    POST api/polls/
// @desc     Post a poll
// @access   Public
router.post('/', async (req, res) => {
  try {
        

    const newPoll = new Poll({
      title: req.body.title,
      options: req.body.options,
      public: req.body.public
    });

    const poll = await newPoll.save();
    
    res.json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/polls
// @desc     Gets all polls
// @access   Public
router.get('/', async (req, res) => {
  try {
    //limiting to last 10 polls
    const polls = await Poll.find({public:true},{'options.voters':0}).sort({ date: -1 });

    res.json(polls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/polls/showcase
// @desc     Gets all polls
// @access   Public
router.get('/showcase', async (req, res) => {
  try {

    const polls = await Poll.find({showcase:true},{'options.voters':0}).sort({ date: -1 });
    res.json(polls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// @route    GET api/polls/:id
// @desc     Get poll by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    
   

    const poll = await Poll.findById(req.params.id,{'options.voters':0});

    if (!poll) {
      return res.status(404).json({ msg: 'Poll not found' });
    }
    
    poll.views = poll.views +1;
    await poll.save();
   
    res.json(poll);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Poll not found' });
    }
    res.status(500).send('Server Error');
  }

});

// @route    GET api/polls/check/:id
// @desc     Check if user voted in poll
// @access   Public
router.get('/check/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    
    // Check to see if already voted (checking IP address)
    const ip = req.ip;
    
        
    //look through all voters and see if user has already voted
    for(let i = 0; i < poll.options.length; i++){
      for(let j = 0; j < poll.options[i].voters.length; j++){
        if(poll.options[i].voters[j] == req.ip){
          return res.json({voted:'Already Voted'});
          
      
        }
      }
    }
    
    return res.json({available:'Available'})

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});






// @route    PUT api/polls/vote/:id
// @desc     Vote in a poll
// @access   Public
router.put('/vote/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    
    // Check to see if already voted (checking IP address)
    const ip = req.ip;
    //option selected
    
  
    
    //look through all voters and see if user has already voted
    for(let i = 0; i < poll.options.length; i++){
      for(let j = 0; j < poll.options[i].voters.length; j++){
        if(poll.options[i].voters[j] == req.ip){
          res.json({message:'Already Voted'});
          
          break;       
   
        }
      }
   
    }
    
    poll.options.find(option => option.id === req.body.option).voters.push(ip);
    poll.options.find(option => option.id === req.body.option).voterCount+=1;

    await poll.save();

    //safe way to return poll without having voter's IP numbers in state
    const returnPoll = await Poll.findById(req.params.id, {'options.voters':0});

    res.json(returnPoll);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});








module.exports = router;
