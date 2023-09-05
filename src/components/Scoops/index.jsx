import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card";

const Scoops = () => {
  const [scoopData, setScoopData] = useState([]);
  const [basket, setBasket] = useState([]);

  console.log(basket);

  useEffect(() => {
    axios
      .get("http://localhost:3050/scoops")
      .then((res) => setScoopData(res.data));
  }, []);
  return (
    <>
      <div className="container">
        <h1>Dondurma Çeşitleri</h1>
        <p className="lead">Tanesi: 2 $</p>
        <h2>Çeşitler Ücreti: {basket.length * 2} $</h2>

        <div className="row gap-5 p-3 justify-content-between">
          {scoopData.map((scoop, i) => {
            return (
              <Card
                key={i}
                scoop={scoop}
                basket={basket}
                setBasket={setBasket}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Scoops;
