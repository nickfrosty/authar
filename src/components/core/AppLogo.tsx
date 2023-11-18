import { memo } from "react";
import { SITE } from "@/lib/const/general";
import Link from "next/link";
import Image from "next/image";

import LogoMarkBlack from "@/../public/logomark-black.svg";
// import LogoBlack from "@/../public/logo-black.svg";
// import WordmarkBlack from "@/../public/wordmark-black.svg";

export const AppLogo = memo(({ className = "" }: SimpleComponentProps) => {
  return (
    <Link
      href={"/"}
      className={`font-bold text-2xl inline-flex gap-2 ${className}`}
    >
      {/* <Image src={LogoBlack} alt={""} height={40} priority />
      <Image src={WordmarkBlack} alt={SITE.name} height={28} priority /> */}
      <Image src={LogoMarkBlack} alt={SITE.name} height={40} priority />
    </Link>
  );
});
