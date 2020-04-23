// import { combineReducers } from 'redux'
import { constants } from './index.js'
import { fromJS, merge } from 'immutable';

const initState = fromJS([{


}])
function reducer(state = initState, action) {
    // console.log(action)
    switch (action.type) {
        case constants.GETGRADE:

            return state.clear().merge(action.payload)

        default:
            return state;
    }
}
export default reducer