import React, { memo } from 'react'
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
function isEqual(preState,nextState){
    return true
    
}
    
const LeftMenu = (props) => {

    console.log("LeftMenu")
    const { Privileges } = props;
    return (
        <>
            <div className="logo" />
            <Menu theme="dark" mode="inline" >
                {
                    Privileges && Privileges.map((item, index) => {
                        
                            return < Menu.Item key={index}>
                                <NavLink to={item.privilegeURL}>

                                    <Icon type={item.icon} />
                                    <span  >{item.privilegeName}</span>
                                </NavLink>
                            </Menu.Item>
                        
                    })
                }
            </Menu>
        </>

    );
}


export default memo(LeftMenu,isEqual)
