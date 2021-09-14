import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Link from  'next/link';
import {Menu, Input, Row, Col} from 'antd';
import styled from 'styled-components';
import UserProfile from '../components/UserProfile';
import LoginForm from "../components/LoginForm";

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({children}) => {

    const [ isLoggedIn , setIsLoggedIn ] =  useState(false);

    return(
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="index">
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item key="search">
                    <SearchInput enterButton style={{ verticalAlign: "middle" }}/>
                </Menu.Item>
                <Menu.Item key="signup">
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>

            <Row gutter={8}>
                <Col xs={24} md={6} style={{backgroundColor:"purple"}}>
                    {isLoggedIn ? <UserProfile/> : <LoginForm/>}
                </Col>
                <Col xs={24} md={12} style={{backgroundColor:"yellow"}}>
                    {children}
                </Col>
                <Col xs={24} md={6} style={{backgroundColor:"skyblue"}}>
                    <a href="https://github.com/sjun8932/NextJs" target="_blank" rel="noopener noreferer">Jun's github🤣</a>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;