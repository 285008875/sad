import React from 'react'
import { Row, Col, Form, Icon, Input, Button, } from 'antd';
import Logo from '../../components/Logo/'
import Footer from '../../components/Footer/'
const Forget = (props) => {
    return (
        <>
            <Row align={'top'} justify={'center'} className="bg-image">
                <Col span={8} offset={8} >
                    <header className="header">
                        <Logo />
                    </header>
                    <section>
                        <Form className="login-form" layout='horizontal'>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,1)' }} />}
                                    placeholder="账号"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,1)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />

                            </Form.Item>
                            <Form.Item>
                                <a className="login-form-forgot" href="./forgot">忘记密码</a>
                                <Button type="primary" htmlType="submit" className="login-form-button" size="large" block>Log in</Button>
                            </Form.Item>



                        </Form>
                    </section>
                    <Footer />




                </Col>
            </Row>
        </>
    )
}
export default Forget;