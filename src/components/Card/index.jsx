const Card = ({ scoop, basket, setBasket }) => {
  // üründen sepette kaçtane var bulma
  const found = basket.filter((item) => item.name === scoop.name);

  const amount = found.length;

  // sepette bulunan belirli isimdeki bütün ürünleri siler

  const handleReset = () => {
    const clearItem = basket.filter((item) => item.name !== scoop.name);

    // aynı isimdeki ürünün sıfırlama
    setBasket(clearItem);
  };
  return (
    <>
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: "150px" }}
      >
        <img className="img-fluid" src={scoop.imagePath} alt="cesit" />
        <label className="lead">{scoop.name}</label>

        <div className="d-flex align-items-center gap-2 mt-2">
          <button className="btn btn-danger" onClick={handleReset}>
            Sıfırla
          </button>
          <span className="fs-2">{amount}</span>
          <button
            className="btn btn-success"
            onClick={() => setBasket([...basket, scoop])}
          >
            Ekle
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
