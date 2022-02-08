import { Switch, FormLabel, HStack } from "@chakra-ui/react";

function OpenOnly({ OpenOnlyData, setOpenOnlyData }) {
  const openOnlyChange = (event) => {
    setOpenOnlyData(event.target.checked);
  };
  return (
    <HStack>
      <FormLabel mr={0} htmlFor="openOnly">
        Open Only
      </FormLabel>
      <Switch
        onChange={openOnlyChange}
        defaultChecked={!OpenOnlyData}
        id="openOnly"
        size="lg"
      ></Switch>
    </HStack>
  );
}

export default OpenOnly;
