// crm-site/js/musteri.js

document.addEventListener('DOMContentLoaded', () => {
  const musteriForm = document.getElementById('musteriForm');
  const musteriTablosu = document.querySelector('#musteriTablosu tbody');

  function musteriListele() {
    musteriTablosu.innerHTML = '';
    const musteriler = JSON.parse(localStorage.getItem('musteriler')) || [];

    musteriler.forEach((musteri, index) => {
      const satir = document.createElement('tr');
      satir.innerHTML = `
        <td>${musteri.adSoyad}</td>
        <td>${musteri.telefon}</td>
        <td>${musteri.email}</td>
        <td>${musteri.adres}</td>
        <td><button class="btn btn-small" onclick="musteriSil(${index})">Sil</button></td>
      `;
      musteriTablosu.appendChild(satir);
    });
  }

  musteriForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const adSoyad = document.getElementById('adSoyad').value;
    const telefon = document.getElementById('telefon').value;
    const email = document.getElementById('email').value;
    const adres = document.getElementById('adres').value;

    const yeniMusteri = { adSoyad, telefon, email, adres };

    const musteriler = JSON.parse(localStorage.getItem('musteriler')) || [];
    musteriler.push(yeniMusteri);
    localStorage.setItem('musteriler', JSON.stringify(musteriler));

    musteriForm.reset();
    musteriListele();
  });

  window.musteriSil = function(index) {
    const musteriler = JSON.parse(localStorage.getItem('musteriler')) || [];
    musteriler.splice(index, 1);
    localStorage.setItem('musteriler', JSON.stringify(musteriler));
    musteriListele();
  };

  musteriListele();
});
