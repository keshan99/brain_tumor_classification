import { PredictionHistoryType } from "@/types/predictionTypes";

const tempHistroy:PredictionHistoryType[] = [
    {
        predictionId: "p1",
        imageSrc: "/images/result-image.png",
        detectionLabel: "Brain Tumor",
    },
    {
        predictionId: "p2",
        imageSrc: "/images/result-image.png",
        detectionLabel: "No Abnormalities Detected",
    },
    {
        predictionId: "p3",
        imageSrc: "/images/result-image.png",
        detectionLabel: "Stroke",
    }
]


// api link https://brainbackend-9lzy.onrender.com/api/detections
// out: [{id,image(bytes code),label},{id,image(bytes code),label},{id,image(bytes code),label]
async function getPredictionHistory(): Promise<PredictionHistoryType[]> {
    try{
        const response = await fetch("https://brainbackend-9lzy.onrender.com/api/detections", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        let returnData:PredictionHistoryType[] = [];

        // [{id,image(bytes code),label},{id,image(bytes code),label},{id,image(bytes code),label] => 
        // [{predictionId: string; imageSrc: string;detectionLabel: string}}]
        data.forEach((element:{
            image:string
            id: string
            label: string
        }) => {
            returnData.push({
                predictionId: element.id,
                imageSrc: element.image,
                detectionLabel: element.label
            });
        });
        
        console.log(returnData);
        return returnData;
    }
    catch(error){
        console.log(error);
        return []
    }
}

export { getPredictionHistory }