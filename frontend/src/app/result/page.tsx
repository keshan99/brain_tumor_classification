"use client"
import { DetectionResult } from "@/components/DetectionResult";
import { Headline } from "@/components/Headline";
import { useEffect } from "react";

export default function Result() {
  
  useEffect(() => {
    console.log("hi");
  }
  , []);

  return (
    <>
      <Headline text="Brain Scan Analysis Results" />
      <DetectionResult />
    </>
  );
}
