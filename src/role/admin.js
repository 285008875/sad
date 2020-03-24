import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
const Index = lazy(() => import('./index'));
const ClassManager = lazy(() => import('../components/class'))

const Admin = (props) => {
    return (
        <Index>
            <Route exact path="/admin/monitor" />
            <Route exact path="/admin/schoolcircle" />
            <Route exact path="/admin/studentmanage" />
            <Route exact path="/admin/teachermanage" />
            <Route exact path="/admin/grademanage" />
            <Route exact path="/admin/coursemanage" />
            <Route exact path="/admin/classmanage" component={ClassManager} />
            <Route exact path="/admin/majormanage" />
            <Route exact path="/admin/departmanage" />
            <Route exact path="/admin/impower" />
            <Route exact path="/admin/setting" />
        </Index>
    )
}
export default Admin