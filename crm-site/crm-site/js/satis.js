// crm-site/js/satis.js

document.addEventListener('DOMContentLoaded', () => {
  const satisForm = document.getElementById('satisForm');
  const satisTablosu = document.querySelector('#satisTablosu tbody');

  function satisListele() {
    satisTablosu.innerHTML = '';
    const satislar = JSON.parse(localStorage.getItem('satislar')) || [];

    satislar.forEach((satis, index) => {
      const satir = document.createElement('tr');
      satir.innerHTML = `
        <td>${satis.email}</td>
        <td>${satis.urun}</td>
        <td>${satis.tutar} ₺</td>
        <td>${satis.tarih}</td>
        <td><button class="btn btn-small" onclick="satisSil(${index})">Sil</button></td>
      `;
      satisTablosu.appendChild(satir);
    });
  }

  satisForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const urun = document.getElementById('urun').value;
    const tutar = document.getElementById('tutar').value;
    const tarih = document.getElementById('tarih').value;

    const yeniSatis = { email, urun, tutar, tarih };

    const satislar = JSON.parse(localStorage.getItem('satislar')) || [];
    satislar.push(yeniSatis);
    localStorage.setItem('satislar', JSON.stringify(satislar));

    satisForm.reset();
    satisListele();
  });

  window.satisSil = function(index) {
    const satislar = JSON.parse(localStorage.getItem('satislar')) || [];
    satislar.splice(index, 1);
    localStorage.setItem('satislar', JSON.stringify(satislar));
    satisListele();
  };

  satisListele();
});
