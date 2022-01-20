import axios from "axios";
import { put, takeLatest, all, fork, delay, throttle, call} from "redux-saga/effects";
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST,
} from "../reducers/post";
import {generateDummyPost} from "../reducers/post";
import shortId from "shortid";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";

function loadPostsAPI(data) {
    return axios.get('/api/post' , data);
}

function* loadPosts(action) {
    try {
        //const result = yield call(loadPostsAPI, action.lastId);
        yield delay(1500);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummyPost(10),
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data,
        });
    }
}

function addPostAPI(data){
    return axios.post('/post',{content: data})
}

function* addPost(action) {
    try{
        const result = yield call(addPostAPI, action.data);

        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        });
    } catch(err){
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function removePostAPI(data){
    return axios.delete('/api/post',data)
}

function* removePost(action) {
    try{
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data
        });
    } catch(err){
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function addCommentAPI(data){
    return axios.post(`/api/post/${data.postId}/comment`,data);
}

function* addComment(action) {
    try{
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data
        });
    } catch(err){
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchLoadPosts() {
    yield throttle(1000,LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST,addPost);
}

function* watchRemovePost() {
    yield  takeLatest(REMOVE_POST_REQUEST,removePost);
}

function* watchAddCommentPost() {
    yield takeLatest(ADD_COMMENT_REQUEST,addComment);
}



export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchRemovePost),
        fork(watchAddCommentPost),
    ]);
}
