// import axios from 'axios';
import * as constants from './constants'
// import axios from '../../../axios.config'
// import { Row, Col, Form, Icon, Input, Button, message } from 'antd';

export const changeUserInfo = (payload) => ({
    type: constants.USERINFO,
    payload
})
