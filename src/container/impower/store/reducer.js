// import { combineReducers } from 'redux'
import { constants } from './index.js'
import { fromJS, merge } from 'immutable';

// const list = List(['a', 'b', 'c'])
// const result = list.update(2, val => val.toUpperCase())
// console.log(result)
const initState = fromJS([{
    key:"",
    title: "",
    description:"" ,
    chosen: ""
}])
function reducer(state = initState, action) {
    // console.log(action)
    switch (action.type) {
        case constants.STUDENTINCLASS:

            return state.clear().merge(action.payload)


        default:
            return state;
    }
}
export default reducer