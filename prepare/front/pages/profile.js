import React from 'react';
import AppLayout from "../components/AppLayout";
import Head from 'next/head'
import NicknameEditForm from "../components/NicknameEditForm";
import FollowingList from '../components/FollowingList';
import FollowList from '../components/FollowList';

const followingList = [{nickName: "제이"},{nickname: "윤"},{nickname: "세은"}]

const followerList = [{nickname: "시은"},{nickname: "아이사"},{nickname: "수민"}]

const Profile = () => {

    return(
        <>
            <Head>
                <title>내 프로필 | 노드버드 😍</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowingList header="팔로잉 목록" data={followingList}/>
                <FollowList header="팔로워 목록" data={followerList}/>
            </AppLayout>
        </>

    )
}

export default Profile;