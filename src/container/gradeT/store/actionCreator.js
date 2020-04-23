import {GETGRADE,UPDATEGRADE,DELETEGRADE,ADDGRADE } from './constants';
import axios from '../../../axios.config';
import { message } from 'antd';
export function getGrades() {
    return (dispatch) => {
        try {
            axios.get('./grademanage').then((res) => {

                // console.log(res)
                const { result, code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(getGrade(result))
                } else {

                }
            })

        } catch (err) {
            console.log(err)
        }
    }

}
export function modifyGrades(grade) {
    // console.log(grade)
    return (dispatch) => {
        try {
            axios.post('./updategrademanage', grade).then((res) => {

                const { result, code, succeed } = res.data

                if (code === 200 && succeed === 1) {
                    dispatch(updateGrade(result))
                    message.success('信息修改成功');

                } else {
                    message.error('信息修改失败');
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

}
export function deleteGrades(grade) {
    return (dispatch) => {
        try {
            axios.post('./delgrademanage', grade).then((res) => {
                const { code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(deleteGrade(grade))
                    message.success('信息修改成功');
                } else {
                    message.error('信息修改失败');
                }
            })
        } catch (err) {
            message.error('信息修改失败');
        }
    }

}

export function addCourses(course) {
    // console.log(course)
    return (dispatch) => {
        try {
            axios.post('./addcoursemanage', course).then((res) => {

                const { code, succeed, result } = res.data

                if (code === 200 && succeed === 1) {

                    dispatch(insertGrade(result))
                    message.success('添加成功');
                } else {
                    message.error('添加失败');
                }
            })
        } catch (err) {
            console.log(err)
            message.error('请求失败失败');
        }
    }
}
const getGrade = (payload) => ({
    type: GETGRADE,
    payload
})
const updateGrade = (payload) => ({
    type: UPDATEGRADE,
    payload
})
const deleteGrade = (payload) => ({
    type: DELETEGRADE,
    payload
})
const insertGrade = (payload) => ({
    type: ADDGRADE,
    payload
})


