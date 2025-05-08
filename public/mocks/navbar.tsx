import { Braces, CaseSensitive, MessageSquareCode, QrCode } from "lucide-react";

export const NAVBAR_PAGES = [
  {
    label: "Text Convert",
    href: "/text-convert",
    icon: <CaseSensitive className="h-5 w-5 shrink-0 text-white" />,
  },
  {
    label: "QR Code Generator",
    href: "/qrcode-generator",
    icon: <QrCode className="h-5 w-5 shrink-0 text-white" />,
  },
  {
    label: "Base64 Image",
    href: "/base-to-image",
    icon: <MessageSquareCode className="h-5 w-5 shrink-0 text-white" />,
  },
  {
    label: "TS Type Generator",
    href: "/type-generator",
    icon: <Braces className="h-5 w-5 shrink-0 text-white" />,
  },
];
