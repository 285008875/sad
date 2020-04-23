import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
const Index = lazy(() => import('./index'));
const SetInfo = lazy(() => import('../container/userinfo'));
const NotMatch = lazy(() => import('../components/404'))
const AllGrade = lazy(() => import('../container/allGrade_A'))
const Sports = lazy(() => import('../container/sports/student'))
const MoralEdu = lazy(() => import('../container/moraledu/student'))
const Grade = lazy(() => import('../container/gradeT/student'))
const Student = (props) => {
    return (
        <Index>
            <Route exact path="/student/sports" component={Sports}/>
            <Route exact path="/student/moraledu" component={MoralEdu} />
            <Route exact path="/student/allgrade" component = {AllGrade}/>
            <Route exact path="/student/setting" component={SetInfo}/>
            <Route exact path="/student/grademanage" component={Grade}/>
            <Route exact path="./common/state"/>
            <Route exact path="./common/new"/>
            {/* <Route component={NotMatch} /> */}
        </Index>
    )
}
export default Student