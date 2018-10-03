import Fetch from './Fetch/Fetch';
import FetchWrapper from './FetchWrapper/FetchWrapper';
const Delete = FetchWrapper('delete');
const Get = FetchWrapper('get');
const Post = FetchWrapper('post');

export {
    Fetch,
    Delete,
    Get,
    Post
};
