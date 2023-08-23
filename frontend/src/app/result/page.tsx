import { DetectionResult } from "@/components/DetectionResult";
import { Headline } from "@/components/Headline";

export default function Result() {
  return (
    <>
      <Headline text="Brain Scan Analysis Results" />
      <DetectionResult />
    </>
  );
}
