import React, { useEffect, memo, useState, useCallback, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { Table, Modal, Button, Input, Icon, Form, Popconfirm, Message, Upload} from 'antd';
import { connect } from 'react-redux'
import axios from '../../axios.config'
import { getGrades, modifyGrades, deleteGrades} from './store/actionCreator';


const Transcript = memo((props) => {
    console.log('Transcript')
    const { getGrade, modifyGrade, GradeInfo, deleteGrade} = props
    const [formDate, setFormDate] = useState({ _id: "", score:0,semester:'' })
    const [formGrade] = useState({  })
    const [searchText, setSeacrchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    let searchInput = useRef()
    // 处理表格 排序筛选
    useEffect(() => {
        getGrade()
    }, [])
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
            const filter = dataIndex.split('.')
            // console.log(filter)
            if (filter.length>=2) {
                return record[filter[0]][filter[1]]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
            }else{
                return record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
            }
          
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
    const columns = [
        {
            title: '编号',
            dataIndex: '_id',
            key:"_id",
            // onFilter: (value, record) => record.name.indexOf(value) === 0,
            
        },
        {
            title: '学生',
            dataIndex: 'studentId._id',
            key: 'studentId._id',
            sorter: (a, b) =>{
                return a.studentId._id-b.studentId._id
            },
            ...getColumnSearchProps('studentId._id'),
            render: (text, record, index)=>{
                // console.log(text, record, index)
                if (record.studentId!=null) {
                    return record.studentId._id +'-'+ record.studentId.name
                    
                }else{
                    return null
                }

            }
        },
        {
            title: '课程',
            dataIndex: 'courseId._id',
            key: "courseId._id",
            sorter: (a, b) => {
                // console.log( a.courseId._id,b)
                return a.courseId._id - b.courseId._id
                
            },
            ...getColumnSearchProps('courseId._id'),
            render: (text, record, index) => {
                // console.log(text, record, index)
                if (record.courseId != null) {
                    return record.courseId._id + '-' + record.courseId.courseName
                }else{
                    return null
                }
             },
        },
        {
            title: '分数',
            dataIndex: 'score',
            key: "score",
            sorter: (a, b) => {
                // console.log(a,b)
                return a.score-b.score
            },
        },
        {
            title: '学期',
            dataIndex: 'semester',
            key: "semester",
            ...getColumnSearchProps('semester'),
        },
        {
            title: '操作',
            render: (text, record, index) => {
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
        }
    ];
    const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
        confirm();
        setSeacrchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }, []);

    const handleReset = useCallback(clearFilters => {
        clearFilters();
        setSeacrchText('')

    }, []);
    const handleUpdate = useCallback((key) => {

        const form = (

            <Form  >
                <Form.Item >
                    <Input disabled addonBefore="编号" ref={(input) => formDate._id = input} defaultValue={key._id} />
                </Form.Item>
                <Form.Item >
                    <Input  disabled addonBefore="学生编号"  defaultValue={key.studentId._id} />
                </Form.Item>
                <Form.Item >
                    <Input disabled addonBefore="学生姓名" defaultValue={key.studentId.name} />
                </Form.Item>
                <Form.Item >
                    <Input disabled addonBefore="课程号"  defaultValue={key.courseId._id} />
                </Form.Item>
                <Form.Item >
                    <Input disabled addonBefore="课程名"  defaultValue={key.courseId.courseName} />
                </Form.Item>
                <Form.Item >
                    <Input  addonBefore="分数" ref={(input) => formDate.score = input} defaultValue={key.score} />
                </Form.Item>
                <Form.Item >
                    <Input addonBefore="学期" ref={(input) => formDate.semester = input} defaultValue={key.semester} />
                </Form.Item>

            </Form>
        )
        Modal.confirm({
            title: '修改学生成绩信息',
            content: form,
            onOk: handleUpdateOk,
        })
    }, [])
    const handleUpdateOk = useCallback(() => {
        
        formDate._id =  formDate._id.state.value
        formDate.score =  formDate.score.state.value
        formDate.semester =  formDate.semester.state.value
        // console.log(formDate)
        modifyGrade(formDate)

    }, [ ])
    const handleAddOk = useCallback(() => {

    }, [])

    const handleDelete = useCallback((key) => {
        console.log(key)
        deleteGrade(key)

    }, [])
    // const handleFileDownload = useCallback(() => {

    //     fetch('./filedownload', {
    //         method: 'GET',
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('token')
    //         }
    //     }).then(res => res.blob().then(blob => {
    //         var filename = 'grade.xlsx'

    //         var a = document.createElement('a');
    //         document.body.appendChild(a) //兼容火狐，将a标签添加到body当中
    //         var url = window.URL.createObjectURL(blob);   // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
    //         a.href = url;
    //         a.download = filename;
    //         a.target = '_blank'  // a标签增加target属性
    //         a.click();
    //         a.remove()  //移除a标签
    //         window.URL.revokeObjectURL(url);

    //     }))

    // }, [])
    const UploadProps = {
        action: './fileupload',
        method: 'post',
        accept: '.xlsx, .xml, .xls',
        listType: 'xlsx',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        name: "GradeFile",
        onChange(info) {
            if (info.file.status === 'done') {
                console.log(info)
                const { code, succeed } = info.file.response
                if (code === 200 && succeed === 1) {
                    // addStudentMany(result)
                    getGrade()
                }
                Message.success(`${info.file.name} 文件上传成功`);
            } else if (info.file.status === 'error') {
                Message.error(`${info.file.name}文件上传失败.`);
            }
        },
    };
    return (
        <>
            <Table 
                columns={columns}  
                dataSource={GradeInfo}
                rowKey={record => record._id}
                size="small"
                bordered
                tableLayout="fixed"
                pagination={{ pageSize: 100 }}
                scroll={{ y: 370 }} 
            />
            <Upload {...UploadProps}>
                <Button type="primary" style={{ position: "absolute", bottom: 70, left: 250 }}>
                    <Icon type="upload" /> 上传学生成绩
                </Button>
            </Upload>
            {/* <Button type="primary" icon="download" onClick={() => { handleFileDownload() }} style={{ position: "absolute", bottom: 70, left: 400 }}>导出学生成绩</Button> */}
        </>
    )
})
function mapStateToProps(state) {

    return { GradeInfo: state.GradeInfo.toJS() }
}
function mapDispatchToProps(dispatch) {
    return {
        getGrade() { dispatch(getGrades()) },
        modifyGrade(grade) { dispatch(modifyGrades(grade)) },
        deleteGrade(grade) { dispatch(deleteGrades(grade)) },
        // addCourses(course) { dispatch(addCourses(course)) },
    }
}
function isEmpty(){
    return 
}
export default connect(mapStateToProps, mapDispatchToProps)((Transcript))