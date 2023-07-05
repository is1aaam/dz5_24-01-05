import {
    combineReducers,
    legacy_createStore
        as createStore,
    applyMiddleware
} from "redux";
import {todosReducer} from "./ToDosReducer.js"
import {postReducer} from "./PostReducer.js";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todos: todosReducer,
    posts: postReducer,
})

export default  createStore(
    rootReducer,
    applyMiddleware(thunk)
)
