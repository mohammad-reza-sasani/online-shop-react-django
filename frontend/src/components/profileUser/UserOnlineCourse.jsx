import React from "react";
import { Link } from "react-router-dom";

const UserOnlineCourse = () => {
  return (
    <div>
      <p className="user-course-online-title-text">
        <i className="fa fa-circle" aria-hidden="true"></i>دوره های آنلاین من 
      </p>

      <table className="table table-bordered user-course-online-parent">
        <tbody>
          
          <tr>
            <td className="user-course-online-title-course">
              <Link to="/">آموزش خودهیپنوتیزم</Link>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default UserOnlineCourse;
