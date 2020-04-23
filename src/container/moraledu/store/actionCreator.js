import {GETMORALEDU,UPDATEMORALEDU,DELETEMORALEDU,ADDMORALEDU,} from './constants';
import  axios from '../../../axios.config';
import { message } from 'antd';
export function getMoralEdu(){
    return (dispatch)=>{
        try {
            axios.get('./moraledu').then((res)=>{
                const { result, code, succeed } = res.data
                // console.log(result)
                if (code === 200 && succeed === 1) {
                    dispatch(getMoral(result))
                }else{

                }
            })

        } catch (err) {
            console.log(err)
        }
    }
    
}
export function modifyMoralEdu(moral) {
   
    return (dispatch) => {
        try {
            axios.post('./updatemoraledu', moral).then((res) => {

                const { result, code, succeed } = res.data

                if (code === 200 && succeed === 1) {
                    dispatch(updateMoral(result))
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
export function deleteMoralEdu(moral) {
    
    return (dispatch) => {
        try {
            delete moral.user
            delete moral.sum
            axios.post('./delmoraledu', moral).then((res) => {
                const {  code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(deleteMoral(moral))
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

export function addMoralEdu(moral) {

    return (dispatch) => {
        try {
            axios.post('./addmoraledu', moral).then((res) => {

                const { code, succeed,result } = res.data

                if (code === 200 && succeed === 1) {
                    console.log(result)
                    dispatch(insertMoral(result))
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
const getMoral = (payload) => ({
    type: GETMORALEDU,
    payload
})
const updateMoral = (payload) => ({
    type: UPDATEMORALEDU,
    payload
})
const deleteMoral = (payload) => ({
    type: DELETEMORALEDU,
    payload
})
const insertMoral = (payload) => ({
    type: ADDMORALEDU,
    payload
})

