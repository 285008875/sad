import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Table, Modal, Button, Input, Icon, Form, Popconfirm, Upload, Message} from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux'
// import { is } from 'immutable';
import { getSports, modifySports, deleteSports, addSports} from './store/actionCreator';
// import axios from '../../axios.config';

function isEmpty(preState,nextState){

    
}

function Sports(props) {
    console.log("Sports")
    const { getSport, SportsInfo, updateSport, delSport, addSport, } = props
    // 保存模态框中 表单值的状态
    const [formDate] = useState({ studentId: "", name: "", score1: "", score2: "", score3: "", score4:""})
    const [formSports] = useState({_id:"", studentId: "",  score1: "", score2: "", score3: "", score4: "" })
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

            getSport()
    }, [getSport])
    const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
        confirm();
        setSeacrchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    },[]);

    const handleReset = useCallback(clearFilters => {
        clearFilters();
        setSeacrchText('')
        
    },[]);

    // 获取Modal中 表单的值 
    const handleUpdateOk = useCallback(() => {
        formDate.studentId = formDate.studentId.state.value
        formDate.name = formDate.name.state.value
        formDate.score1 = formDate.score1.state.value
        formDate.score2 = formDate.score2.state.value
        formDate.score3 = formDate.score3.state.value
        formDate.score4 = formDate.score4.state.value

        updateSport(formDate)
        Modal.destroyAll()
    }, [updateSport, formDate])
    const handleAddOk = useCallback(() => {
        formSports._id = formSports._id.state.value
        formSports.studentId = formSports.studentId.state.value
        formSports.score1 = formSports.score1.state.value
        formSports.score2 = formSports.score2.state.value
        formSports.score3 = formSports.score3.state.value
        formSports.score4 = formSports.score4.state.value
        console.log(formSports)
        addSport(formSports)
        Modal.destroyAll()
    }, [addSport, formSports])

    const handleDelete = useCallback((key) => {
        console.log(key)
        delSport(key)

    }, [delSport])
    const handleAdd = useCallback((key) => {
        const form = (
            <Form  >
                <Form.Item >
                    <Input addonBefore="编号" ref={(input) => formSports._id = input} />
                </Form.Item>
                <Form.Item >
                    <Input  addonBefore="学工号" ref={(input) => formSports.studentId = input}  />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="第一季度" ref={(input) => formSports.score1 = input}  />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="第二季度" ref={(input) => formSports.score2 = input}  />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="第三季度" ref={(input) => formSports.score3 = input}  />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="第四季度" ref={(input) => formSports.score4 = input}  />
                </Form.Item>
            </Form>
        )
        Modal.confirm({
            title: '添加体育成绩',
            content: form,
            onOk: handleAddOk,
        })

    }, [formSports, handleAddOk])
    const handleUpdate = useCallback((key) => {
    
        const form = (
            
            <Form  >
                <Form.Item >
                    <Input disabled addonBefore="学工号" ref={(input) => formDate.studentId= input} defaultValue={key.studentId}/>
                </Form.Item>
                <Form.Item >
                    <Input disabled addonBefore="姓名" ref={(input) => formDate.name = input} defaultValue={key.user[0].name} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="第一季度" ref={(input) => formDate.score1 = input} defaultValue={key.score1} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="第二季度" ref={(input) => formDate.score2 = input} defaultValue={key.score2} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="第三季度" ref={(input) => formDate.score3 = input} defaultValue={key.score3} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="第四季度" ref={(input) => formDate.score4 = input} defaultValue={key.score4} />
                </Form.Item>
            </Form>
        )
        Modal.confirm({
            title: '修改体育成绩',
            content: form ,
            onOk: handleUpdateOk,
        },)
    }, [handleUpdateOk, formDate])

    const columns = [
        {
            title: '编号',
            dataIndex: '_id',
            key: '_id',    
            // ...getColumnSearchProps("_id"),
        },
        {
            title: '姓名',
            dataIndex: 'user[0].name',
            key: 'user[0].name',
            ...getColumnSearchProps("studentId"),
            render: (text, record)=>{
                return  record.studentId+'-' +text 
            }
        },
        {
            title: '第一季度',
            dataIndex: 'score1',
            key: 'score1',
            
        },
        {
            title: '第二季度',
            dataIndex: 'score2',
            key: 'score2',
        },
        {
            title: '第三季度',
            dataIndex: 'score3',
            key: 'score3',
        },
        {
            title: '第四季度',
            dataIndex: 'score4',
            key: 'score4',
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '总分',
            dataIndex: 'sum',
            key: 'sum',
            sorter: (a, b) => {
                return a.sum-b.sum
            },
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
                dataSource={SportsInfo}
                rowKey={record => record._id}  
                size="small" tableLayout="fixed" 
                pagination={{ pageSize: 100 }}
                scroll={{ y: 370 }} 
            />
            <Button type="primary" onClick={()=>{handleAdd()}} style={{position:"absolute",bottom:70,left:250}}>添加</Button>

            
        </>
    )
}
function mapStateToProps(state) {
    
    return {SportsInfo:state.SportsInfo.toJS()}
}
function mapDispatchToProps(dispatch) {
     return {
         getSport(){dispatch(getSports())},
         updateSport(sport) { dispatch(modifySports(sport))},
         delSport(sport) { dispatch(deleteSports(sport))},
         addSport(sport) { dispatch(addSports(sport))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(Sports,isEmpty))