import { DetectionHistory } from "@/components/DetectionHistory";
import { Headline } from "@/components/Headline";

export default function History() {
  return (
    <>
      <Headline text="Brain Scan Results History" />
      <DetectionHistory />
      <DetectionHistory />
      <DetectionHistory />
    </>
  );
}
