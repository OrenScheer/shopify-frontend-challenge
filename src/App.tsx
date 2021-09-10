import * as React from "react";
import {
  FormEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
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
import DatePicker from "./components/DatePicker";

import "react-datepicker/dist/react-datepicker.css";

const App = (): ReactElement => {
  const bg = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("#2B6CB0", "#BEE3F8");
  const [images, setImages] = useState<NASAImage[]>();
  const [isLoaded, setIsLoaded] = useBoolean(true);
  const [isError, setIsError] = useBoolean(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const getData = useCallback(() => {
    setImages(undefined);
    setIsLoaded.off();
    setIsError.off();
    axios
      .get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key: process.env.REACT_APP_NASA,
          start_date: startDate.toLocaleDateString("en-CA"),
          end_date: endDate.toLocaleDateString("en-CA"),
        },
      })
      .then((res) => {
        setImages(res.data as NASAImage[]);
        setIsLoaded.on();
      })
      .catch(() => {
        setIsError.on();
        setIsLoaded.on();
      });
  }, [endDate, setIsError, setIsLoaded, startDate]);

  useEffect(() => getData(), [getData]);

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
      <Flex
        width="100%"
        px={8}
        justifyContent="space-between"
        alignItems="flex-start"
        direction={{ base: "column", md: "row" }}
        mt="50px"
      >
        <Flex
          direction="column"
          pos={{ md: "sticky" }}
          top="100px"
          width={{ base: "100%", md: "20%" }}
          mb={4}
          mr={4}
        >
          <FormControl>
            <FormLabel>Start date</FormLabel>
            <DatePicker
              selectedDate={startDate}
              onChange={(date: Date | FormEvent<HTMLElement>) => {
                if (date instanceof Date) {
                  setStartDate(date);
                  if (date > endDate) {
                    setEndDate(date);
                  }
                }
              }}
              maxDate={new Date()}
              dateFormat="yyyy-MM-dd"
            />
          </FormControl>
          <FormControl mt={2} mb={4}>
            <FormLabel>End date</FormLabel>
            <DatePicker
              selectedDate={endDate}
              onChange={(date: Date | FormEvent<HTMLElement>) => {
                if (date instanceof Date) {
                  setEndDate(date);
                }
              }}
              minDate={startDate}
              maxDate={new Date()}
              dateFormat="yyyy-MM-dd"
            />
          </FormControl>
          <Button onClick={getData} mb={2}>
            Load images
          </Button>
          <Text fontSize="12px" textAlign="left">
            All images retrieved from NASA's{" "}
            <Link href="https://api.nasa.gov/#apod" isExternal>
              Astronomy Picture of the Day API
            </Link>
            .
          </Text>
        </Flex>
        <Box width={{ base: "100%", md: "80%" }}>
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
              <AlertDescription fontSize="xl">
                Please try again.
              </AlertDescription>
            </Alert>
          )}
          {isLoaded ? (
            images?.map((image) => <ImageCard image={image} key={image.date} />)
          ) : (
            <>
              <Text>Obtaining images from across the universe...</Text>
              <Progress mt={4} size="lg" isIndeterminate />
            </>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default App;
