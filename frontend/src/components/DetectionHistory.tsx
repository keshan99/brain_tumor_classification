import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import DecodedImage from "./DecodedImage";

interface DetectionHistoryProps {
  imageSrc: string;
  detectionLabel: string;
}

export const DetectionHistory = ({
  imageSrc,
  detectionLabel,
}: DetectionHistoryProps) => {
  useEffect(() => {
    console.log("hi");
  }, []);
  return (
    <div className="row history-item flex__center">
      <div className="col">
        <p className="body_text">uploaded image</p>
        <DecodedImage imageSrc={imageSrc} />
      </div>
      <div className="col detection_results flex__center">
        <div className="content_field">
          <p className="body_text detection_label">Detection label</p>
          <p className="detection_content">{detectionLabel}</p>
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
      </div>
    </div>
  );
};
