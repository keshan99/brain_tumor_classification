import { Headline } from "@/components/Headline";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function Home() {
  return (
    <>
      <Headline text="Detect Brain Tumors Across the Cosmos" />
      <div className="button_wrapper">
        <PrimaryButton text="Get Started" />
      </div>
    </>
  );
}
