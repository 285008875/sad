import React, { useState, memo } from 'react'
import { Layout, Icon } from 'antd';
import { connect } from 'react-redux';

import TopHeader from '../components/Header';
import IFooter from '../components/Footer';
import NavLink from '../components/LeftMenu';

const { Header, Sider, Footer, Content } = Layout;
function areEqual(prevProps, nextProps) {

}
const Index = (props) => {
    // console.log(props)
    const { roleId, ...restUserInfo } = props.data
    const user = Object.assign(restUserInfo, {roleName:roleId.roleName}) 
    // console.log(user)
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed)
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} className="NavLink">
                <NavLink Privileges={roleId.privilege} />
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={() => { toggle() }}
                    />
                    <TopHeader {...user} />
                </Header>
                <Content
                    style={{
                        margin: '10px 10px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
                <Footer>
                    <IFooter />
                </Footer>
            </Layout>
        </Layout>

    )
}
function mapStateToProps(state) {
    
    return {
        data: state.UserInfo.toJS()
    }

}
export default connect(mapStateToProps, null)(memo(Index, areEqual))
































































