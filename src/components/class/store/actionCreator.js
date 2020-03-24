import { GETCLASS, UPDATECLASS, DELETECLASS } from './constants';
import  axios from '../../../axios.config';
export  function setClass(){
    return (dispatch)=>{
        try {
            axios.get('./classmanage').then((res)=>{

                // console.log(res)
                const { result, code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(getClass(result))
                }
            })

        } catch (err) {
            console.log(err)
        }
    }
    
}
export function modifyClass(clazz) {
    return (dispatch) => {
        try {
            axios.get('./classmanage').then((res) => {

                // console.log(res)
                const { result, code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(getClass(result))
                }
            })

        } catch (err) {
            console.log(err)
        }
    }

}
const getClass = (payload) => ({
    type: GETCLASS,
    payload
})
export const updateClass = (payload) => ({
    type: UPDATECLASS,
    payload
})
export const deleteClass = (payload) => ({
    type: DELETECLASS,
    payload
})

