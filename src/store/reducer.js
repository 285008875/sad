import { combineReducers } from 'redux';
import { reducer as LoginRedux } from '../container/login/store';
import { reducer as ClassRedux} from '../components/class/store';
import { reducer as StudentRedux } from '../container/studentM/store';
import { reducer as TeacherRedux } from '../container/teacherM/store';
import { reducer as CourseRedux } from '../container/course/store';
import { reducer as StudentInClassRedux } from '../container/impower/store';
import { reducer as GradeRedux} from  '../container/grade/store/'
import { reducer as AGradeRedux } from '../container/allGrade_A/store';
import { reducer as TGradeRedux } from '../container/allGrade_A/store';
import { reducer as SportsRedux } from '../container/sports/store';
import { reducer as MoralEduRedux } from '../container/moraledu/store';
const reducers = combineReducers({
    UserInfo: LoginRedux,
    ClassInfo:ClassRedux,
    StudentInfo: StudentRedux,
    TeacherInfo: TeacherRedux,
    CourseInfo: CourseRedux,
    StudentInClass: StudentInClassRedux,
    GradeInfo:GradeRedux,
    AGradeInfo: AGradeRedux,
    TGradeInfo:TGradeRedux,
    SportsInfo:SportsRedux,
    MoralEduInfo:MoralEduRedux

})

export default reducers; 