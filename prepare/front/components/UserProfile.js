import React, {useCallback} from 'react';
import {Avatar, Card, Button} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import { logoutRequestAction } from "../reducers/user";

const UserProfile = ( ) => {

    const dispatch = useDispatch();
    const { me , isLoggingOut } = useSelector((state) => state.user);

    const onLogOut = useCallback(()=>{
        dispatch(logoutRequestAction());
    },[])

    return (
        <Card
            actions={[
                <div key="twit">ㅎㅎ<br/>0</div>,
                <div key="followings">ㅎㅎ<br/>0</div>,
                <div key="followers">ㅎㅎ<br/>0</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogOut} loading={isLoggingOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;