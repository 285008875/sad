import React, { useEffect, memo, useState, useCallback, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { Table, Button, Input, Icon } from 'antd';
import { connect } from 'react-redux'
import { getGrades } from './store/actionCreator';

const AllGrade = memo((props) => {
    const { getGrade, GradeSource } = props
    const [searchText, setSeacrchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    let searchInput = useRef()
    useEffect(() => {

        getGrade()
    }, [])
    const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
        confirm();
        setSeacrchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }, []);

    const handleReset = useCallback(clearFilters => {
        clearFilters();
        setSeacrchText('')

    }, []);
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
            title: '学号',
            dataIndex: '_id',
            key: "_id",
            ...getColumnSearchProps('_id')

        },
        {
            title: '姓名',
            dataIndex: 'user[0].name',
            key: 'user[0].name',
            // ...getColumnSearchProps('studentId._id'),
            render: (text, record, index) => {
                // console.log( text)
                // console.log(record.user)
                // const temp = text.shift()
                // console.log(temp)
                return text
            }
        },
        {
            title: '智育总分',
            dataIndex: 'intellectualSum',
            key: "intellectualSum",
            // ...getColumnSearchProps('courseId._id'),
            render: (text, record, index) => {
                return text
            },
        },
        {
            title: '智育均分',
            dataIndex: 'intellectualAvg',
            key: "intellectualAvg",

        },
        {
            title: '德育总分',
            dataIndex: 'moralEduSum',
            key: "moralEduSum",
            render: (text, record, index) => {
                return text ? text : 0
            },

        },
        {
            title: '德育均分',
            dataIndex: 'moralEduAvg',
            key: "moralEduAvg",
            render: (text, record, index) => {
                return text ? text : 0
            },

        },
        {
            title: '体育总分',
            dataIndex: 'SportSum',
            key: "SportSum",
            render: (text, record, index) => {
                return text ? text : 0
            },
        },
        {
            title: '体育均分',
            dataIndex: 'SportAvg',
            key: "SportAvg",
            render: (text, record, index) => {
                return text ? text : 0
            },


        },
        {
            title: '总分',
            dataIndex: 'Sum',
            key: "Sum",
            render: (text, record, index) => {
                return text ? text : 0
            },
            sorter: (a, b) => {

                return a.Sum - b.Sum
            },

        },
        {
            title: '均分',
            dataIndex: 'Avg',
            key: "Avg",

        },
        {
            title: '时间',
            dataIndex: 'time',
            key: "time",
            render: (text, record, index) => {
                return text ? text : (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1)
            },

        },
    ]
    return (
        <Table
            columns={columns}
            dataSource={GradeSource}
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

    return {
        GradeSource: state.TGradeInfo.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getGrade() { dispatch(getGrades()) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllGrade)