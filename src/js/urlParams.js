window.onload = function() {
    console.log('Window loaded');
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('kpd');
  
    const namaElement = document.getElementById('nama');
    namaElement.textContent = name ? name : 'Untuk Kamu';
  };