import {GETSPORTS,UPDATESPOTS,DELETESPOTS,ADDSPOTS} from './constants';
import  axios from '../../../axios.config';
import { message } from 'antd';
export function getSports(){
    return (dispatch)=>{
        try {
            axios.get('./sports').then((res)=>{

                // console.log(res)
                const { result, code, succeed } = res.data
                // console.log(result)
                if (code === 200 && succeed === 1) {
                    dispatch(getSport(result))
                }else{

                }
            })

        } catch (err) {
            console.log(err)
        }
    }
    
}
export function modifySports(sports) {
   
    return (dispatch) => {
        try {
            axios.post('./updatesports', sports).then((res) => {

                const { result, code, succeed } = res.data

                if (code === 200 && succeed === 1) {
                    dispatch(updateSport(result))
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
export function deleteSports(sports) {
    
    return (dispatch) => {
        try {
            delete sports.user
            delete sports.sum
            axios.post('./delsports', sports).then((res) => {
                const {  code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(deleteSport(sports))
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

export function addSports(sports) {

    return (dispatch) => {
        try {
            axios.post('./addsports', sports).then((res) => {

                const { code, succeed,result } = res.data

                if (code === 200 && succeed === 1) {
                    console.log(result)
                    dispatch(insertSports(result))
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
const getSport = (payload) => ({
    type: GETSPORTS,
    payload
})
const updateSport = (payload) => ({
    type: UPDATESPOTS,
    payload
})
const deleteSport = (payload) => ({
    type: DELETESPOTS,
    payload
})
const insertSports = (payload) => ({
    type: ADDSPOTS,
    payload
})

