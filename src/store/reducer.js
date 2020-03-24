import { combineReducers } from 'redux';
// import { combineReducers } from 'redux-immutable';
import { reducer as LoginRedux } from '../container/login/store';
import { reducer as ClassRedux} from '../components/class/store';
const reducers = combineReducers({
    UserInfo: LoginRedux,
    ClassInfo:ClassRedux
})

export default reducers; 