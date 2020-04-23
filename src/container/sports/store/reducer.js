// import { combineReducers } from 'redux'
import { constants } from './index.js'
import { fromJS, merge} from 'immutable';


const initState = fromJS([{

}])
function reducer(state = initState, action) {

    switch (action.type) {
        case constants.GETSPORTS:

            return state.clear().merge(action.payload)
            
        case constants.UPDATESPOTS:
            let index = state.findIndex((item, index, array) => {
                return item._id === action.payload._id 
            })
            return state.update(index, (value) => {

                return merge(value, action.payload)
            })
        case constants.ADDSPOTS:
            return state.merge(action.payload)


        case constants.DELETESPOTS:
            let position = state.findIndex((item, index, array) => {
                return item._id === action.payload._id
            })
            return state.delete(position)
        default:
            return state;
    }
}
export default reducer