import { render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event/";

/*
    ! Seçiciler
    ? Komut [All] BySeçici
    * Komut > get | find | query
    * get => elementler başlangıçta DOM'da var ise kullanılır.
            * elementler ekranda sabit olarak duruyorsa  o zaman `get`kullanırız.
            
    * find => elementin ne zaman ekrana basılacağı belli değilse kullanırız.
            * yani async işlemler API'den gelen veriler de `find` kullanırız.
            
    * query => elementler Dom'da yok ise koşula göre gelicek ise kullanırız.

    * Not: find methodu async bir method olduğu için kullanırken
          * async await ile birlikte kullanılmalı.

*/
test("API'den gelen her bir çeşit için ekrana bir kart basılır", async () => {
  render(<Scoops />);

  // ekrana basılan bütün kartları(resimlerini) çağırma
  const images = await screen.findAllByRole("img", { name: "cesit" });

  // gelen resimlerin sayısı 4 mü kontrol etme
  // diziyi kontrol etme
  expect(images).toHaveLength(4);
});

// describe("Dondurma çeşitlerinde ekleme ve sıfırlama işlemlerini kontrol etme", () => {
// });
test("Çeşit ekleleme işleminin toplam fiyata yansıması", async () => {
  render(<Scoops />);

  const user = userEvent.setup();

  // gerekli elemanları alma (toplam fiyat)
  const total = screen.getByRole("heading", { name: /Çeşitler Ücreti:/i });

  // ekle butonlarını çağırma
  const addButtons = await screen.findAllByRole("button", { name: /Ekle/i });

  // bir tane çeşit ekle ve fiyatı kontrol et
  await user.click(addButtons[0]);

  expect(total).toHaveTextContent("2");

  // vanilyalı butonuna 2 tane daha ekle ve fiyatı kontrol et
  await user.dblClick(addButtons[1]);
  expect(total).toHaveTextContent("6");
});

test("Çeşit sıfırlama işleminin toplama yansıması", async () => {
  render(<Scoops />);

  const user = userEvent.setup();

  // gerekli elemanlar

  const total = screen.getByRole("heading", { name: /Çeşitler Ücreti:/i });

  const deleteBtn = await screen.findAllByRole("button", { name: "Sıfırla" });
  const addBtn = await screen.findAllByRole("button", { name: "Ekle" });

  // 2 farklı çeşit ekleme
  await user.click(addBtn[2]);
  await user.dblClick(addBtn[3]);

  expect(total).toHaveTextContent(6);

  // sepette bir adet olan çeşiti sıfırla ve toplamı kontrol et

  await user.click(deleteBtn[2]);
  expect(total).toHaveTextContent(4);

  // sepette iki adet olan çeşiti sıfırla ve toplamı kontrol et

  await user.click(deleteBtn[3]);
  expect(total).toHaveTextContent(0);
});
