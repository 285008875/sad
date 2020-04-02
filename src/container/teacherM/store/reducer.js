
import { constants } from './index.js'
import { fromJS, merge } from 'immutable';

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
    switch (action.type) {
        case constants.GETTEACHER:
            return state.clear().merge(action.payload)

        case constants.UPDATETEACHER:
            let index = state.findIndex((item, index, array) => {
                return item._id === action.payload._id
            })
            return state.update(index, (value) => {

                return merge(value, action.payload)
            })
        case constants.DELETETEACHER:
            let position = state.findIndex((item, index, array) => {
                return item._id === action.payload._id
            })
            return state.delete(position)
        case constants.ADDTEACHER:
            console.log(action.payload)
            return state.concat(action.payload)
        default:
            return state;
    }
}
export default reducer