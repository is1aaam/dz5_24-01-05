import axios from "axios";

const initialState = {
    posts: [],
    comments: {},
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return{
                ...state,
                posts: action.payload
            };
        case 'SET_COMMENTS':
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.payload.postId]:
                    action.payload.comments
                }
            };
        case 'TOGGLE_COMMENTS':
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.payload]:
                        !state.comments[action.payload]
                }
            };
        default:
            return state;
    }
};

export const setPosts = (posts) => (
    {
        type: 'SET_POSTS',
        payload: posts,
    }
);

export const setComments = (postId, comments) => (
    {
        type: 'SET_COMMENTS',
        payload: { postId, comments },
    }
);

export const toggleComments = (postId) => (
    {
        type: 'TOGGLE_COMMENTS',
        payload: postId,
    }
);

export const fetchPosts = () => {
    return (dispatch) => {
        axios.get('https://dummyjson.com/posts?limit=10')
            .then(
                (resp) =>
                    dispatch(setPosts(resp.data.posts))
            )
        };
    };

export const fetchCommentsByPostId = (postId) => {
    return (dispatch) => {
        axios.get(`https://dummyjson.com/comments/post/${postId}`)
            .then(
                (resp) =>
                    dispatch(setComments(postId, resp.data.comments))
            )
        };
    };

export const toggleCommentsVisibility = (postId) => {
    return (dispatch) => {
        dispatch(toggleComments(postId)
        );
    };
};