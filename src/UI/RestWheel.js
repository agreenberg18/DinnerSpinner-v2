import { useState, useEffect } from "react";

import { Button, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Wheel } from "react-custom-roulette";

function RestWheel({
  RestaurantData,
  setRestaurantData,
  setWinner,
  openModal,
}) {
  const [data, setData] = useState({});
  const [spinWheel, setSpinWheel] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const showInputs = () => {
    setRestaurantData({});
  };
  function getRandom(length) {
    return Math.floor(Math.random() * length);
  }

  function getRandomSample(array, size) {
    var length = array.length;

    for (var i = size; i--; ) {
      var index = getRandom(length);
      var temp = array[index];
      array[index] = array[i];
      array[i] = temp;
    }

    return array.slice(0, size);
  }
  useEffect(() => {
    if (Object.keys(RestaurantData).length > 0) {
      let len =
        Object.keys(RestaurantData.businesses).length < 15
          ? Object.keys(RestaurantData.businesses).length
          : 15;
      console.log(Object.keys(RestaurantData).length);
      const randomize = getRandomSample(RestaurantData.businesses, len);
      //const result = RestaurantData.businesses.map((restaurant, index) => {
      const result = randomize.map((restaurant, index) => {
        let option =
          restaurant.name.length > 15
            ? restaurant.name.slice(0, 15)
            : restaurant.name;
        switch (index % 4) {
          case 0:
            return {
              ...restaurant,
              option: option,
              style: { backgroundColor: "#F4E43E", textColor: "black" },
            };
          case 1:
            return {
              ...restaurant,
              option: option,
              style: { backgroundColor: "#FF7014", textColor: "black" },
            };
          case 2:
            return {
              ...restaurant,
              option: option,
              style: { backgroundColor: "#042e47", textColor: "white" },
            };
          case 3:
            return {
              ...restaurant,
              option: option,
              style: { backgroundColor: "#55B7DD", textColor: "black" },
            };
        }
      });
      setData(result);
    }
  }, [RestaurantData]);

  const handleSpinClick = () => {
    console.log(data);
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setSpinWheel(true);
  };
  const handleWinner = () => {
    console.log("in wheel: winner " + data[prizeNumber]["name"]);
    setWinner(data[prizeNumber]);
    openModal();
  };

  return (
    <VStack spacing="24px">
      <Wheel
        mustStartSpinning={spinWheel}
        outerBorderWidth={2}
        innerRadius={1}
        textDistance={60}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setSpinWheel(false);
          handleWinner();
        }}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
      />
      <Button onClick={handleSpinClick}>Spin Wheel</Button>
      <Button colorScheme={"pink"} onClick={showInputs}>
        Show Inputs
      </Button>
    </VStack>
  );
}

export default RestWheel;
