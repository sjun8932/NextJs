export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '상준',
        },
        content: '상준님의 첫번째 익스프레스',
        Images: [{
            src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/137995585.jpg?update=20180726',
        },{
            src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },{
            src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
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
    postAdded: false,
}

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
}
const dummyPost = {
    id: 2,
    content: '더미데이터 입니다.',
    User: {
        id: 1,
        nickname: '준',
    },
    Images: [],
    Comments: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            }
        default:
            return state;
    }
};

export default reducer;