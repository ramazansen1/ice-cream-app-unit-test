import { useState } from "react";

const Form = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div className="my-4 d-flex align-items-center justify-content-center gap-3">
        <input
          onChange={() => setIsChecked(!isChecked)}
          id="terms"
          className="form-check-input"
          type="checkbox"
        />
        <div className="terms">
          <p
            style={{ visibility: isHover ? "visible" : "hidden" }}
            className="bg-light rounded p-2 shadow"
          >
            Size gerçekten birşey teslim etmeyeceğiz.
          </p>
          <label htmlFor="terms" className="lead">
            Koşulları okudum ve kabul ediyorum
          </label>
        </div>

        <button
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          disabled={isChecked}
          className="btn btn-warning"
        >
          Siparişi Onayla
        </button>
      </div>
    </>
  );
};

export default Form;
