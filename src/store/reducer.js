import { combineReducers } from 'redux';
import { reducer as LoginRedux } from '../container/login/store';
import { reducer as ClassRedux} from '../components/class/store';
import { reducer as StudentRedux } from '../container/studentM/store';
import { reducer as TeacherRedux } from '../container/teacherM/store';
import { reducer as CourseRedux } from '../container/course/store';
const reducers = combineReducers({
    UserInfo: LoginRedux,
    ClassInfo:ClassRedux,
    StudentInfo: StudentRedux,
    TeacherInfo: TeacherRedux,
    CourseInfo: CourseRedux,
})

export default reducers; 