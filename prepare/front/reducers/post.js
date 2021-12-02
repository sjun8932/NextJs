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