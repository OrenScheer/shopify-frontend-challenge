import * as React from "react";
import { ReactElement, useState } from "react";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  Text,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import { FaUserAstronaut } from "react-icons/all";
import axios from "axios";
import ImageCard from "./components/ImageCard";
import { NASAImage } from "./types";

const App = (): ReactElement => {
  const bg = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("#2B6CB0", "#BEE3F8");
  const [images, setImages] = useState<NASAImage[]>();
  const [isLoaded, setIsLoaded] = useBoolean(true);
  const [isError, setIsError] = useBoolean(false);

  const getData = () => {
    setImages(undefined);
    setIsLoaded.off();
    setIsError.off();
    axios
      .get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key: process.env.REACT_APP_NASA,
          start_date: "2021-09-01",
          end_date: "2021-09-09",
        },
      })
      .then((res) => {
        setImages(res.data as NASAImage[]);
        setIsLoaded.on();
      })
      .catch(() => {
        console.log(process.env.REACT_APP_NASA);
        setIsError.on();
        setIsLoaded.on();
      });
  };

  return (
    <Flex
      textAlign="center"
      fontSize="xl"
      pb={8}
      direction="column"
      alignItems="center"
      bg={bg}
      position="relative"
      minHeight="100vh"
    >
      <Flex direction="column" alignItems="center" width="100%" pb="48px">
        <Flex bg={bg} width="100%" zIndex="9" pos="fixed" top="0">
          <Flex
            width="100%"
            justifyContent="space-between"
            pt={4}
            pb={4}
            px={8}
            alignItems="flex-end"
          >
            <Heading d="flex" alignItems="center" color={titleColor}>
              <FaUserAstronaut style={{ marginRight: "10px" }} />
              Spacestagram
            </Heading>
            <ColorModeSwitcher zIndex="9" />
          </Flex>
        </Flex>
      </Flex>
      <Button onClick={getData} mb={4} mt="50px">
        Load images
      </Button>
      <Box width="80%">
        {isError && (
          <Alert
            status="error"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            width="100%"
            height="100%"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="2xl">
              There was an error.
            </AlertTitle>
            <AlertDescription fontSize="xl">Please try again.</AlertDescription>
          </Alert>
        )}
        {isLoaded ? (
          images?.map((image) => <ImageCard image={image} />)
        ) : (
          <>
            <Text>Obtaining images from across the universe...</Text>
            <Progress mt={4} size="lg" isIndeterminate />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default App;
