import { PredictionHistoryType } from "@/types/predictionTypes";

const tempHistroy:PredictionHistoryType[] = [
    {
        predictionId: "p1",
        imageSrc: "/images/result-image.png",
        detectionLabel: "Brain Tumor",
        labelExplanation: "This image shows a brain tumor."
    },
    {
        predictionId: "p2",
        imageSrc: "/images/result-image.png",
        detectionLabel: "No Abnormalities Detected",
        labelExplanation: "This image shows no abnormalities in the brain."
    },
    {
        predictionId: "p3",
        imageSrc: "/images/result-image.png",
        detectionLabel: "Stroke",
        labelExplanation: "This image shows a stroke in the brain."
    }
]



async function getPredictionHistory(): Promise<PredictionHistoryType[]> {
    const data = tempHistroy
    return data
}

export { getPredictionHistory }