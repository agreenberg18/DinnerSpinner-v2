import { useState } from "react";

import { Button, HStack, Flex, Center } from "@chakra-ui/react";

import Location from "./Location";
import OpenOnly from "./OpenOnly";
import Price from "./Price";
import Stars from "./Stars";
import Range from "./Range";

function Inputs({ loading, setInputData }) {
  const [LocationData, setLocationData] = useState("");
  const [OpenOnlyData, setOpenOnlyData] = useState(true);
  const [PriceData, setPriceData] = useState(3);
  const [StarsData, setStarsData] = useState(3);
  const [RangeData, setRangeData] = useState(3);

  const handleInputData = () => {
    setInputData({
      location: LocationData,
      openOnly: OpenOnlyData,
      price: PriceData,
      stars: StarsData,
      range: RangeData,
    });
  };
  return (
    <>
      <HStack>
        <Location
          LocationData={LocationData}
          setLocationData={setLocationData}
        ></Location>
        <OpenOnly
          OpenOnly={OpenOnlyData}
          setOpenOnlyData={setOpenOnlyData}
        ></OpenOnly>
      </HStack>
      <Flex justify="space-between">
        <Price PriceData={PriceData} setPriceData={setPriceData}></Price>
        <Stars StarsData={StarsData} setStarsData={setStarsData}></Stars>
      </Flex>
      <Range RangeData={RangeData} setRangeData={setRangeData}></Range>
      <Center>
        <Button
          isLoading={loading}
          mt={8}
          isDisabled={LocationData.length > 3 ? false : true}
          onClick={handleInputData}
        >
          Get Restaurants
        </Button>
      </Center>
    </>
  );
}
export default Inputs;
