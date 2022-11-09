import React from "react";

const CommentUserProduct = ({ comment }) => {
  return (
    <div>
      {comment != null ? (
        <div className="commentUserProduct-comment-parent shadow-sm">
          <div className="commentUserProduct-username-parent d-flex justify-content-end">
            <span className="commentUserProduct-username">{comment.user}</span>
            <i
              className="fa fa-user-circle-o commentUserProduct-user-icon"
              aria-hidden="true"
            ></i>
          </div>
          <div className="commentUserProduct-user-comment-text">
            <p>{comment.description}</p>
          </div>

          {/* comment reply */}
                    
          {comment.reply_count != 0 ? comment.replies.map((reply)=> (
            
            
            <div className="commentUserProduct-comment-parent shadow-sm" style={{background:"#ccffcc",border:0}} key={String(reply.id)}>
              <div className="commentUserProduct-username-parent d-flex justify-content-end">
                <span className="commentUserProduct-username">
                  {reply.user}
                </span>
                <i
                  className="fa fa-user-circle-o commentUserProduct-user-icon"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="commentUserProduct-user-comment-text">
                <p>{reply.description}</p>
              </div>
            </div>

)) : null}
          {/* end map */}
          {/* end reply */}
        </div>
      ) : null}

      {/*  */}
    </div>
  );
};

export default CommentUserProduct;
