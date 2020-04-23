import { STUDENTINCLASS } from './constants';
import axios from '../../../axios.config';
import { message } from 'antd';

export function getStudentsInClass() {
    return (dispatch) => {
        try {
            axios.get('./impower').then((res)=>{
                const { code, succeed, result } = res.data
    
                if (code === 200 && succeed === 1) {
                    const data = result.map((item, index) => {
                        return {
                            key: item._id,
                            title: item.name,
                            description: item.tel,
                            chosen: item.roleId!=="s123"
                        }
                    })
                    // console.log(data)
                    dispatch(getStudent(data))
                } else {
                    message.warning({
                        content: "没有相应学生数据"
                    })
                    return []
                }

            })

        } catch (err) {
            console.log(err)
        }
    }
}
const getStudent = (payload) => ({
    type: STUDENTINCLASS ,
    payload
})