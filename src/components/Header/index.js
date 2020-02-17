import React, { memo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Input, Badge, Button, Menu, Dropdown, Avatar } from 'antd';
const { Search } = Input;
const getUserName = (name) => {
    switch (name) {
        case 'student':
            return 'studentName';
        case 'monitor':

            return 'studentName';
        case 'header':
            return 'teacherName';
        case 'teacher':
            return 'teacherName';
        case 'teacher':
            return 'teacherName';
        default:
            break;
    }

}


const Header = (props) => {

    console.log("Header")

    const { roleName } = props

    const UserMenu = (
        <Menu>
            <Menu.Item>
                <a href={roleName + "/user"}>
                    <Icon type="user" /> 个人中心
                 </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <a href={roleName + "/setting"}>
                    <Icon type="setting" /> 个人设置
                </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <a href="logout">
                    <Icon type="poweroff" /> 退出登录
             </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <div className="components-header">
                <div className="components-header-search">
                    <Search placeholder="Search" onSearch={value => console.log(value)} enterButton />
                </div>

                <div className="components-header-userinfo">
                    <Dropdown overlay={UserMenu}>
                        <div>
                            <Avatar icon="user" style={{ backgroundColor: '#87d068' }} >

                            </Avatar>
                            <Button
                                size="small"
                                shape="circle"
                                type="primary"
                                style={{ marginLeft: "0.3em", verticalAlign: 'middle' }}

                            >
                                {roleName === "student" || "monitor" ? props.user.studentName : props.user.teacherName}
                            </Button>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    // console.log(state);
    return {
        roleName: state.userInfo.Role.roleName,
        user: state.userInfo
    }
}
export default connect(mapStateToProps, null)(memo(Header))
