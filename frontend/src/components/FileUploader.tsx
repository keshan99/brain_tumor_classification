import React from "react";
import Image from "next/image";
export const FileUploader = () => {
  return (
    <div className="file_uploader flex__center">
      <Image src="/images/Image upload.png" alt="" width={500} height={350} />
      <div className="upload_text">
        <p>Drag & Drop images here</p>
        <p>or</p>
        <a href="#">Browse images</a>
      </div>
    </div>
  );
};
