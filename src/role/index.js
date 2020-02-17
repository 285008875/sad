import React, { useState } from 'react'
import { Layout, Icon } from 'antd';


import TopHeader from '../components/Header';
import IFooter from '../components/Footer';
import NavLink from '../components/LeftMenu';

const { Header, Sider, Footer, Content } = Layout;

const Index = (props) => {

    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed)
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} className="NavLink">
                <NavLink />
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={() => { toggle() }}
                    />
                    <TopHeader />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
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
export default Index;































































