import { combineReducers } from 'redux';
import { reducer as loginRedux } from '../container/login/store';
// import { reducer as homeRedux } from '../pages/home/store/index.js';
// import { reducer as DetailRedux } from '../pages/detail/store/index';
// import { reducer as LoginRedux } from '../pages/login/store/index';
const reducers = combineReducers({
    userInfo: loginRedux,
    // home: homeRedux,
    // detail: DetailRedux,
    // login: LoginRedux
})

export default reducers; 