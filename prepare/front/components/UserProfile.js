import React, {useCallback} from 'react';
import {Avatar, Card, Button} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import { logoutRequestAction } from "../reducers/user";

const UserProfile = ( ) => {

    const dispatch = useDispatch();
    const { me , logoutLoading } = useSelector((state) => state.user);

    const onLogOut = useCallback(()=>{
        dispatch(logoutRequestAction());
    },[])

    return (
        <Card
            actions={[
                <div key="twit">ㅎㅎ<br/>{me.Posts.length}</div>,
                <div key="followings">ㅎㅎ<br/>{me.Followings.length}</div>,
                <div key="followers">ㅎㅎ<br/>{me.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogOut} loading={logoutLoading}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;