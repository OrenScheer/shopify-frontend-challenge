import * as React from "react";
import { ReactElement } from "react";

import { useBoolean, Image } from "@chakra-ui/react";

type ImageCardProps = {
  url: string;
};

const ImageCard = ({ url }: ImageCardProps): ReactElement => {
  const [liked, setLiked] = useBoolean(false);

  return <Image src={url} />;
};

export default ImageCard;
