import {GETCOURSE,UPDATECOURSE,DELETECOURSE,ADDCOURSE } from './constants';
import  axios from '../../../axios.config';
import { message } from 'antd';
export function getCourses(){
    return (dispatch)=>{
        try {
            axios.get('./coursemanage').then((res)=>{

                // console.log(res)
                const { result, code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(getCourse(result))
                }else{

                }
            })

        } catch (err) {
            console.log(err)
        }
    }
    
}
export function modifyCourses(course) {
    // console.log(course)
    return (dispatch) => {
        try {
            axios.post('./updatecoursemanage', course).then((res) => {

                const { result, code, succeed } = res.data

                if (code === 200 && succeed === 1) {
                    dispatch(updateCourse(result))
                    message.success('信息修改成功');

                }else{
                    message.error('信息修改失败');
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

}
export function deleteCourses(course) {
    return (dispatch) => {
        try {
            axios.post('./delcoursemanage', course).then((res) => {
                const {  code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(deleteCourse(course))
                    message.success('信息修改成功');
                }else{
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

                const { code, succeed,result } = res.data

                if (code === 200 && succeed === 1) {
 
                    dispatch(insertCourse(result))
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
const getCourse = (payload) => ({
    type: GETCOURSE,
    payload
})
const updateCourse = (payload) => ({
    type: UPDATECOURSE,
    payload
})
const deleteCourse = (payload) => ({
    type: DELETECOURSE,
    payload
})
const insertCourse = (payload) => ({
    type: ADDCOURSE,
    payload
})


