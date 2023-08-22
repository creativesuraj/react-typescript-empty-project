import { Loader } from "../Loader/Loader";
import { Modal } from "../Modal/Modal";
import { Comments } from "../types/Comments";
import { Posts } from "../types/Posts";
import React, { useState } from 'react';
import './Card.scss';

type Props = {
  post: Posts;
  comments: Comments[];
  setSelectedId: (id: number) => void;
}

export const Card: React.FC<Props> = ({ post, comments, setSelectedId }) => {
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const toggleModal = (id: number) => {
    setShowLoader(true);
    setSelectedId(id);

    if (id === 0) {
      setShowLoader(false);
        setShowModal(!showModal); 
      
    }
    setTimeout(() => {
      setShowLoader(false);
      setShowModal(!showModal);
    }, 500);
    
  }

  return (
    <div className='card'>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
       
        <button className="comments_btn" onClick={() => toggleModal(post.id)}>View Comments</button>

        {showLoader && <Loader />}

        {showModal && (
					<Modal
						comments={comments}
            toggleModal={toggleModal}
					/>
				)}
    </div>
  )};