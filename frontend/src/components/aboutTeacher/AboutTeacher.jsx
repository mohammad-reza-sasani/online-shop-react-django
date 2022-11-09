import React from "react";

const AboutTeacher = () => {
  return (
    <div>
      <div className=" about-teacher-parent">
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12 ">
            <div className="about-teacher-image-name-parent shadow">
              <div className="about-teacher-image-parent">
                <img
                  src={require("../../img/teachers/blank-profile-picture.png")}
                />
              </div>
              <p className="about-teacher-name-text">زهرا یاری زاده</p>
            </div>
          </div>

          <div className="col-lg-9 col-md-12 col-sm-12 ">
            <div className="about-teacher-info-parent shadow">
              info info info
              info info info
              info info info
              info info info
              info info info

              info info info
              info info info
              info info info
              info info info
              info info info
              info info info
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTeacher;
