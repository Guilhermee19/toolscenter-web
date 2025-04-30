import React from "react";
import { useQRCode } from "next-qrcode";

function QrCode({
  url,
  width,
  margin,
  scale,
  colorQrCode,
  colorBg,
}: {
  url: string;
  width: number;
  margin: number;
  scale: number;
  colorQrCode: string;
  colorBg: string;
}) {
  const { SVG } = useQRCode();

  return (
    <SVG
      text={url}
      options={{
        type: "",
        errorCorrectionLevel: "M",
        margin: margin,
        scale: scale,
        width: width,
        color: {
          dark: colorQrCode,
          light: colorBg,
        },
      }}
    />
  );
}

export default QrCode;
