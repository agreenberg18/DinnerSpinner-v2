import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

function Location({ LocationData, setLocationData }) {
  const setLocation = (event) => {
    setLocationData(event.target.value);
  };
  return (
    <FormControl>
      <FormLabel htmlFor="Location">Location</FormLabel>
      <Input
        autoComplete="off"
        onChange={setLocation}
        id="Location"
        type="text"
      />
      <FormHelperText>City, Zip, or Address</FormHelperText>
    </FormControl>
  );
}
export default Location;
