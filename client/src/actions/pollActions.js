import axios from 'axios';
import {GET_POLLS, GET_POLL, GET_POLL_TEST, GET_ERRORS, PUT_VOTE, POST_POLL, GET_CHECK, GET_SHOWCASE} from './types';



//defining base URL
axios.defaults.baseURL = 'http://localhost:5000/';


export const getPolls = ()=>dispatch=>{
    axios
    .get('/api/polls/')
    .then(res => 
        dispatch({
        type:GET_POLLS,
        payload: res.data,
        }))
    .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: 'No polls available.',
        })    
    )

}

export const getShowcase = ()=>dispatch=>{
    axios
    .get('/api/polls/showcase')
    .then(res => 
        dispatch({
        type:GET_SHOWCASE,
        payload: res.data,
        }))
    .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: 'No polls available.',
        })    
    )

}

export const getPoll = (id)=>dispatch=>{
    axios
    .get(`api/polls/${id}`)
    .then(res => 
        dispatch({
        type:GET_POLL,
        payload: res.data,
        }))
    .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: 'No poll with that id.',
        })    
    )

}
export const putVote = (pollID, optionID) =>dispatch=>{
    axios
    .put(`api/polls/vote/${pollID}`, optionID)
    .then(res => 
        dispatch({
        type:PUT_VOTE,
        payload: res.data,
        }))
    .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: 'No option with that name.',
        })    
    )

}

export const postPoll = (poll) =>dispatch=>{
    axios
    .post("api/polls/", poll)
    .then(res => 
        dispatch({
        type:POST_POLL,
        payload: res.data,
        }))
    .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: 'Title required',
        })    
    )

}

export const getCheck = (id)=>dispatch=>{
    axios
    .get(`api/polls/check/${id}`)
    .then(res => 
        dispatch({
        type:GET_CHECK,
        payload: res.data,
        }))
    .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: 'No poll with that id.',
        })    
    )

}
export const getPollTest = (id,history)=>dispatch=>{
    history.push("/");

}