import React, {useCallback, useState} from 'react';
import AppLayout from "../components/AppLayout";
import Head from 'next/head'
import {Checkbox, Form, Input, Button} from 'antd'
import useInput from "../hooks/useInput";
import styled from 'styled-components';

const ErrorMessage = styled.div`
    color:red;
`

const Signup = () => {

    const [ id , onChangeId ] = useInput('');
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
        console.log( id , password , nickname );
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
                        <label htmlFor="user-id">아이디</label>
                        <br/>
                        <Input name="user-nick" value={id} required onChange={onChangeId}/>
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
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
}

export default Signup;