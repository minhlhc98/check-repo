import Image, { ImageProps } from "next/image";
import React from "react";
import {cn} from "@workspace/ui/lib/utils"
import { getMainTokenImage } from "../common/functions";

interface IImgProps extends ImageProps {
  defaultRender?: () => React.ReactNode;
  chain?: string;
}

const DEFAULT_TOKEN_LOGO_SRC = "/public/defaultTokenLogo.png";
const Img = ({
  src,
  defaultRender,
  className,
  chain,
  ...otherProps
}: IImgProps) => {
  if (!src) {
    if (defaultRender) {
        return defaultRender();
    }
    return (
      <Image
        {...otherProps}
        className={cn("w-full h-full", className)}
        src={chain ? getMainTokenImage(chain) : DEFAULT_TOKEN_LOGO_SRC}
      />
    );
  }

  return <Image src={src} className={className} {...otherProps} />;
};

export default React.memo(Img);
