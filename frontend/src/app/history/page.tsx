"use client";
import { useState, useEffect } from "react";
import { DetectionHistory } from "@/components/DetectionHistory";
import { Headline } from "@/components/Headline";
import { getPredictionHistory } from "@/services/prediction/predictionService";
import { PredictionHistoryType } from "@/types/predictionTypes";

export default function History() {
  const [predictionHistory, setPredictionHistory] = useState<PredictionHistoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const history = await getPredictionHistory();
        console.log("history");
        console.log(history);
        setPredictionHistory(history);
      } catch (error) {
        console.log(error);
      }
    }
    console.log("use Effect run");
    fetchData();
  }, []);

  return (
    <>
      <Headline text="Brain Scan Results History" />
       <DetectionHistory
        imageSrc="/images/result-image.png"
        detectionLabel="Brain Tumor"
        labelExplanation="This image shows a brain tumor."
      /> 
      {/*
      <DetectionHistory
        imageSrc="/images/result-image.png"
        detectionLabel="No Abnormalities Detected"
        labelExplanation="This image shows no abnormalities in the brain."
      />
      <DetectionHistory
        imageSrc="/images/result-image.png"
        detectionLabel="Stroke"
        labelExplanation="This image shows a stroke in the brain."
      /> */}

      {predictionHistory.map((prediction) => (
        <DetectionHistory
          key={prediction.predictionId}
          imageSrc={prediction.imageSrc}
          detectionLabel={prediction.detectionLabel}
          labelExplanation={prediction.labelExplanation}
        />
      ))}

    </>
  );
}