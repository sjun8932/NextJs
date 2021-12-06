import shortId from 'shortid'

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '상준',
        },
        content: '상준님의 첫번째 익스프레스 #해시태그 #익스프레스',
        Images: [{
            src: 'https://www.banksy.co.uk/img/birmingham2400a.jpg',
        },{
            src: 'https://www.banksy.co.uk/img/0718/04_napoleon_website_05.jpg',
        },{
            src: 'https://www.banksy.co.uk/img/outdoorimg/1-Z.Hyman.jpg',
        }],
        Comments: [{
            User: {
                nickname: 'jun',
            },
            content: '새로운 시작'
        },{
            User: {
                nickname: 'park'
            },
            content: '금요일 작성',
        }]
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone:false,
    addPostError:null,
    addCommentLoading: false,
    addCommentDone:false,
    addCommentError:null,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data
});

const dummyPost = (data) => ({
    id: shortId().generate(),
    content: data,
    User: {
        id: 1,
        nickname: '준',
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
    switch (action.type){
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost(action.data), ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
            }
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            }
        case ADD_COMMENT_SUCCESS:
        {
            const postIndex = state.mainPosts.findIndex((v)=>v.id === action.data.postId);
            const post = {...state.mainPosts[postIndex]};
            post.Comments = [dummyComment(action.data.content), ...post.Comments];
            const mainPosts =[...state.mainPosts];
            mainPosts[postIndex] = post;
            return {
                ...state,
                mainPosts,
                addCommentLoading: false,
                addCommentDone: true,
            }
        }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            }
        default:
            return state;
    }
};

export default reducer;