// import { combineReducers } from 'redux'
import { constants } from './index.js'
import { fromJS, merge} from 'immutable';

// const list = List(['a', 'b', 'c'])
// const result = list.update(2, val => val.toUpperCase())
// console.log(result)
const initState = fromJS([{
    _id: "",
    name: "",
    age: "",
    sex: "",
    email: "",
    tel: "",
}])
function reducer(state = initState, action) {
    // console.log(action)
    switch (action.type) {
        case constants.GETSTUDENT:

            return state.clear().merge(action.payload)
            
        case constants.UPDATESTUDENT:
            let index = state.findIndex((item, index, array) => {
                return item._id === action.payload._id 
            })
            return state.update(index, (value) => {

                return merge(value, action.payload)
            })
        case constants.ADDSTUDENT:
            return state.merge(action.payload)
        case constants.ADDSTUDENTMANY:
            return state.concat(action.payload)

        case constants.DELETESTUDENT:
            let position = state.findIndex((item, index, array) => {
                return item._id === action.payload._id
            })
            return state.delete(position)
        default:
            return state;
    }
}
export default reducer