import React from 'react';
import AppLayout from "../components/AppLayout";
import Head from 'next/head'

const Profile = () => {

    return(
        <>
            <Head>
                <title>내 프로필 | 노드버드 😍</title>
            </Head>
            <AppLayout>내 프로필</AppLayout>
        </>

    )
}

export default Profile;