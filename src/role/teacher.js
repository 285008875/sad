import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
const Index = lazy(() => import('./index'));
const Impower = lazy(() => import('../container/impower'));
const Grade = lazy(()=>import('../container/gradeT'))
const AllGrade = lazy(() => import('../container/allGrade_A'))
const MoralEdu = lazy(() => import('../container/moraledu'))
const Sports = lazy(() => import('../container/sports'))
const NotMatch = lazy(() => import('../components/404'))
const Teacher = (props) => {
    return (
        <Index>
            <Route exact path="/teacher/grademanage" component={Grade}/>

            <Route exact path="/teacher/impower" component={Impower}/>

            <Route exact path="/teacher/allgrade" component={AllGrade}/>
            <Route exact path="/teacher/sports" component={Sports} />
            <Route exact path="/teacher/moraledu" component={MoralEdu} />
            <Route exact path="./teacher/center"/>
            <Route exact path="/teacher/setting" />
            <Route exact path="./common/new"/>
            {/* <Route component={NotMatch} /> */}

       
        </Index>
    )
}
export default Teacher