import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Table, Divider, Modal, Button, Input, Icon  } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux'
import { setClass, modifyClass } from './store/actionCreator';
function ClassManager(props) {
    const {setClazz,classInfo} = props
    // console.log(classInfo)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [formDate, setfromDate] = useState({ _id: "", className: "", marjorName: "", marjorCategory:"",departmentName:"",monitor:""})
    const [searchText, setSeacrchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    let searchInput=useRef()
    const getColumnSearchProps = useCallback((dataIndex )=>({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput.current = node;
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
            // console.log(value, record, dataIndex);
            return record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())},
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current.select());
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
    }))
    useEffect(() => {
        try {

            setClazz()
            
        } catch (err) {

        }

        return ()=>{
            searchInput = null
        }
    }, [setClazz])
    const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
        confirm();
        setSeacrchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    },[]);

    const handleReset = useCallback(clearFilters => {
        clearFilters();
        setSeacrchText('')
        
    },[]);
    const showModal = useCallback(() => {
        // console.log(1)
        setVisible(true)
    }, [])


    const handleOk = useCallback(() => {
        setLoading(true)
        formDate._id = formDate._id.state.value
        formDate.className = formDate.className.state.value
        formDate.marjorName = formDate.marjorName.state.value
        formDate.marjorCategory = formDate.marjorCategory.state.value
        formDate.departmentName = formDate.departmentName.state.value
        formDate.monitor = formDate.monitor.state.value
        modifyClazz(formDate)
        setTimeout(() => {
            setLoading(false)
            setVisible(false)
        }, 3000);
    }, [])

    const handleCancel = useCallback(() => {
        setVisible(false)
    }, [])
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
        },
        {
            title: '操作',
            render: (text, record) => {

                return(<>
                    <Button type="primary" onClick={showModal}>
                        修改
                    </Button>
                    <Modal
                        visible={visible}
                        title="班级信息修改"
                        onOk={handleOk}
                        maskClosable="true"
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                返回
                                </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                提交
                                </Button>,
                        ]}
                    >
                        <div style={{ marginBottom: 16 }}>

                            <Input addonBefore="班级编号" ref={input => formDate._id = input} defaultValue={record._id} disabled />
                        </div>
                        <div style={{ marginBottom: 16 }}>

                            <Input addonBefore="班级名称" ref={input => formDate.className = input} defaultValue={record.className} />
                        </div>
                        <div style={{ marginBottom: 16 }}>

                            <Input addonBefore="专业名称" ref={input => formDate.marjorName = input} defaultValue={record.marjorName} />
                        </div>
                        <div style={{ marginBottom: 16 }}>

                            <Input addonBefore="本/专科" ref={input => formDate.marjorCategory = input} defaultValue={record.marjorCategory} />
                        </div>
                        <div style={{ marginBottom: 16 }}>

                            <Input addonBefore="院   系" ref={input => formDate.departmentName = input} defaultValue={record.departmentName} />
                        </div>
                        <div style={{ marginBottom: 16 }}>

                            <Input addonBefore="班    长" ref={input => formDate.monitor = input} defaultValue={record.monitor} />
                        </div>
                    </Modal>
                    <Divider type="vertical" />
                </>)


            }
        },
    ];


    return (
        <>
            <Table columns={columns} dataSource={classInfo} rowKey={record => record._id} size="small" tableLayout="fixed" pagination={{ pageSize: 20 }} scroll={{ y: 370 }} />
        </>
    )
}
function mapStateToProps(state) {
    // console.log(state)
    return {classInfo:state.ClassInfo.toJS()}
}
function mapDispatchToProps(dispatch) {
     return {
         setClazz(){dispatch(setClass())},
         modifyClazz(clazz) { dispatch(modifyClass(clazz)) }
         
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(ClassManager))