import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
const Index = lazy(() => import('./index'));
const ClassManager = lazy(() => import('../components/class'))
const StudentManage = lazy(() => import('../container/studentM'))
const TeacherManage = lazy(() => import('../container/teacherM'))
const CourseManage = lazy(() => import('../container/course'))
const Admin = (props) => {
    return (
        <Index>
            <Route exact path="/admin/monitor" />
            <Route exact path="/admin/schoolcircle" />
            <Route exact path="/admin/studentmanage" component={StudentManage}/>
            <Route exact path="/admin/teachermanage" component={TeacherManage}/>
            <Route exact path="/admin/grademanage" />
            <Route exact path="/admin/coursemanage" component={CourseManage}/>
            <Route exact path="/admin/classmanage" component={ClassManager} />
            <Route exact path="/admin/majormanage" />
            <Route exact path="/admin/departmanage" />
            <Route exact path="/admin/impower" />
            <Route exact path="/admin/setting" />
        </Index>
    )
}
export default Admin