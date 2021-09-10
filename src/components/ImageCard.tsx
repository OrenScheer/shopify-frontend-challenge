import * as React from "react";
import { ReactElement } from "react";

import {
  useBoolean,
  Image,
  Box,
  Button,
  AccordionItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Skeleton,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { NASAImage } from "../types";
import { FaHeart } from "react-icons/all";

type ImageCardProps = {
  image: NASAImage | undefined;
};

const LIKE_OJBECT_NAME = "likes";

const ImageCard = ({ image }: ImageCardProps): ReactElement => {
  const [liked, setLiked] = useBoolean(
    JSON.parse(localStorage.getItem(LIKE_OJBECT_NAME) as string)?.includes(
      image?.date
    )
  );
  const [isImageLoaded, setIsImageLoaded] = useBoolean(false);
  const heartColor = useColorModeValue("black", "white");
  const [isDescOpenByDefault] = useMediaQuery("(min-width: 62em)");

  const likeOrUnlike = () => {
    const set =
      JSON.parse(localStorage.getItem(LIKE_OJBECT_NAME) as string) || [];
    if (liked) {
      setLiked.off();
      const index = set.indexOf(image?.date);
      if (index > -1) {
        set.splice(index, 1);
      }
      localStorage.setItem(LIKE_OJBECT_NAME, JSON.stringify(set));
    } else {
      setLiked.on();
      set.push(image?.date);
      localStorage.setItem(LIKE_OJBECT_NAME, JSON.stringify(set));
    }
  };

  return (
    <>
      {image && (
        <Flex
          borderWidth="5px"
          borderRadius="lg"
          overflow="hidden"
          textAlign="left"
          height="100%"
          direction={{ base: "column", lg: "row" }}
          mb={4}
        >
          <Skeleton
            isLoaded={isImageLoaded}
            onLoad={setIsImageLoaded.on}
            mb={0}
            flexShrink={0}
          >
            {image.url.toLowerCase().includes("youtube") ? (
              <Box width={{ base: "100%", lg: "500px" }} height="100%">
                <iframe
                  title={image.title}
                  src={image.url}
                  allowFullScreen
                  height="100%"
                  width="100%"
                />
              </Box>
            ) : (
              <Image src={image.url} width={{ base: "100%", lg: "500px" }} />
            )}
          </Skeleton>
          <Box p={6} width="100%">
            <Flex justifyContent="space-between" alignItems="center">
              <Flex direction="column">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="sm"
                  textTransform="uppercase"
                >
                  {image.date}
                </Box>
                <Box fontWeight="semibold" as="h4" lineHeight="tight">
                  {image.title}
                </Box>
              </Flex>
              <Button
                aria-label="like"
                leftIcon={
                  <FaHeart style={{ fill: liked ? "red" : heartColor }} />
                }
                onClick={likeOrUnlike}
                width="100px"
                flexShrink={0}
                ml={2}
              >
                {liked ? "Liked!" : "Like"}
              </Button>
            </Flex>
            <Accordion
              mt={2}
              defaultIndex={isDescOpenByDefault ? 0 : undefined}
              allowToggle
            >
              <AccordionItem>
                <h2>
                  <AccordionButton pl={0}>
                    <Box flex="1" textAlign="left">
                      Description
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} pl={0} fontSize={"14px"}>
                  {image.explanation}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ImageCard;
