import Rating from "react-rating";

function Stars({ StarsData, setStarsData }) {
  const setStars = (val) => {
    setStarsData(val);
  };
  return (
    <>
      <Rating
        onChange={setStars}
        start={0}
        stop={5}
        step={1}
        fractions={2}
        initialRating={StarsData}
        emptySymbol="bi bi-star"
        fullSymbol="bi bi-star-fill"
      />
    </>
  );
}

export default Stars;
