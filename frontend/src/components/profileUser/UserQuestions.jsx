import React from "react";
import { Link } from "react-router-dom";

const UserQuestions = () => {
  return (
    <div>
      <p className="user-questions-title-text">
        <i className="fa fa-circle" aria-hidden="true"></i>
        سوالات من 
      </p>

      <table className="table table-bordered user-questions-parent">
        <tbody>
          <tr>
            <td className="user-questions-title-course">
              <Link to="/">آموزش خودهیپنوتیزم</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserQuestions;
