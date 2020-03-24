import React, { memo } from 'react';

import { Icon, Input, Button, Menu, Dropdown, Avatar } from 'antd';
const { Search } = Input;



const Header = (props) => {

    console.log("Header")

    const { roleName, name } = props

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
                                {name}
                            </Button>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}


export default memo(Header)
