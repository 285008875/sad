import React,{memo,useEffect,useLayoutEffect,useState,useCallback} from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Button, Message, Divider, Tag  } from 'antd';
import axios from '../../axios.config';

const { Option } = Select;
const SetInfo =  (props)=> {
    const { getFieldDecorator, form} = props.form;
    const { UserInfo } = props
    const [confirmDirty, setConfirmDirty] = useState(false)
    const [clazz, setClazz] = useState([])
    const handleSubmitInfo = useCallback(e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            const user = Object.assign({ _id: UserInfo._id }, values)
            axios.post('updateuser').then((res)=>{
                const {code,succeed} = res.data;
                if (code = 200&&succeed===1) {
                    Message.succeed('修改成功')
                }
            })
        });
    },[]);
    useLayoutEffect(()=>{
        
        axios.get('./classname').then((res)=>{
            const {succeed,code,result } = res.data
            if(succeed===1&&code===200){
                setClazz(result)
            }
        })
    },[])
    const handleConfirmBlur = useCallback(e => {
        const { value } = e.target;
        console.log(value)
        setConfirmDirty(confirmDirty || !!value)
    },[]);

    const compareToFirstPassword = useCallback((rule, value, callback) => {
        console.log(value ,form.getFieldValue('password'))
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    },[]);

    const validateToNextPassword = useCallback((rule, value, callback) => {
        console.log(value ,confirmDirty)
        if (value && confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    },[]);
    
        return (
            <>  
                <Divider orientation="left"><Tag color="#2db7f5">修改个人信息</Tag></Divider>
                <Form layout="inline" onSubmit={(e) => { handleSubmitInfo(e)}}>
                    <Form.Item label="姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '姓名不能为空!' }],
                        })(<Input style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item label="手机号码">
                        {getFieldDecorator('tel', {
                            rules: [{ required: true, message: '手机号不能为空!' }],
                        })(<Input style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item label="班级">
                        {getFieldDecorator('classId',{
                            rules: [{ required: true, message: '手机号不能为空!' }]
                        })(
                            <Select
                                showSearch
                                style={{ width: 250 }}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    clazz.map((item) => {
                                        return (
                                            <Option key={item._id} value={item._id}>{item.className}</Option>
                                        )
                                    })
                                }

                            </Select>
                        )

                        }
                        
                    </Form.Item>
                    
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: '邮箱格式有误!',
                                },
                                {
                                    required: true,
                                    message: '邮箱不能为空',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="性别">
                        {getFieldDecorator('sex', {
                            rules: [
                                {
                                    required: true,
                                    message: '不能为空',
                                },
                            ],
                        })(
                            <Select
                                style={{ width: 200 }}
                            >
                                <Option value='男'>男</Option>
                                <Option  value='女'>女</Option>
                                        
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </>
        );
}
const WrappedForm = Form.create({ })(SetInfo);
function mapStateToProps(state) {

    return { UserInfo: state.UserInfo.toJS() }
}

export default connect(mapStateToProps, null)(memo(WrappedForm))