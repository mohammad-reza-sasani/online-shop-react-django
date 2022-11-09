import React from "react";
import { Link } from "react-router-dom";

const UserCourse = () => {
  return (
    <div>
      <p className="user-course-title-text">
        <i className="fa fa-circle" aria-hidden="true"></i>دوره های من
      </p>

      <table className="table table-bordered user-course-parent">
        <tbody>
          
          <tr>
            <td className="user-course-title-course">
              <Link to="/">آموزش خودهیپنوتیزم</Link>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default UserCourse;
