import React from "react";
import { Link } from "react-router-dom";

const UserConsultation = () => {
  return (
    <div>
      <p className="user-consultation-title-text">
        <i className="fa fa-circle" aria-hidden="true"></i>
        مشاوره های من
      </p>

      <table className="table table-bordered user-consultation-parent">
        <tbody>
          <tr>            
            <td className="user-consultation-title-course">
              تاریخ مشاوره : 1401/3/10
            </td>
            <td className="user-consultation-title-course">
              ساعت مشاوره : 15:30
            </td>
            <td className="user-consultation-icon-state">
            <i className="fa fa-clock-o" aria-hidden="true"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserConsultation;