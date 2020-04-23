import React, { memo, useState, useCallback, useLayoutEffect} from 'react';
import { Transfer, message, Button } from 'antd';
import { getStudentsInClass } from './store/actionCreator';
import { connect  } from 'react-redux';
import axios from '../../axios.config';

const Impower = memo((props)=>{
    console.log('Impower')
    const { getStudentInClass, StudentInClass} = props
    const [studentData, setStudentData] = useState([])
    const [targetKeys, setTargetKeys] = useState([])
    const [disabled, setDisabled] = useState(false)
    // useEffect(() => {
    //     console.log(StudentInClass)
    // }, [])
    useLayoutEffect(() => {
        
        getStudentInClass()
        setStudentData(StudentInClass)
        function filterStudent(student) {
            const Monitor = []
            // const noMonitor = []
            student.map((item) => {
                if (item.chosen) {
                    Monitor.push(item.key)
                }
            })
            setTargetKeys(Monitor)
            // setStudentData(noMonitor)
        }
        filterStudent(studentData)

    }, [studentData])
    // useEffect(() => {
    //     function filterStudent(student) {
    //         const Monitor = []
    //         // const noMonitor = []
    //         student.map((item) => {
    //             if (item.chosen) {
    //                 Monitor.push(item.key)
    //             } 
    //         })
    //         setTargetKeys(Monitor)
    //         // setStudentData(noMonitor)
    //     }
    //     filterStudent(StudentInClass)
 
    // }, [StudentInClass])
    const handleChange = useCallback((targetKeys, direction, moveKeys) => {
        console.log(targetKeys, direction, moveKeys)
        if (targetKeys.length>1) {
            message.warn("只能设置一位班长")
        }else{

            if (direction==='left') {
                
                axios.post("./modifymonitor", {studentId:moveKeys.toString()}).then((res)=>{
                    const {code ,succeed,result}=res.data
                    if (code===200 && succeed ===1){
                        setTargetKeys( targetKeys );
                        message.success("移除班长成功")
                    }else{
                        message.error("没有此人")
                    }
                })
            }else{
                if (direction === 'right') {
                    
                    axios.post("./setmonitor", { studentId: moveKeys.toString() }).then((res) => {
                        const { code, succeed, result } = res.data
                        if (code === 200 && succeed === 1) {
                            setTargetKeys(targetKeys);
                            message.success("设置班长成功")
                        } else {
                            message.error("没有此人")
                        }
                    })
                }
            }
        }
    },[]);
    const handleOnSelectChange = useCallback((sourceSelectedKeys, targetSelectedKeys) => {
        // console.log(sourceSelectedKeys, targetSelectedKeys)
    },[],)
    const renderFooter = useCallback(() => (
        <Button size="small" style={{ float: 'right', margin: 5 }} onClick={()=>{getStudentInClass()}}>
            reload
        </Button>
    ),[]);
    
    return (<Transfer
    
        dataSource={studentData}
        listStyle={{
            width: 200,
            height: 500,
            margin:"0 auto"
            
        }}
        showSearch
        titles={["班级成员","班长"]}
        operations={['设置为班长', '移除']}
        targetKeys={targetKeys}
        onChange={(targetKeys, direction, moveKeys) => handleChange(targetKeys, direction, moveKeys)}
        render={item => `${item.title}-${item.description}`}
        footer={renderFooter}
        disabled={disabled}
        onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => { handleOnSelectChange(sourceSelectedKeys, targetSelectedKeys)}}
    />)
})
function mapStateToProps(state) {

    return { StudentInClass: state.StudentInClass.toJS() }
}
function mapDispatchToProps(dispatch) {
    return {
        getStudentInClass() { dispatch(getStudentsInClass())}
    }
    // return { dispatch}
}
export default connect(mapStateToProps, mapDispatchToProps)(Impower)

