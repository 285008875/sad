// import { combineReducers } from 'redux'
import { constants } from './index.js'
import { fromJS, merge } from 'immutable';

// const list = List(['a', 'b', 'c'])
// const result = list.update(2, val => val.toUpperCase())
// console.log(result)
const initState = fromJS([{


}])
function reducer(state = initState, action) {
    // console.log(action)
    switch (action.type) {
        case constants.GETGRADE:

            return state.clear().merge(action.payload)

        case constants.UPDATEGRADE:
            let index = state.findIndex((item, index, array) => {
                return item._id === action.payload._id
            })
            return state.update(index, (value) => {
                // console.log(index, value)
                // value.score = action.payload.score
                // value.semester = action.payload.semester
                // console.log(merge(value, action.payload))
                return merge(value, action.payload)
            })
        case constants.ADDGRADE:
            return state.merge(action.payload)
        case constants.DELETEGRADE:
            let position = state.findIndex((item, index, array) => {
                return item._id === action.payload._id
            })
            return state.delete(position)
        default:
            return state;
    }
}
export default reducer