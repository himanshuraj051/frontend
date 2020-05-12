export const CREATE_POST = 'CREATE_POST';
export const SET_POST = 'SET_POST';

export const fetchPosts = () => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch( 'https://blog-54c6b.firebaseio.com/post.json');
  
      const resData = await response.json();
    //   console.log(resData)
      const loadedPosts = [];
  
      for (const key in resData) {
        loadedPosts.push({
            id: key,
            myName: resData[key].myName,
            title: resData[key].title,
            imageUrl: resData[key].imageUrl,
            description: resData[key].description
        });
  
      }

      console.log(loadedPosts)
  
      dispatch({ type: SET_POST, posts: loadedPosts });
    };
  };

export const createPost = (myName, title, imageUrl, description) => {
    // console.log(myName, title, imageUrl, description)
    return async dispatch => {
        const response = await fetch('https://blog-54c6b.firebaseio.com/post.json',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                myName,
                title,
                imageUrl,
                description
            }) 
        });

        const resData = await response.json();
        // console.log(resData)
        const id = resData.name;

        dispatch({
            type: CREATE_POST,
            postData: {
                id,
                myName,
                title,
                imageUrl,
                description
            }
        })
    }
}