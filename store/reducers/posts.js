import {CREATE_POST, SET_POST} from '../actions/posts';
import NewPost from '../../models/newPost'

const initialState = {
    availablePosts: []
  };
  
export default (state = initialState, action) => {
    // console.log(action.postData)
    switch (action.type) {
        case CREATE_POST:
            const newPost = new NewPost(
                action.postData.id,
                action.postData.myName,
                action.postData.title,
                action.postData.imageUrl,
                action.postData.description
              );

              return {
                ...state,
                availablePosts : state.availablePosts.concat(newPost)
              }

          case SET_POST:
            // console.log(action.posts, 'kk');
            // console.log(availablePosts)
            // const jhelp = state.availablePosts.concat(action.posts);
            // console.log(jhelp,' hdbj')
            return {
              availablePosts: action.posts
            };
        default:
        return state;
    }
}