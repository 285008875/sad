import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Table,  Modal, Button, Input, Icon, Form, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux'
import { setClass, modifyClass, delClass, addClass } from './store/actionCreator';

function ClassManager(props) {
    console.log("class")
    const { setClazz, classInfo, updateClazz, deleteClazz, addClazz } = props
    // 保存模态框中 表单值的状态
    const [formDate] = useState({ _id: "", className: "", marjorName: "", marjorCategory: "", departmentName: "", monitor: "" })
    const [formClazz] = useState({ _id: "", className: "", marjorName: "", marjorCategory: "", departmentName: "", monitor: "" })
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
            console.log(value, record, dataIndex)
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
    }),[])
    useEffect(() => {
        try {
            //异步请求class
            setClazz()

        } catch (err) {

        }
        // 清除 searchInput
        return () => {
            searchInput = null
        }
    }, [setClazz])
    const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
        confirm();
        setSeacrchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }, []);

    const handleReset = useCallback(clearFilters => {
        clearFilters();
        setSeacrchText('')

    }, []);
    //Modal 是否可见
    // const showModal = useCallback(() => {
    //     setVisible(true)
    // }, [])

    // 获取Modal中 表单的值 
    const handleUpdateOk = useCallback(() => {
        formDate._id = formDate._id.state.value
        formDate.className = formDate.className.state.value
        formDate.marjorName = formDate.marjorName.state.value
        formDate.marjorCategory = formDate.marjorCategory.state.value
        formDate.departmentName = formDate.departmentName.state.value
        formDate.monitor = formDate.monitor.state.value
        updateClazz(formDate)
        Modal.destroyAll()
    }, [formDate,updateClazz])
    const handleAddOk = useCallback(() => {
        formClazz._id = formClazz._id.state.value
        formClazz.className = formClazz.className.state.value
        formClazz.marjorName = formClazz.marjorName.state.value
        formClazz.marjorCategory = formClazz.marjorCategory.state.value
        formClazz.departmentName = formClazz.departmentName.state.value
        formClazz.monitor = formClazz.monitor.state.value
        addClazz(formClazz)
        Modal.destroyAll()
    }, [addClazz, formClazz])

    const handleDelete = useCallback((key) => {
        deleteClazz(key)

    }, [deleteClazz])
    const handleAdd = useCallback((key) => {
        const form = (
            <Form  >
                <Form.Item >
                    <Input addonBefore="班级编号" ref={(input) => formClazz._id = input} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="班级名称" ref={(input) => formClazz.className = input} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="专业名称" ref={(input) => formClazz.marjorName = input} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="本/专科" ref={(input) => formClazz.marjorCategory = input} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="院系" ref={(input) => formClazz.departmentName = input} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="班长" ref={(input) => formClazz.monitor = input} />
                </Form.Item>
            </Form>
        )
        Modal.confirm({
            title: '修改班级信息',
            content: form,
            onOk: handleAddOk,
        })

    }, [formClazz, handleAddOk])
    const handleUpdate = useCallback((key) => {

        const form = (

            <Form  >
                <Form.Item >
                    <Input disabled addonBefore="班级编号" ref={(input) => formDate._id = input} defaultValue={key._id} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="班级名称" ref={(input) => formDate.className = input} defaultValue={key.className} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="专业名称" ref={(input) => formDate.marjorName = input} defaultValue={key.marjorName} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="本/专科" ref={(input) => formDate.marjorCategory = input} defaultValue={key.marjorCategory} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="院系" ref={(input) => formDate.departmentName = input} defaultValue={key.departmentName} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="班长" ref={(input) => formDate.monitor = input} defaultValue={key.monitor} />
                </Form.Item>
            </Form>
        )
        Modal.confirm({
            title: '修改班级信息',
            content: form,
            onOk: handleUpdateOk,
        })
    }, [formDate,handleUpdateOk])
    const columns = [
        {
            title: '班级编号',
            dataIndex: '_id',
            key: '_id',
            sorter: (a, b) => a._id - b._id,
            ...getColumnSearchProps("_id"),
            sortDirections: ['descend', 'ascend'],
            // render: text => <a>{text}</a>,
        },
        {
            title: '班级名称',
            dataIndex: 'className',
            key: 'className',
        },
        {
            title: '专业名称',
            dataIndex: 'marjorName',
            key: 'marjorName',
            ...getColumnSearchProps("marjorName"),
        },
        {
            title: '本/专科',
            dataIndex: 'marjorCategory',
            key: 'marjorCategory',
        },
        {
            title: '院系',
            dataIndex: 'departmentName',
            key: 'departmentName',
        },
        {
            title: '班长',
            dataIndex: 'monitor',
            key: 'monitor',
            render:(text,record,index)=>{
                // console.log(text, record, index)
                return text
            }
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
                dataSource={classInfo}
                rowKey={record => record._id}
                size="small" tableLayout="fixed"
                pagination={{ pageSize: 20 }}
                scroll={{ y: 370 }}
            />
            <Button type="primary" onClick={() => { handleAdd() }} style={{ position: "absolute", bottom: 70, left: 250 }}>添加</Button>
        </>
    )
}
function mapStateToProps(state) {

    return { classInfo: state.ClassInfo.toJS() }
}
function mapDispatchToProps(dispatch) {
    return {
        setClazz() { dispatch(setClass()) },
        updateClazz(clazz) { dispatch(modifyClass(clazz)) },
        deleteClazz(clazz) { dispatch(delClass(clazz)) },
        addClazz(clazz) { dispatch(addClass(clazz)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(ClassManager))