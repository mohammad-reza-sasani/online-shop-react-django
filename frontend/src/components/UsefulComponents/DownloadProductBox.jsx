import { borderRadius } from "@mui/system";
import React from "react";

const DownloadProductBox = ({fileData}) => {
  return (
    <div>
      <div className="downloadProductBox">فهرت درس ها و دانلود هر بخش</div>
      <div className="downloadProductBox-parent shadow-sm">
      
      {fileData?.map((value) => (   
        <div className="downloadProductBox-download-box" target="_blank"   key={String(value.id)}>
          <div className="downloadProductBox-download-button d-flex flex-row-reverse">
            <div className=" downloadProductBox-download-number">1</div>
            <div className="ml-auto p-2">
              <span>{value.name}</span>
            </div>
            <a href={value.file_product} download >
            <button type="button" className="btn btn-success">
              <span>
                دانلود{""}
                <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
              </span>
            </button>
            </a>
          </div>
        </div>
          ))}

       


      </div>
    </div>
  );
};

export default DownloadProductBox;
