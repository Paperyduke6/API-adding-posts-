import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PostsList from './components/PostsList';
import AddPostForm from './components/AddPostForm';

const App = () => (
    <Provider store={store}>
        <div>
            <PostsList />
        </div>
    </Provider>
);

export default App;
