import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
const Transcript = lazy(() => import('../container/grade/student'))
const Index = lazy(() => import('./index'));
const SetInfo = lazy(() => import('../container/userinfo'));
const Student = (props) => {
    return (
        <Index>
            <Route exact path="/student/grade" component={Transcript} />
            <Route exact path="/student/schoolcircle">

            </Route>
            <Route exact path="/student/setting" component={SetInfo}>

            </Route>
            <Route exact path="./student/center">

            </Route>
            <Route exact path="./common/state">

            </Route>
            <Route exact path="./common/new">

            </Route>
        </Index>
    )
}
export default Student