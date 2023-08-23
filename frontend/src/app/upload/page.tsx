import { FileUploader } from "@/components/FileUploader";
import { Headline } from "@/components/Headline";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function Upload() {
  return (
    <>
      <Headline text="Upload Your Brain Scan" />
      <FileUploader />
      <div className="button_wrapper">
        <PrimaryButton text="Get Started" />
      </div>
    </>
  );
}
