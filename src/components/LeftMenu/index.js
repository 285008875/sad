import React, { memo } from 'react'
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function areEqual(prevProps, nextProps) {
    // console.log(prevProps, nextProps)
    // JSON.stringify(prevProps) === JSON.stringify(nextProps)
    // console.log(prevProps.privilegeID === nextProps.privilegeID)
    if (prevProps.privilegeID === nextProps.privilegeID) {
        return true
    } else {
        return false
    }

}
const MenuItem = memo((props) => {
    console.log("MenuItem")
    const { privilegeID, privilegeURL, privilegeName, icon, ...rest } = props
    // console.log(props)
    return (
        <Menu.Item {...rest}>
            <NavLink to={privilegeURL}>

                <Icon type={icon} />
                <span  >{privilegeName}</span>
            </NavLink>
        </Menu.Item>
    )
}, areEqual)
const LeftMenu = (props) => {
    console.log("LeftMenu");
    const { Privileges } = props.user;
    return (
        <>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                {
                    Privileges && Privileges.map((item, index) => {

                        return <MenuItem key={item.privilegeID} {...item} />
                    })
                }
            </Menu>
        </>

    );
}
function mapStateToProps(state) {
    // console.log(state.userInfo.Role);
    return { user: state.userInfo.Role }
}
export default connect(mapStateToProps, null)(memo(LeftMenu, areEqual))
