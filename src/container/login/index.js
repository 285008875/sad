import React, {
    Component
} from 'react'
import {
    Row,
    Col,
    Form,
    Icon,
    Input,
    Button,
    message
} from 'antd';
import {
    connect
} from 'react-redux';
// import { connect } from 'react-redux';
import axios from '../../axios.config'
import md5 from 'md5';
import Logo from '../../components/Logo/'
import Footer from '../../components/Footer/'
import {
    actionCreators
} from "./store/index";
import '../../index.css'
// window.$axios = axios
class LoginForm extends Component {



    handleSubmit = e => {
        e.preventDefault();

        const {
            validateFields
        } = this.props.form
        validateFields((err, values) => {
            if (!err) {
                message.loading({
                    content: '登录中...',
                    duration: 1
                });
                values.password = md5(values.password);
                axios.post('/login', values).then((res) => {
                    const { data, token, code, msg, succeed } = res.data;
                    if (code === 200 && succeed === 1) {
                        //jwt 将后端token存入localstorage
                        localStorage.setItem('token', token);
                        localStorage.setItem('token_exp', new Date().getTime());
                        this.props.setUserInfo(data)
                        message.success({
                            content: msg
                        });
                        this.props.history.push('./' + data.roleId.roleName)
                    } else {
                        message.warn({
                            content: msg
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                    message.warn({
                        content: '请求失败'
                    });
                })
            } else {
                message.warn({
                    content: '账号密码按照规定填写'
                });
            }
        });
    }
    render() {

        const {
            getFieldDecorator
        } = this.props.form
        return (<>
            <Row
                align={'top'}
                justify={'center'}
                className="bg-image" >
                <Col span={8} offset={8} >
                    <header className="header" >
                        <Logo />
                    </header>
                    <section >
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form"
                            layout='horizontal' >
                            <Form.Item > {
                                getFieldDecorator('username', {
                                    rules: [{
                                        required: true,
                                        message: '请输入账号!'
                                    }, {
                                        min: 4,
                                        message: '账号最少4位!'
                                    }, {
                                        pattern: "^[0-9]*$",
                                        message: "必须为数字!"
                                    }],
                                })(< Input prefix={
                                    < Icon type="user"
                                        style={
                                            {
                                                color: 'rgba(0,0,0,1)'
                                            }
                                        }
                                    />}
                                    placeholder="账号" /
                                >)
                            } <
                    /Form.Item> <
                    Form.Item > {
                                        getFieldDecorator("password", {
                                            rules: [{
                                                required: true,
                                                message: '请输入密码!'
                                            }, {
                                                min: 8,
                                                message: '最少8位!'
                                            }],
                                        })(<
                                            Input.Password prefix={
                                                < Icon type="lock"
                                                    style={
                                                        {
                                                            color: 'rgba(0,0,0,1)'
                                                        }
                                                    }
                                                />}
                                            type="password"
                                            placeholder="密码" /
                                        >
                                        )
                                    } <
                        /Form.Item> <
                        Form.Item >
                                        <
                        a className="login-form-forgot"
                                            href="./forgot" > 忘记密码 < /a> <
                        Button type="primary"
                                                htmlType="submit"
                                                className="login-form-button"
                                                size="large"
                                                block > Log in < /Button> <
                        /Form.Item> <
                        /Form> <
                        /section> <
                                                    Footer />
                                                <
                        /Col> <
                        /Row> <
                        />
                    )

                }
            }
            LoginForm = Form.create({})(LoginForm)

            function mapDispatchToProps(dispatch) {
                return {
                                                    setUserInfo(user) {
                                                    dispatch(actionCreators.changeUserInfo(user))
                                                }
                }
            }
            export default connect(null, mapDispatchToProps)(LoginForm)