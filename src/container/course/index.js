import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Table, Modal, Button, Input, Icon, Form, Popconfirm, } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux'
// import { is } from 'immutable';
import { getCourses, modifyCourses,deleteCourses,addCourses } from './store/actionCreator';
// import axios from '../../axios.config';

function isEmpty(preState, nextState) {
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

function CourseManager(props) {
    console.log("student")
    const { CourseInfo,getCourse,modifyCourse,deleteCourse,addCourses } = props
    // 保存模态框中 表单值的状态
    const [formDate] = useState({ _id: "", courseName: "", createTime: "" })
    const [formClazz] = useState({ _id: "", courseName: "", createTime: "" ,  })
    const [searchText, setSeacrchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    let searchInput = useRef()
    // 处理表格 排序筛选
    const getColumnSearchProps = useCallback((dataIndex) => ({
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
        onFilter: (value, record) => {
            return record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
        },
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
    }), [])
    useEffect(() => {
        try {
            //异步请求class
            getCourse()

        } catch (err) {

        }
        // 清除 searchInput
        return () => {
            searchInput = null
        }
    }, [getCourse])
    const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
        confirm();
        setSeacrchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }, []);

    const handleReset = useCallback(clearFilters => {
        clearFilters();
        setSeacrchText('')

    }, []);


    // 获取Modal中 表单的值 
    const handleUpdateOk = useCallback(() => {
        formDate._id = formDate._id.state.value
        formDate.courseName = formDate.courseName.state.value
        formDate.createTime = formDate.createTime.state.value
        modifyCourse(formDate)
        Modal.destroyAll()
    }, [modifyCourse, formDate])
    const handleAddOk = useCallback(() => {
        formClazz._id = formClazz._id.state.value
        formClazz.courseName = formClazz.courseName.state.value
        formClazz.createTime = formClazz.createTime.state.value
        addCourses(formClazz)
        Modal.destroyAll()
    }, [addCourses, formClazz])

    const handleDelete = useCallback((key) => {
        deleteCourse(key)

    }, [deleteCourse])
    const handleAdd = useCallback((key) => {
        const form = (
            <Form  >
                <Form.Item >
                    <Input addonBefore="课程号" ref={(input) => formClazz._id = input} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="课程名称" ref={(input) => formClazz.courseName = input} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="创建时间" ref={(input) => formClazz.createTime = input} />
                </Form.Item>
            </Form>
        )
        Modal.confirm({
            title: '添加课程信息',
            content: form,
            onOk: handleAddOk,
        })

    }, [formClazz, handleAddOk])
    const handleUpdate = useCallback((key) => {

        const form = (

            <Form  >
                <Form.Item >
                    <Input disabled addonBefore="课程号" ref={(input) => formDate._id = input} defaultValue={key._id} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="课程名称" ref={(input) => formDate.courseName = input} defaultValue={key.courseName} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="创建时间" ref={(input) => formDate.createTime = input} defaultValue={key.createTime} />
                </Form.Item>
            </Form>
        )
        Modal.confirm({
            title: '修改课程信息',
            content: form,
            onOk: handleUpdateOk,
        })
    }, [handleUpdateOk, formDate])

    const columns = [
        {
            title: '课程号',
            dataIndex: '_id',
            key: '_id',
            sorter: (a, b) => a._id - b._id,
            ...getColumnSearchProps("_id"),
            sortDirections: ['descend', 'ascend'],
            // render: text => <a>{text}</a>,
        },
        {
            title: '课程名称',
            dataIndex: 'courseName',
            key: 'courseName',
            ...getColumnSearchProps("courseName"),
        },
        {
            title: '时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            render: (text, record, index) => {
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
                dataSource={CourseInfo}
                rowKey={record => record._id}
                size="small" tableLayout="fixed"
                pagination={{ pageSize: 100 }}
                scroll={{ y: 370 }}
            />
            <Button type="primary" onClick={() => { handleAdd() }} style={{ position: "absolute", bottom: 70, left: 250 }}>添加</Button>
        </>
    )
}
function mapStateToProps(state) {

    return { CourseInfo: state.CourseInfo.toJS() }
}
function mapDispatchToProps(dispatch) {
    return {
        getCourse() { dispatch(getCourses()) },
        modifyCourse(course) { dispatch(modifyCourses(course)) },
        deleteCourse(course) { dispatch(deleteCourses(course)) },
        addCourses(course) { dispatch(addCourses(course)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(CourseManager, isEmpty))