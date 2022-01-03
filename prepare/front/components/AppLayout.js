import React from 'react';
import PropTypes from 'prop-types';
import Link from  'next/link';
import {Menu, Input, Row, Col,} from 'antd';
import styled from 'styled-components';
import UserProfile from '../components/UserProfile';
import LoginForm from "../components/LoginForm";
import {useSelector} from "react-redux";
import { createGlobalStyle } from "styled-components";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
    .ant-row {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }
    
    .ant-col:first-child {
      padding-left: 0 !important;
    }
    
    .ant-col:last-child {
      padding-right: 0 !important;
    }
`;

const AppLayout = function APL({children}) {

    const {me} = useSelector((state)=>state.user);

    return(
        <div>
            <Global/>
            <Menu mode="horizontal">
                <Menu.Item key="index">
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item key="search">
                    <SearchInput enterButton/>
                </Menu.Item>
                <Menu.Item key="signup">
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>

            <Row gutter={8}>
                <Col xs={24} md={6} style={{backgroundColor:"#e3b9fe"}}>
                    {me ? <UserProfile/> : <LoginForm/>}
                </Col>
                <Col xs={24} md={12} style={{backgroundColor:"#997ADB"}}>
                    {children}
                </Col>
                <Col xs={24} md={6} style={{backgroundColor:"#4d0082"}}>
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