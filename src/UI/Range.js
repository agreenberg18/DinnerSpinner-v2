import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

function Range({ RangeData, setRangeData }) {
  const onSlideChange = (val) => {
    setRangeData(val);
  };
  return (
    <>
      <Slider
        min={1}
        max={20}
        step={1}
        aria-label="slider-ex-6"
        defaultValue={5}
        onChange={onSlideChange}
      >
        <SliderMark value={RangeData} textAlign="center" mt="3" ml="-5">
          {RangeData} miles
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </>
  );
}

export default Range;
