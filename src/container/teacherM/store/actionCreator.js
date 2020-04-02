import {GETTEACHER,UPDATETEACHER,DELETETEACHER,ADDTEACHER } from './constants';
import axios from '../../../axios.config';
import { message } from 'antd';
export function getTeachers() {
    return (dispatch) => {
        try {
            axios.get('./teachermanage').then((res) => {

                // console.log(res)
                const { result, code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    // console.log(result)
                    dispatch(getTea(result))
                } else {

                }
            })

        } catch (err) {
            console.log(err)
        }
    }

}
export function modifyTeachers(teacher) {
    console.log(teacher)
    return (dispatch) => {
        try {
            axios.post('./teachermanage', teacher).then((res) => {

                const { result, code, succeed } = res.data

                if (code === 200 && succeed === 1) {
                    dispatch(updateTea(result))
                    message.success('信息修改成功');

                } else {
                    message.error('信息修改失败');
                }
            })
        } catch (err) {
            console.log(err)
            message.error('信息修改失败');
        }
    }

}
export function deleteTeachers(teacher) {
    console.log(teacher)
    return (dispatch) => {
        try {
            axios.post('./delteachermanage', teacher).then((res) => {
                const { code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(deleteTea(teacher))
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
// export function inserTeacherMany(student) {
//     insertStuMany(student)
// }
export function addTeachers(student) {
    // console.log(student)
    return (dispatch) => {
        try {
            axios.post('./addstudentmanage', student).then((res) => {

                const { code, succeed, result } = res.data

                if (code === 200 && succeed === 1) {

                    dispatch(insertTea(result))
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
const getTea = (payload) => ({
    type: GETTEACHER,
    payload
})
const updateTea = (payload) => ({
    type: UPDATETEACHER,
    payload
})
const deleteTea = (payload) => ({
    type: DELETETEACHER,
    payload
})
const insertTea = (payload) => ({
    type: ADDTEACHER,
    payload
})
// const insertTeaMany = (payload) => ({
//     type: ADDTEACHERMANY,
//     payload
// })

