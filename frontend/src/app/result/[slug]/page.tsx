"use client";
import { DetectionResult } from "@/components/DetectionResult";
import { Headline } from "@/components/Headline";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { type } from "os";
import { useState } from "react";

type Props = {
  imageSrc: string;
  detectionLabel: string;
};

type Params = {
  params: {
    slug: string;
  };
};
export default function Result({ params }: Params) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [predictionResult, setPredictionResult] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    // call the api to get the prediction result
    const fetchData = async () => {
      try {
        const slug = params.slug;
        const result = await fetch(
          `http://localhost:5000/api/detections/${slug}`,
          {
            method: "GET",
          }
        );
        const data = await result.json();
        setImageUrl(data.image);
        setPredictionResult(data.label);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params]);

  return (
    <>
      <Headline text="Brain Scan Analysis Results" />
      {imageUrl && predictionResult ? (
        <DetectionResult
          imageSrc={imageUrl}
          detectionLabel={predictionResult}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
