import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import {
  Form,
  Input,
  Button,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
    const dispatch = useDispatch();
    return (

        <Formik
        initialValues={{
            email: '',
            lastName: '',
            name: '',
            password: '',
            confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
            name: Yup.string()
                .required('이름은 필수값 입니다.'),
            email: Yup.string()
                .email('이메일 형식이 맞지 않습니다.')
                .required('이메일은 필수값 입니다.'),
            password: Yup.string()
                .min(4, '비밀번호는 최소 4자리 입니다.')
                .required('비밀번호는 필수값 입니다.'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], '비밀번호가 다릅니다.')
                .required('비밀번호 확인은 필수값 입니다.')
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {

            let dataToSubmit = {
                email: values.email,
                password: values.password,
                name: values.name,
                image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
            };

            // 여기서 dispatch => Action(user_action.js) => Reducer(user_reducer.js) => Store => 여기
            dispatch(registerUser(dataToSubmit)).then(response => {
                if (response.payload.success) { /* response : type, payload */
                    props.history.push("/login");
                } else {
                    alert('회원가입 실패')
                    console.log(response.payload)
                }
            })

            setSubmitting(false);
            }, 500);
        }}
        >
        {props => {
            const {
            values,
            touched,
            errors,
            // dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            // handleReset,
            } = props;
            return (
            <div className="app">
                <h2>회원가입</h2>
                <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

                <Form.Item required label="이름">
                    <Input
                        id="name"
                        placeholder="이름"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.name && touched.name ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                    )}
                </Form.Item>

                <Form.Item required label="이메일" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                    <Input
                        id="email"
                        placeholder="email@domain.com"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.email && touched.email ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                    )}
                </Form.Item>

                <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                    <Input
                        id="password"
                        placeholder="비밀번호"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.password && touched.password ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
                </Form.Item>

                <Form.Item required label="비밀번호 확인" hasFeedback>
                    <Input
                        id="confirmPassword"
                        placeholder="비밀번호 확인"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                        <div className="input-feedback">{errors.confirmPassword}</div>
                    )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                        가입
                    </Button>
                </Form.Item>
                </Form>
            </div>
            );
        }}
        </Formik>
    );
};


export default RegisterPage
