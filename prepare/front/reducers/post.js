import shortId from 'shortid'
import produce from 'immer';

export const initialState = {
    mainPosts: [{
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: '상준',
        },
        content: '상준님의 첫번째 익스프레스 #해시태그 #익스프레스',
        Images: [{
            id: shortId.generate(),
            src: 'https://www.banksy.co.uk/img/birmingham2400a.jpg',
        },{
            id: shortId.generate(),
            src: 'https://www.banksy.co.uk/img/0718/04_napoleon_website_05.jpg',
        },{
            id: shortId.generate(),
            src: 'https://www.banksy.co.uk/img/outdoorimg/1-Z.Hyman.jpg',
        }],
        Comments: [{
            id: shortId.generate(),
            User: {
                id: 1,
                nickname: 'jun',
            },
            content: '새로운 시작'
        },{
            id: shortId.generate(),
            User: {
                id: 1,
                nickname: 'park'
            },
            content: '금요일 작성',
        }]
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone:false,
    addPostError:null,
    removePostLoading: false,
    removePostDone:false,
    removePostError:null,
    addCommentLoading: false,
    addCommentDone:false,
    addCommentError:null,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const dummyPost = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'SANGJUN',
    },
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'SANGJUN',
    },
});

const reducer = (state = initialState, action) => {

    return produce (state, (draft) => {
        switch (action.type){
            case ADD_POST_REQUEST:
                draft.addPostLoading=true;
                draft.addPostDone=false;
                draft.addPostError=null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(dummyPost(action.data));
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = true;
                draft.addPostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v)=>v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
            {
                const post = draft.mainPosts.find((v)=>v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;

            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            default:
                break;
        }
    });


};

export default reducer;