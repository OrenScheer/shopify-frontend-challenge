import * as React from "react";
import { ReactElement, useEffect, useState } from "react";

import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import { FaUserAstronaut } from "react-icons/all";
import axios from "axios";
import ImageCard from "./components/ImageCard";

const App = (): ReactElement => {
  const bg = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("#2B6CB0", "#BEE3F8");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios
      .get("https://api.nasa.gov/planetary/apod", {
        params: { api_key: process.env.REACT_APP_NASA },
      })
      .then((res) => {
        setImageUrl(res.data.url);
      })
      .catch(() => {
        console.log(process.env.NASA_API_KEY);
      });
  });

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
        <Flex bg={bg} width="100%" zIndex="9" pos="sticky" top="0">
          <Flex
            width="100%"
            justifyContent="space-between"
            pt={6}
            pb={6}
            px={8}
            height="100px"
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
      <ImageCard url={imageUrl} />
    </Flex>
  );
};

export default App;
