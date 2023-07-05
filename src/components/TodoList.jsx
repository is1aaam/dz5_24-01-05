import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
    addTodo,
    removeTodo,
    fetchTodos,
} from '../redux/store/ToDosReducer.js';
import {
    fetchCommentsByPostId,
    toggleCommentsVisibility,
} from '../redux/store/PostReducer.js'

export const TodoList = () => {
    const [newTodo, setNewTodo] = useState('');
    const todos = useSelector((state) => state.todos.items);
    const comments = useSelector((state) => state.posts.comments);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    const onClick = () => {
        if (newTodo.trim() !== '') {
            dispatch(
                addTodo({
                    id: new Date(),
                    todo: newTodo,
                })
            );
            setNewTodo('');
        }
    };

    const handleRemove = (id) => {
        dispatch(removeTodo(id));
    };

    const loadComments = (postId) => {
        if (comments[postId]) {
            dispatch(toggleCommentsVisibility(postId));
        } else {
            dispatch(fetchCommentsByPostId(postId));
        }
    };

    return (
        <div className="todo-list-container">
            <h4>TodoList</h4>
            <input
                type="text"
                onChange={(e) =>
                    setNewTodo(e.target.value)}
                value={newTodo}
            />
            <button
                onClick={onClick}>
                Save
            </button>
            <ul>
                {todos.map((t) => (
                    <li key={t.id}>
                        {t.todo}
                        <button
                            onClick={() =>
                                handleRemove(t.id)}>
                            Delete
                        </button>
                        <br/>
                        <button
                            onClick={() =>
                                loadComments(t.id)}>
                            Load Comments
                        </button>
                        {comments[t.id] && (
                            <ul>
                                {comments[t.id].map((comment) => (
                                    <li key={comment.id}>
                                        {comment.body}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};




