"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Replace 'YOUR_BACKEND_ENDPOINT' with the actual API endpoint
      fetch("http://localhost:5000/api/detections", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Upload success:", data);
          router.push(`/result/${data.id}`);
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    }
  };

  return (
    <div className="file_uploader flex__center">
      <Image src="/images/Image upload.png" alt="" width={500} height={350} />
      <div className="upload_text">
        <p>Drag & Drop images here</p>
        <p>or</p>
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button className="upload_btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};
