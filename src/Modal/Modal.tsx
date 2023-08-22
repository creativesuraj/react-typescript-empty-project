import React from "react";
import { Comments } from "../types/Comments";
import './Modal.scss';

type Props = {
  comments: Comments[];
  toggleModal: (id: number) => void;
}

export const Modal: React.FC<Props> = ({ comments, toggleModal }) => {
  return (
    <div className="modal-background">
      <div className="modal-box center-modal">
      <strong
            className="closeBtn" onClick={() => toggleModal(0)}>
              X
          </strong>
        {comments.map(comment => (
          <React.Fragment key={comment.id}>
          <div className="heading">
          <h1 className="title">{comment.email}</h1>
        </div>
        
        <div className="content">
          {comment.name}
        </div>
  
        </React.Fragment>
        ))}
      </div>
    </div>
  );
};