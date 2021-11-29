export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '상준',
        },
        content: '상준님의 첫번째 익스프레스',
        Images: [{
            src: 'https://w.namu.la/s/f628b1c0a88aef60d88b6b6f28e68b1caf218c71266efdab326a949d0de83b8d08cf148c8912da21e414be0982bc52d0b7eb4bcd13b954ce643584a4dc34045400f97a1b1b26869a23869fb03b7010633a4de30dd121f580bc2e0d3002f3ef20',
        },{
            src: 'https://www.sports-g.com/wp-content/uploads/2019/02/%ED%95%9C%EB%B3%B4%EB%A6%84-696x829.jpg',
        },{
            src: 'http://dn.joongdo.co.kr/mnt/images/file/2019y/02m/08d/20190208002245485_1.jpg',
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