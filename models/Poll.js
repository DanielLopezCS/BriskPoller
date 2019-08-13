const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  title:{
      type:String,
      required: true, 
  },
  options:[{  
      
        text:{
          type:String,
          
        },
        voters:[{
          type: String,
          
        }],
        voterCount:{
          type:Number,
          default: 0
        }
        
  }],
  public:{
    type: Boolean,
    default: false
  },
  showcase:{
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  views:{
    type: Number,
    default: -1
  }
});

module.exports = Poll = mongoose.model('poll', PollSchema);

