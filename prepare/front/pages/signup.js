import React, {useCallback, useEffect, useState} from 'react';
import Router from 'next/router';
import AppLayout from "../components/AppLayout";
import Head from 'next/head'
import {Checkbox, Form, Input, Button} from 'antd'
import useInput from "../hooks/useInput";
import styled from 'styled-components';
import {SIGN_UP_REQUEST} from "../reducers/user";
import {useDispatch, useSelector} from "react-redux";

const ErrorMessage = styled.div`
    color:red;
`

const Signup = () => {

    const dispatch = useDispatch();
    const {signUpLoading, signUpDone, signUpError, me} = useSelector((state)=>state.user);

    useEffect(()=>{
        if (me && me.id){
            Router.replace('/');
        }
    },[me && me.id]);

    useEffect(()=>{
        if(signUpDone){
            Router.replace('/');
        }
    },[signUpDone])

    useEffect(()=>{
        if(signUpError){
            alert(signUpError);
        }
    },[signUpError])

    const [ email , onChangeEmail ] = useInput('');
    const [ nickname , onChangeNickname ] = useInput('');

    const [ password , onChangePassword ] = useInput('');
    const [ passwordCheck , setPasswordCheck ] = useState('');
    const [ passwordError , setPasswordError ] = useState(false);

    const onChangePasswordCheck  = useCallback((e)=>{
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    },[password]);

    const [ term , setTerm ] = useState('');
    const [ termError , setTermError ] = useState('');

    const onChangeTerm = useCallback((e)=>{
        setTerm(e.target.checked);
        setTermError(false);
    },[])

    const onsubmit = useCallback(()=>{
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if(!term) {
            return setTermError(true);
        }
        console.log( email , password , nickname );
        dispatch({
            type:SIGN_UP_REQUEST,
            data:{email,password,nickname}
        })
    },[ password, passwordCheck, term ]);

    return (
        <>
            <AppLayout>
                <Head>
                    <title>
                        회원가입 | 노드버드 😊
                    </title>
                </Head>
                <Form onFinish={onsubmit}>
                    <div>
                        <label htmlFor="user-email">이메일</label>
                        <br/>
                        <Input name="user-email" type="email" value={email} required onChange={onChangeEmail}/>
                        <label htmlFor="user-nick">닉네임</label>
                        <br/>
                        <Input name="user-password" value={nickname} required onChange={onChangeNickname}/>
                        <label htmlFor="user-password">패스워드</label>
                        <br/>
                        <Input name="user-password-check" value={password} required onChange={onChangePassword}/>
                        <label htmlFor="user-password-check">비밀번호 체크</label>
                        <br/>
                        <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                        {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    </div>
                    <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>이 사이트의 약관은 오로지 나한테 있다. 🐱‍🚀🐱‍🚀🐱‍🚀</Checkbox>
                        {termError && <ErrorMessage>약관에 동의 처리 해라</ErrorMessage>}
                    </div>
                    <div style={{ marginTop : 10 }}>
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
}

export default Signup;