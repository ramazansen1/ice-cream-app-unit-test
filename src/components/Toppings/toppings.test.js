import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("Sosları ekleme çıkarma işleminin toplam fiyata olan etkisi", async () => {
  render(<Toppings />);

  const user = userEvent.setup();

  // toplam başlığını çağırm
  const total = screen.getByRole("heading", { name: /Soslar Ücreti:/i });

  // kiraz checkbox'ını çapırma
  const cherryCheck = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });

  // sosu sepete ekleme
  await user.click(cherryCheck);

  // toplamı denetleme
  expect(total).toHaveTextContent(2);

  // farklı bir sos daha ekleme
  const mochiCheck = await screen.findByRole("checkbox", { name: /Mochi/i });

  await user.click(mochiCheck);
  // yeni toplamı denetleme
  expect(total).toHaveTextContent(4);

  // bir sosucu sepetten çıkarma
  await user.click(cherryCheck);
  expect(total).toHaveTextContent(2);

  // farklı bir sosuda çıkarma
  await user.click(mochiCheck);
  expect(total).toHaveTextContent(0);
});
