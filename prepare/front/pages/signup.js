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
                        ???????????? | ???????????? ????
                    </title>
                </Head>
                <Form onFinish={onsubmit}>
                    <div>
                        <label htmlFor="user-email">?????????</label>
                        <br/>
                        <Input name="user-email" type="email" value={email} required onChange={onChangeEmail}/>
                        <label htmlFor="user-nick">?????????</label>
                        <br/>
                        <Input name="user-password" value={nickname} required onChange={onChangeNickname}/>
                        <label htmlFor="user-password">????????????</label>
                        <br/>
                        <Input name="user-password-check" value={password} required onChange={onChangePassword}/>
                        <label htmlFor="user-password-check">???????????? ??????</label>
                        <br/>
                        <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                        {passwordError && <ErrorMessage>??????????????? ???????????? ????????????.</ErrorMessage>}
                    </div>
                    <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>??? ???????????? ????????? ????????? ????????? ??????. ?????????????????????????????????</Checkbox>
                        {termError && <ErrorMessage>????????? ?????? ?????? ??????</ErrorMessage>}
                    </div>
                    <div style={{ marginTop : 10 }}>
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>????????????</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
}

export default Signup;