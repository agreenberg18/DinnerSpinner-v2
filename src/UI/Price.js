import Rating from "react-rating";

function Price({ PriceData, setPriceData }) {
  const updatePrice = (val) => {
    setPriceData(val);
  };
  return (
    <>
      <Rating
        onChange={updatePrice}
        start={0}
        stop={5}
        step={1}
        fractions={2}
        initialRating={PriceData}
        emptySymbol="bi bi-piggy-bank"
        fullSymbol="bi bi-piggy-bank-fill"
      />
    </>
  );
}

export default Price;
