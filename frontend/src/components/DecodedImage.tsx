import Image from "next/image";
import React from "react";

type Props = {
  imageSrc: string;
};

function fixBinary(bin: any) {
  var length = bin.length;
  var buf = new ArrayBuffer(length);
  var arr = new Uint8Array(buf);
  for (var i = 0; i < length; i++) {
    arr[i] = bin.charCodeAt(i);
  }
  return buf;
}

function DecodedImage({ imageSrc }: Props) {
  const decodedImage = fixBinary(atob(imageSrc));
  const blob = new Blob([decodedImage], { type: "image/jpeg" });
  const imageUrl = URL.createObjectURL(blob);

  return (
    <Image
      src={imageUrl}
      alt=""
      className="result_image"
      width={450}
      height={300}
    />
  );
}

export default DecodedImage;
