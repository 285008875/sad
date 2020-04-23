import { GETGRADE } from './constants';
import axios from '../../../axios.config';
import { message } from 'antd';
export function getGrades() {
    return (dispatch) => {
        try {
            axios.get('./allgrade').then((res) => {

                // console.log(res)
                const { result, code, succeed } = res.data
                if (code === 200 && succeed === 1) {
                    dispatch(getGrade(result))
                } else {
                    message.warn('获取数据失败')
                }
            })

        } catch (err) {
            console.log(err)
        }
    }

}

const getGrade = (payload) => ({
    type: GETGRADE,
    payload
})


