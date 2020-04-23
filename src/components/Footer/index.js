import React from 'react';
import { Icon } from 'antd';

const Footer = (props) => {
    return (
        <>
            <footer className="footer">
                <div>
                    <span><a title="Ant Design Pro" href="https://pro.ant.design">Ant Design Pro</a></span>
                    <span>学生综合测评管理系统</span>

                </div>

                <div >Copyright  <Icon type="copyright" />2019 烟台大学文经学院体验技术部出品</div>
            </footer>
        </>
    )
}
export default Footer