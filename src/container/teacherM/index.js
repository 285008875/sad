import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Table, Modal, Button, Input, Icon, Form, Popconfirm} from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux'
import { getTeachers, modifyTeachers, deleteTeachers, addTeachers} from './store/actionCreator';


function isEmpty(preState,nextState){
    // const index = nextState.length-1

    // console.log(is(preState.studentInfo[0], nextState.studentInfo[0]))
    // while (index>=0) {
    //     if (is(preState.studentInfo[index], nextState.studentInfo[index])==false){
    //         return false
    //         break
    //     }
    //     index--
    // }
    
    // return true
    
}

function TeacherManager(props) {
    console.log("teacher")
    const { getTeacher, teacherInfo, updateTeacher, delTeacher, addTeacher, addTeacherMany} = props
    // 保存模态框中 表单值的状态
    const [formDate] = useState({ _id: "", name: "", age: "", sex:"",email:"",tel:""})
    const [formClazz] = useState({ _id: "", name: "", age: "", sex: "", email: "", tel: "" })
    const [searchText, setSeacrchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    let searchInput=useRef()
    // 处理表格 排序筛选
    const getColumnSearchProps = useCallback((dataIndex )=>({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
        </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
        </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>{
            return record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())},
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    }),[])
    useEffect(() => {
        try {
            //异步请求class
            getTeacher()
            
        } catch (err) {

        }
        // 清除 searchInput
        return ()=>{
            searchInput = null
        }
    }, [getTeacher])
    const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
        confirm();
        setSeacrchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    },[]);

    const handleReset = useCallback(clearFilters => {
        clearFilters();
        setSeacrchText('')
        
    },[]);
    //Modal 是否可见
    // const showModal = useCallback(() => {
    //     setVisible(true)
    // }, [])

    // 获取Modal中 表单的值 
    const handleUpdateOk = useCallback(() => {
        formDate._id = formDate._id.state.value
        formDate.name = formDate.name.state.value
        formDate.age = formDate.age.state.value
        formDate.sex = formDate.sex.state.value
        formDate.email = formDate.email.state.value
        formDate.tel = formDate.tel.state.value
        updateTeacher(formDate)
        Modal.destroyAll()
    }, [updateTeacher, formDate])
    const handleAddOk = useCallback(() => {
        formClazz._id = formClazz._id.state.value
        formClazz.name = formClazz.name.state.value
        formClazz.age = formClazz.age.state.value
        formClazz.sex = formClazz.sex.state.value
        formClazz.email = formClazz.email.state.value
        formClazz.tel = formClazz.tel.state.value
        console.log(formClazz)
        addTeacher(formClazz)
        Modal.destroyAll()
    }, [addTeacher, formClazz])

    const handleDelete = useCallback((key) => {
        delTeacher(key)

    }, [delTeacher])
    const handleAdd = useCallback((key) => {
        const form = (
            <Form  >
                <Form.Item >
                    <Input  addonBefore="教工号" ref={(input) => formClazz._id = input}  />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="姓名" ref={(input) => formClazz.name = input} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="年龄" ref={(input) => formClazz.age = input}  />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="性别" ref={(input) => formClazz.sex = input}  />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="邮箱" ref={(input) => formClazz.email = input}  />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="手机" ref={(input) => formClazz.tel = input}  />
                </Form.Item>
            </Form>
        )
        Modal.confirm({
            title: '修改教师信息',
            content: form,
            onOk: handleAddOk,
        })

    }, [formClazz, handleAddOk])
    const handleUpdate = useCallback((key) => {
    
        const form = (
            
            <Form  >
                <Form.Item >
                    <Input disabled addonBefore="教工号" ref={(input)=>formDate._id= input} defaultValue={key._id}/>
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="姓名" ref={(input) => formDate.name = input} defaultValue={key.name} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="年龄" ref={(input) => formDate.age = input} defaultValue={key.age} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="性别" ref={(input) => formDate.sex = input} defaultValue={key.sex} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="邮箱" ref={(input) => formDate.email = input} defaultValue={key.email} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="手机" ref={(input) => formDate.tel = input} defaultValue={key.tel} />
                </Form.Item>
            </Form>
        )
        Modal.confirm({
            title: '修改教师信息',
            content: form ,
            onOk: handleUpdateOk,
        },)
    }, [handleUpdateOk, formDate])
    const handleFileDownload = useCallback(()=>{
        
        fetch('./tfiledownload',{
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.blob().then(blob => {
            var filename = 'teacher.xlsx'
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, filename);  //兼容ie10
            } else {
                var a = document.createElement('a');
                document.body.appendChild(a) //兼容火狐，将a标签添加到body当中
                var url = window.URL.createObjectURL(blob);   // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
                a.href = url;
                a.download = filename;
                a.target = '_blank'  // a标签增加target属性
                a.click();
                a.remove()  //移除a标签
                window.URL.revokeObjectURL(url);
            }
        }))
        
    },[])
    const columns = [
        {
            title: '教工号',
            dataIndex: '_id',
            key: '_id',
            sorter: (a, b) => a._id - b._id,
            ...getColumnSearchProps("_id"),
            sortDirections: ['descend', 'ascend'],
            // render: text => <a>{text}</a>,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            ...getColumnSearchProps("age"),
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '手机',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: '班级',
            dataIndex: 'className',
            key: 'className',
            render: (text, record, index)=>{
                // console.log(record)
                return record.classId? record.classId.className:null
            }
        },
        {
            title: '操作',
            render: (text, record,index) => {
                    return (
                        <>
                            <Popconfirm title="确定修改吗?" onConfirm={() => handleUpdate(record)}>
                                <Button type="primary" >
                                    修改
                                </Button>
                            </Popconfirm>
                            <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record)}>
                                <Button type="danger">删除</Button>
                            </Popconfirm>
                            <div>
                            
                            </div>
                        </>
                    )
                


            }
        },
    ];


    return (
        <>
            <Table 
                columns={columns} 
                dataSource={teacherInfo}
                rowKey={record => record._id}  
                size="small" 
                bordered
                tableLayout="fixed" 
                pagination={{ pageSize: 100 }} 
                scroll={{ y: 370 }} 
            />
            <Button type="primary" onClick={()=>{handleAdd()}} style={{position:"absolute",bottom:70,left:250}}>添加</Button>
            <Button type="primary" icon="download" onClick={() => { handleFileDownload() }} style={{ position: "absolute", bottom: 70, left: 330 }}>导出教师信息</Button>
        </>
    )
}
function mapStateToProps(state) {
    
    return {teacherInfo:state.TeacherInfo.toJS()}
}
function mapDispatchToProps(dispatch) {
     return {
         getTeacher(){dispatch(getTeachers())},
         updateTeacher(teacher) { dispatch(modifyTeachers(teacher))},
         delTeacher(teacher) { dispatch(deleteTeachers(teacher))},
         addTeacher(teacher) { dispatch(addTeachers(teacher))},
        //  addTeacherMany(teacher) { inserTeacherMany(teacher)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(TeacherManager,isEmpty))