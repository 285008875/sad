import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Table, Modal, Button, Input, Icon, Form, Popconfirm, Upload, Message} from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux'
// import { is } from 'immutable';
import { getStudents, modifyStudents, deleteStudents, addStudents, inserStudentMany} from './store/actionCreator';
// import axios from '../../axios.config';

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

function StudentManager(props) {
    console.log("student")
    const { getStudent, StudentInfo, updateStudent, delStudent, addStudent, addStudentMany} = props
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
            getStudent()
            
        } catch (err) {

        }
        // 清除 searchInput
        return ()=>{
            searchInput = null
        }
    }, [getStudent])
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
        updateStudent(formDate)
        Modal.destroyAll()
    }, [updateStudent, formDate])
    const handleAddOk = useCallback(() => {
        formClazz._id = formClazz._id.state.value
        formClazz.name = formClazz.name.state.value
        formClazz.age = formClazz.age.state.value
        formClazz.sex = formClazz.sex.state.value
        formClazz.email = formClazz.email.state.value
        formClazz.tel = formClazz.tel.state.value
        console.log(formClazz)
        addStudent(formClazz)
        Modal.destroyAll()
    }, [addStudent, formClazz])

    const handleDelete = useCallback((key) => {
        delStudent(key)

    }, [delStudent])
    const handleAdd = useCallback((key) => {
        const form = (
            <Form  >
                <Form.Item >
                    <Input  addonBefore="学工号" ref={(input) => formClazz._id = input}  />
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
            title: '修改学生信息',
            content: form,
            onOk: handleAddOk,
        })

    }, [formClazz, handleAddOk])
    const handleUpdate = useCallback((key) => {
    
        const form = (
            
            <Form  >
                <Form.Item >
                    <Input disabled addonBefore="学工号" ref={(input)=>formDate._id= input} defaultValue={key._id}/>
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
            title: '修改学生信息',
            content: form ,
            onOk: handleUpdateOk,
        },)
    }, [handleUpdateOk, formDate])
    const handleFileDownload = useCallback(()=>{
        // console.log(111111111)
        fetch('./filedownload',{
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.blob().then(blob => {
            var filename = 'student.xlsx'
        
                var a = document.createElement('a');
                document.body.appendChild(a) //兼容火狐，将a标签添加到body当中
                var url = window.URL.createObjectURL(blob);   // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
                a.href = url;
                a.download = filename;
                a.target = '_blank'  // a标签增加target属性
                a.click();
                a.remove()  //移除a标签
                window.URL.revokeObjectURL(url);
            
        }))
        
    },[])
    const UploadProps = {
        action: './fileupload',
        method:'post',
        accept:'.xlsx, .xml, .xls',
        listType:'xlsx',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token')},
        name:"studentFile",
        onChange(info) {
            if (info.file.status === 'done') {
                console.log(info)
                const {code ,succeed,result} = info.file.response
                if (code === 200 && succeed===1) {
                    addStudentMany(result)
                }
                Message.success(`${info.file.name} 文件上传成功`);
            } else if (info.file.status === 'error') {
                Message.error(`${info.file.name}文件上传失败.`);
            }
        },
    };
    const columns = [
        {
            title: '学工号',
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
            title: '操作',
            render: (text, record,index) => {
                // console.log(record._id)

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
                dataSource={StudentInfo}
                rowKey={record => record._id}  
                size="small" tableLayout="fixed" 
                pagination={{ pageSize: 100 }} 
                scroll={{ y: 370 }} 
            />
            <Button type="primary" onClick={()=>{handleAdd()}} style={{position:"absolute",bottom:70,left:250}}>添加</Button>
            <Upload {...UploadProps}>
                <Button type="primary" style={{ position: "absolute", bottom: 70, left: 320 }}>
                    <Icon type="upload" /> 上传学生信息
                </Button>
            </Upload>
            <Button type="primary" icon="download" onClick={() => { handleFileDownload() }} style={{ position: "absolute", bottom: 70, left: 464 }}>导出学生信息</Button>
        </>
    )
}
function mapStateToProps(state) {
    
    return {StudentInfo:state.StudentInfo.toJS()}
}
function mapDispatchToProps(dispatch) {
     return {
         getStudent(){dispatch(getStudents())},
         updateStudent(stu) { dispatch(modifyStudents(stu))},
         delStudent(stu) { dispatch(deleteStudents(stu))},
         addStudent(stu) { dispatch(addStudents(stu))},
         addStudentMany(stu) { dispatch(inserStudentMany(stu))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(StudentManager,isEmpty))