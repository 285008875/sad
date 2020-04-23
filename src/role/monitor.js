import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
const Index = lazy(() => import('./index'));
const GradeManage = lazy(() => import('../container/grade'))
const AllGradeManage = lazy(() => import('../container/allGrade_A'))
const Sports = lazy(() => import('../container/sports'))
const MoralEdu = lazy(() => import('../container/moraledu'))
const NotMatch = lazy(() => import('../components/404'))
const UserInfo = lazy(() => import('../container/userinfo/'))
const Admin = (props) => {
    return (
        <Index>
            <Route exact path="/monitor/student" />
            <Route exact path="/monitor/sports" component={Sports}/>
            <Route exact path="/monitor/grademanage" component={GradeManage} />
            <Route exact path="/monitor/moraledu" component={MoralEdu} />
            <Route exact path="/monitor/allgrade" component={AllGradeManage} />
            <Route exact path="/monitor/setting" component={UserInfo} />
            <Route exact path="/common/news" />
            <Route exact path="/common/state" />
            {/* <Route component={NotMatch} /> */}
        </Index>
    )
}
export default Admin