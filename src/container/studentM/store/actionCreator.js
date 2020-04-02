import { GETSTUDENT, UPDATESTUDENT, DELETESTUDENT, ADDSTUDENT, ADDSTUDENTMANY } from './constants';
import  axios from '../../../axios.config';
import { message } from 'antd';
export function getStudents(){
    return (dispatch)=>{
        try {
            axios.get('./studentmanage').then((res)=>{

                // console.log(res)
                const { result, code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(getStu(result))
                }else{

                }
            })

        } catch (err) {
            console.log(err)
        }
    }
    
}
export function modifyStudents(student) {
    console.log(student)
    return (dispatch) => {
        try {
            axios.post('./studentmanage', student).then((res) => {

                const { result, code, succeed } = res.data

                if (code === 200 && succeed === 1) {
                    dispatch(updateStu(result))
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
export function deleteStudents(student) {
    return (dispatch) => {
        try {
            axios.post('./delstudentmanage', student).then((res) => {
                const {  code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(deleteStu(student))
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
export function inserStudentMany(student){
    return (dispatch) => {

        dispatch(insertStuMany(student))
    }
}
export function addStudents(student) {
    // console.log(student)
    return (dispatch) => {
        try {
            axios.post('./addstudentmanage', student).then((res) => {

                const { code, succeed,result } = res.data

                if (code === 200 && succeed === 1) {
 
                    dispatch(insertStu(result))
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
const getStu = (payload) => ({
    type: GETSTUDENT,
    payload
})
const updateStu = (payload) => ({
    type: UPDATESTUDENT,
    payload
})
const deleteStu = (payload) => ({
    type: DELETESTUDENT,
    payload
})
const insertStu = (payload) => ({
    type: ADDSTUDENT,
    payload
})
const insertStuMany = (payload) => {
    console.log("payload",payload)
    return { 
        type: ADDSTUDENTMANY,
        payload
    }
}

