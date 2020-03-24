// import { combineReducers } from 'redux'
import { constants } from './index.js'
import { fromJS } from 'immutable';
const initialState = fromJS({
    _id: '',
    name: '',
    sex: '',
    classId: '',
    tel: '',
    email: '',
    age: '',
    roleId: {}
})

function reducer(state = initialState, action) {

    switch (action.type) {
        case constants.USERINFO:
            // console.log(action)
            return state.merge(action.payload);
        default:
            return state;
    }
}
export default reducer