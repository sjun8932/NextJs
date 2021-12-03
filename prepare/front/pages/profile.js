import React from 'react';
import AppLayout from "../components/AppLayout";
import Head from 'next/head'
import NicknameEditForm from "../components/NicknameEditForm";
import FollowingList from '../components/FollowingList';
import FollowList from '../components/FollowList';
import {useSelector} from "react-redux";

const Profile = () => {

    const {me} = useSelector((state)=>state.user);

    return(
        <>
            <Head>
                <title>내 프로필 | 노드버드 😍</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowingList header="팔로잉" data={me.Followings}/>
                <FollowList header="팔로워" data={me.Followers}/>
            </AppLayout>
        </>

    )
}

export default Profile;