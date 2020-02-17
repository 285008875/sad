// import { combineReducers } from 'redux'
import { constants } from './index.js'
const initState = {
    studentID: '',
    studentName: '',
    sex: '', // 是否显示城市选择列表
    classID: '', //判断点击选择左输入框还是右输入框
    Role: [
        {
            privilegeID: "",
            privilegeName: "",
            privilegeURL: ""
        }
    ],
};
function reducer(state = initState, action) {

    switch (action.type) {
        case constants.USERINFO:
            // console.log(action)
            return action.payload
        default:
            return state;
    }
}
export default reducer