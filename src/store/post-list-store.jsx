import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [] ,
  addPost: () => {},
  deletePost: () => {},
});

const PostListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if(action.type === 'DELETE_POST'){
    newPostList = currentPostList.filter(post => post.id !== action.payload.postId);
  }
  else if(action.type === 'ADD_POST'){
    newPostList  = [action.payload , ...currentPostList];
  }
  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(PostListReducer, DEFAULT_POSTLIST);

  const addPost = (userId , postTitle , postBody , reactions , tags) => {
  dispatchPostList({
    type: 'ADD_POST',
    payload :{
      id: Date.now(),
      title: postTitle ,
      body: postBody,
      reaction: reactions,
      userId: userId,
      hashtags: tags
  }
  })
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload:{
        postId
      }
    })
  };

  return (
    <PostList.Provider value={{ postList , addPost , deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POSTLIST = [{
    id: "1",
    title: "Hellooooo Everyone",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere hic nesciunt, voluptate enim aut ea id veritatis explicabo consectetur repudiandae sunt? Molestias, voluptatum aspernatur ratione aut quod dolore odit corrupti!",
    reaction: 5,
    userId: "user_12",
    hashtags: ["enthu" , "overwhelmed" , "excited"],

},
{
    id: "2",
    title: "Hellooooo Mumbai",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere hic nesciunt, voluptate enim aut ea id veritatis explicabo consectetur repudiandae sunt? Molestias, voluptatum aspernatur ratione aut quod dolore odit corrupti!",
    reaction: 3,
    userId: "user_12",
    hashtags: ['vacayyy','seaside'],

}];

export default PostListProvider;
