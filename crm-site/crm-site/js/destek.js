// crm-site/js/destek.js

document.addEventListener('DOMContentLoaded', () => {
  const destekForm = document.getElementById('destekForm');
  const destekTablosu = document.querySelector('#destekTablosu tbody');

  function destekListele() {
    destekTablosu.innerHTML = '';
    const destekler = JSON.parse(localStorage.getItem('destekler')) || [];

    destekler.forEach((destek, index) => {
      const satir = document.createElement('tr');
      satir.innerHTML = `
        <td>${destek.email}</td>
        <td>${destek.detay}</td>
        <td>${destek.tarih}</td>
        <td><button class="btn btn-small" onclick="destekSil(${index})">Sil</button></td>
      `;
      destekTablosu.appendChild(satir);
    });
  }

  destekForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const detay = document.getElementById('detay').value;
    const tarih = document.getElementById('tarih').value;

    const yeniDestek = { email, detay, tarih };

    const destekler = JSON.parse(localStorage.getItem('destekler')) || [];
    destekler.push(yeniDestek);
    localStorage.setItem('destekler', JSON.stringify(destekler));

    destekForm.reset();
    destekListele();
  });

  window.destekSil = function(index) {
    const destekler = JSON.parse(localStorage.getItem('destekler')) || [];
    destekler.splice(index, 1);
    localStorage.setItem('destekler', JSON.stringify(destekler));
    destekListele();
  };

  destekListele();
});
