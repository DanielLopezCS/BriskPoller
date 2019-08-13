import { GET_POLLS, GET_POLL, GET_POLL_TEST, PUT_VOTE, POST_POLL, GET_CHECK, GET_SHOWCASE  } from '../actions/types';

const initialState = {
    loading: false,
    
};

export default function(state = initialState, action) {

  switch (action.type) {
    case GET_POLLS:
      return {
        ...state,
        polls:action.payload
    
      }
      case GET_POLL:
      return {
        ...state,
        poll:action.payload
    
      }
      case PUT_VOTE:
      return{
        ...state,
        poll: action.payload
      }
      case  POST_POLL:
        return{
          ...state,
          poll: action.payload
        }
      case GET_CHECK:
        return{
          ...state,
          available: action.payload
        }
      case GET_POLL_TEST:
        return{
          ...state,
          memes:'memes'
        }
      case GET_SHOWCASE:
        return{
          ...state,
          polls:action.payload

        }

    
    default:
      return state;
  }
}