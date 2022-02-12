import { useState, useEffect } from "react";

import Inputs from "./UI/Inputs";
import Title from "./UI/Title";
import RestWheel from "./UI/RestWheel";
import ModalWinner from "./UI/ModalWinner";

import { Flex, Center, Box, Spacer } from "@chakra-ui/react";
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-NMKSMHQ",
};

TagManager.initialize(tagManagerArgs);

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
    window.dataLayer.push({
      event: "getRestaurants",
      restaurantData: {
        location: inputData.location,
        price: inputData.price,
        open_now: inputData.openOnly,
        radius: inputData.range,
        rating: inputData.stars,
      },
    });

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    var params =
      "location=" +
      encodeURIComponent(inputData.location) +
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
    console.log(
      "https://dinnerspinner.io/testing/getRestaurants?categories=restaurants, All" +
        params
    );
    var restaurantsFmt = await restaurants.json();
    if (restaurantsFmt.businesses.length > 0) {
      setRestaurantData(restaurantsFmt);
      setLoading(false);
    } else {
      alert("Sorry, No Restaurants matched that criteria!");
      setLoading(false);
    }
    console.log(restaurantsFmt);
    return restaurantsFmt;
  };
  console.log("answer ", RestaurantData);
  return (
    <Flex w="100%" h="100%" flexDirection="column" align="center">
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

      {RestaurantData.businesses && RestaurantData.businesses.length !== 0 ? (
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
      <Spacer />
      <footer>
        <span style={{ fontSize: "xx-small" }}>Made by Andrew Greenberg</span>
      </footer>
    </Flex>
  );
}

export default Home;
