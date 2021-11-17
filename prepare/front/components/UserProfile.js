import React, {useCallback} from 'react';
import {Avatar, Card, Button} from 'antd'
import {useDispatch} from "react-redux";
import { logoutAction } from "../reducers/user";

const UserProfile = ( ) => {

    const dispatch = useDispatch();

    const onLogOut = useCallback(()=>{
        dispatch(logoutAction());
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
                avatar={<Avatar>Jun</Avatar>}
                title="Jun"
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;