import { useState, useEffect } from "react";

import Inputs from "./UI/Inputs";
import Title from "./UI/Title";
import RestWheel from "./UI/RestWheel";
import ModalWinner from "./UI/ModalWinner";

import { Flex, Center, Box } from "@chakra-ui/react";

function Home() {
  const [inputData, setInputData] = useState({});
  const [RestaurantData, setRestaurantData] = useState({});
  const [winner, setWinner] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  useEffect(() => {
    if (inputData.range !== undefined) {
      console.log(inputData);
      setInputData(inputData);
      getRestaurantData();
    }
  }, [inputData]);

  const getRestaurantData = async () => {
    setLoading(true);
    var meters = parseInt(inputData.range) * 1609;
    // window.dataLayer.push({
    //   event: "getRestaurants",
    //   restaurantData: {
    //     "location" : context.state.location,
    //     "price" : context.state.price,
    //     "open_now" : context.state.openOnly,
    //     "radius" : context.state.range,
    //     "rating" : context.state.rating
    //   },
    // });

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    var params =
      "location=" +
      inputData.location +
      "&" +
      "price=" +
      inputData.price +
      "&open_now=" +
      inputData.openOnly +
      "&radius=" +
      meters +
      "&limit=50&sort_by=rating&term=restaurants";

    var restaurants = await fetch(
      "https://dinnerspinner.io/testing/getRestaurants?" + params,
      requestOptions
    );
    console.log("https://dinnerspinner.io/testing/getRestaurants?" + params);
    var restaurantsFmt = await restaurants.json();
    setRestaurantData(restaurantsFmt);
    console.log(restaurantsFmt);
    setLoading(false);
    return restaurantsFmt;
  };

  return (
    <Flex w="100%" flexDirection="column" align="center">
      <Box w="75%">
        <Center>
          <Title></Title>
        </Center>
      </Box>

      {Object.keys(RestaurantData).length === 0 ? (
        <Box w="75%">
          <Inputs loading={loading} setInputData={setInputData}></Inputs>
        </Box>
      ) : (
        <></>
      )}

      {RestaurantData.businesses ? (
        <RestWheel
          RestaurantData={RestaurantData}
          setRestaurantData={setRestaurantData}
          setWinner={setWinner}
          openModal={openModal}
        ></RestWheel>
      ) : (
        <></>
      )}
      <Box>
        <ModalWinner
          modal={modal}
          setModal={setModal}
          winner={winner}
        ></ModalWinner>
      </Box>
    </Flex>
  );
}

export default Home;
