import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";
import userEvent from "@testing-library/user-event/";

test("Koşulların onaylanmasına göre buton aktifliği", async () => {
  render(<Form />);

  // gerçek kullanıcı similasyonu yapmak için user-event kurulumu
  const user = userEvent.setup();

  // test elemanlarını çağırma

  const orderBtn = screen.getByRole("button");
  const checkBox = screen.getByRole("checkbox", {
    name: "Koşulları okudum ve kabul ediyorum",
  });

  // buton başlangıçta inaktifdir.
  expect(orderBtn).toBeDisabled();

  // checkbox tiksiz mi kontrol etme
  // .not sayesinde bu tarz kontrollerin tersini sağlayabiliriz.
  expect(checkBox).not.toBeChecked();

  // checkbox'ı tikle ve butonun aktifliğini kontrol et
  // user asekron işlemler yaptığı için daha doğru sonuçlar sağlanması için
  // user-event kullanıyoruz ve fonksiyonumuzu asekron yapıyoruz.
  await user.click(checkBox);
  // buton aktif oluyor mu kontrol ediyoruz
  expect(orderBtn).toBeEnabled();

  // kullanıcı checkboxdan tick i kaldırsın.
  // kullanıcı bir daha tıkladıgında buton inaktif oluyor mu kontrol ediyoruz.
  await user.click(checkBox);
  expect(orderBtn).toBeDisabled();
});

test("Onayla butonu hover olunca bildirim çıkar", async () => {
  render(<Form />);
  const user = userEvent.setup();

  // gerekli elemanlar
  const checkBox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  // checkbox tickleme
  await user.click(checkBox);

  // mouse hoverlama
  fireEvent.mouseEnter(button);

  // bildirimi çağırma
  // tamamen içerideki yazıyı birebir aynısını olmasını istemediğimizde
  // options göndeririz exact: false yaparız.
  const popup = screen.getByText("Size gerçekten", { exact: false });

  // bildirim gözüküyor mu?
  expect(popup).toBeVisible();

  // mouse button üzerinden çekme
  fireEvent.mouseLeave(button);
  // popup gözükmemesi durumu
  expect(popup).not.toBeVisible();
});
