import React, { useEffect, memo, useState, useCallback, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { Table, Modal, Button, Input, Icon, Form, Popconfirm, Message, Upload } from 'antd';
import { connect } from 'react-redux'
import axios from '../../axios.config'
import { getGrades,} from './store/actionCreator';


const Transcript = memo((props) => {
    console.log('Transcript')
    const { getGrade, GradeInfo } = props
 
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
            if (filter.length >= 2) {
                return record[filter[0]][filter[1]]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
            } else {
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
            key: "_id",
            // onFilter: (value, record) => record.name.indexOf(value) === 0,

        },
        {
            title: '学生',
            dataIndex: 'studentId._id',
            key: 'studentId._id',
            sorter: (a, b) => {
                return a.studentId._id - b.studentId._id
            },
            ...getColumnSearchProps('studentId._id'),
            render: (text, record, index) => {
                // console.log(text, record, index)
                if (record.studentId != null) {
                    return record.studentId._id + '-' + record.studentId.name

                } else {
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
                } else {
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
                return a.score - b.score
            },
        },
        {
            title: '学期',
            dataIndex: 'semester',
            key: "semester",
            ...getColumnSearchProps('semester'),
        },
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


    return (
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
      
    )
})
function mapStateToProps(state) {

    return { GradeInfo: state.GradeInfo.toJS() }
}
function mapDispatchToProps(dispatch) {
    return {
        getGrade() { dispatch(getGrades()) },

    }
}
function isEmpty() {
    return
}
export default connect(mapStateToProps, mapDispatchToProps)((Transcript))