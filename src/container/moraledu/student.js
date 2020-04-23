import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Table, Modal, Button, Input, Icon, Form, Popconfirm, Upload, Message } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux'
import { getMoralEdu } from './store/actionCreator';
function isEmpty(preState, nextState) {


}

function MoralEdu(props) {
    console.log("MoralEdu")
    const { getMoralEdus, MoralEduInfo } = props
    // 保存模态框中 表单值的状态
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


        getMoralEdus()


        // 清除 searchInput
        return () => {
            searchInput = null
        }
    }, [getMoralEdus])
    const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
        confirm();
        setSeacrchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }, []);

    const handleReset = useCallback(clearFilters => {
        clearFilters();
        setSeacrchText('')

    }, []);
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
            render: (text, record) => {
                return record.studentId + '-' + text
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
                return a.sum - b.sum
            },
        },

    ];


    return (
        <>
            <Table
                columns={columns}
                dataSource={MoralEduInfo}
                rowKey={record => record._id}
                size="small" tableLayout="fixed"
                pagination={{ pageSize: 100 }}
                scroll={{ y: 370 }}
            />
          

        </>
    )
}
function mapStateToProps(state) {

    return { MoralEduInfo: state.MoralEduInfo.toJS() }
}
function mapDispatchToProps(dispatch) {
    return {
        getMoralEdus() { dispatch(getMoralEdu()) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(MoralEdu, isEmpty))