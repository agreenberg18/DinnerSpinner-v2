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

  useEffect(() => {
    if (Object.keys(RestaurantData).length > 0) {
      const result = RestaurantData.businesses.map((restaurant, index) => {
        let option =
          restaurant.name.length > 15
            ? restaurant.name.slice(0, 15)
            : restaurant.name;
        if (index % 4 === 0) {
          return {
            ...restaurant,
            option: option,
            style: { backgroundColor: "#F4E43E", textColor: "black" },
          };
        } else if (index % 3 === 0) {
          return {
            ...restaurant,
            option: option,
            style: { backgroundColor: "#FF7014", textColor: "black" },
          };
        } else if (index % 2 === 0) {
          return {
            ...restaurant,
            option: option,
            style: { backgroundColor: "#042e47", textColor: "white" },
          };
        } else {
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
