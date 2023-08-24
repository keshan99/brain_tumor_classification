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
        setPredictionHistory(history);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Headline text="Brain Scan Results History" />
      {predictionHistory.map((prediction) => (
        <DetectionHistory
          key={prediction.predictionId}
          imageSrc={prediction.imageSrc}
          detectionLabel={prediction.detectionLabel}
        />
      ))}

    </>
  );
}