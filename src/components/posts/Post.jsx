import { useEffect, useState } from 'react'
// redux
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/features/posts/postsSlice"
// components
import UpdatePost from './UpdatePost'
import Cookies from 'js-cookie';

const Post = (props) => {

  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const [showUpdatePost, setShowUpdatePost] = useState(false)

  const dispatch = useDispatch()

  const tryToDeletePost = (e) => {
    if (addRequestStatus === 'idle') {
      try {
        setAddRequestStatus('pending')
        dispatch(deletePost({ id: props.post.id }))
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
    
  }

  useEffect(() => {

  }, [showUpdatePost])

  const openUpdatePost = () => {
    let updatePostElements = document.querySelectorAll('.update-post')
    let divToUpdate = [...updatePostElements].filter(el => el.id == props.post.id)

    divToUpdate[0].style.display = "block"

    let divOverlay = document.querySelector('.overlay-update-post');
    divOverlay.style.display = "block"
    document.body.style.overflow = "hidden"
    divOverlay.addEventListener('click', () => {
      divOverlay.style.display = "none"
      divToUpdate[0].style.display = "none"
      document.body.style.overflow = "visible"
    })
  }

  // ------- WORKING ON HERE ---------- //





  let cookieUser = Cookies.get('user')
  let cookieUserInfos = JSON.parse(cookieUser) 
  return (
    <>
      <div className="post-wrapper" >
        <div className="post-header">
          <p>by {props.post.author}</p>
        </div>
        <div className="post-content">
          <p>{props.post.content}</p>
          <img src={props.post.image_link}/>
        </div>
        <div className="post-comments">
          <i>comments are not ready to work on here on the front</i>
        </div>

        <div className="post-provisional-options">
        {props.post.user_id == cookieUserInfos.id ? 
          <>
            <button onClick={((e)=>tryToDeletePost(e))}>delete post</button>
            <button onClick={openUpdatePost}>update post</button>
          </>
        : ''}
        </div>

      </div>


      {/* RELATED TO UPDATE POST, ITS A MODAL */}
      <UpdatePost post={props.post}/>
    </>
  )
}

export default Post