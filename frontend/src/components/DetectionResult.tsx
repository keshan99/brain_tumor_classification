import React from "react";
import Image from "next/image";
import { PrimaryButton } from "@/components/PrimaryButton";

export const DetectionResult = () => {
  return (
    <div className="row flex__center">
      <div className="col">
        <p className="body_text">uploaded image</p>
        <Image
          src="/images/result-image.png"
          alt=""
          className="result_image"
          width={450}
          height={300}
        />
      </div>
      <div className="col detection_results flex__center">
        <div className="content_field">
          <p className="body_text detection_label">Detection label</p>
          <p className="detection_content">Non-Tumor</p>
        </div>
        <div className="content_field">
          <p className="body_text detection_label">Label Explanation</p>
          <p className="detection_content">
            Uploaded brain scan has been meticulously analyzed, revealing a
            reassuring result – no evidence of tumors.
          </p>
        </div>
        <div className="content_field">
          <p className="body_text detection_label">Add Feedback</p>
          <p className="detection_content">
            <textarea
              name="feedback"
              className="feedback_textarea"
              placeholder="Add your feedback here"
            ></textarea>
          </p>
        </div>
        <div className="button_group flex__center">
          <PrimaryButton text="Home" />
          <PrimaryButton text="Upload Next" />
        </div>
      </div>
    </div>
  );
};
