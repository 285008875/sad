import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
// const Transcript = lazy(() => import('../container/grade/student'))
const Index = lazy(() => import('./index'));
// const SetInfo = lazy(() => import('../container/userinfo'));
const Teacher = (props) => {
    return (
        <Index>
            <Route exact path="/teacher/grade"  />
            <Route exact path="/teacher/schoolcircle">

            </Route>
            <Route exact path="/teacher/setting" >

            </Route>
            <Route exact path="./teacher/center">

            </Route>
            <Route exact path="./common/state">

            </Route>
            <Route exact path="./common/new">

            </Route>
        </Index>
    )
}
export default Teacher