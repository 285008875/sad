// import { combineReducers } from 'redux'
import { constants } from './index.js'
import { fromJS } from 'immutable';
const initState = fromJS([{
    _id: "2018100",
    className: "",
    marjorName: "",
    marjorCategory: "",
    departmentName: "",
    monitor: "",
}])
function reducer(state = initState, action) {
    // console.log(action)
    switch (action.type) {
        case constants.GETCLASS:
            // state.remove(1)
            return state.clear().merge(action.payload)

        case constants.UPDATECLASS:
            return state
        case constants.DELETECLASS:

            return state
        default:
            return state;
    }
}
export default reducer