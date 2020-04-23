// import { combineReducers } from 'redux'
import { constants } from './index.js'
import { fromJS, merge} from 'immutable';


const initState = fromJS([{

}])
function reducer(state = initState, action) {

    switch (action.type) {
        case constants.GETMORALEDU:

            return state.clear().merge(action.payload)
            
        case constants.UPDATEMORALEDU:
            let index = state.findIndex((item, index, array) => {
                return item._id === action.payload._id 
            })
            return state.update(index, (value) => {

                return merge(value, action.payload)
            })
        case constants.ADDMORALEDU:
            return state.merge(action.payload)


        case constants.DELETEMORALEDU:
            let position = state.findIndex((item, index, array) => {
                return item._id === action.payload._id
            })
            return state.delete(position)
        default:
            return state;
    }
}
export default reducer