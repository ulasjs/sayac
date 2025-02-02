document.addEventListener("DOMContentLoaded", function() {
    // 📌 Türkiye Saati ile Geri Sayım (1 Haziran 2025, 00:00)
    let targetDate = new Date("2025-10-01T00:00:00+03:00").getTime();
    let countdownElement = document.getElementById("countdown");

    function updateCountdown() {
        let now = new Date().getTime();
        let timeLeft = targetDate - now;

        if (timeLeft > 0) {
            let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days} Gün ${hours} Saat ${minutes} Dakika ${seconds} Saniye`;
        } else {
            countdownElement.innerHTML = "Süre doldu!";
        }
    }

    updateCountdown(); // İlk çalıştırma
    setInterval(updateCountdown, 1000); // Her saniye yenile

    // 🎵 Radyo Çalar (Tek Bir Audio Nesnesi ile Çalıştırma)
    const radioIcon = document.getElementById("radio-icon");
    const volumeControls = document.getElementById("volume-controls");
    const volumeSlider = document.getElementById("volume-slider");

    // 📌 Eğer daha önce bir radyo sesi açıksa, onu kullan (Yeni ses oluşturmaz!)
    if (!window.radioAudio) {
        window.radioAudio = new Audio("https://radyo.duhnet.tv/slowturk");
    }
    let audio = window.radioAudio;
    let isPlaying = false;

    radioIcon.addEventListener("click", function() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying; // Durumu tersine çevir
        volumeControls.style.display = isPlaying ? "block" : "none";
    });

    volumeSlider.addEventListener("input", function(e) {
        audio.volume = e.target.value;
    });

    // 📌 Sayfa kapanınca veya değişince radyoyu durdur
    window.addEventListener("beforeunload", function() {
        audio.pause();
    });

    // 🛑 Sağ Tıklama & Kaynak Kodu Engelleme
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && (e.key === "u" || e.key === "U")) e.preventDefault();
        if (e.key === "F12") e.preventDefault();
        if (e.ctrlKey && e.shiftKey && e.key === "I") e.preventDefault();
    });

    // ⭐ Kayan Yıldız Efekti
    function createStar() {
        let star = document.createElement("div");
        star.classList.add("star");
        star.style.left = Math.random() * window.innerWidth + "px";
        star.style.top = "-10px";
        let size = Math.random() * 5 + 2;
        star.style.width = size + "px";
        star.style.height = size + "px";
        let duration = Math.random() * 3 + 2;
        star.style.animationDuration = duration + "s";
        document.body.appendChild(star);
        setTimeout(() => star.remove(), duration * 1000);
    }

    setInterval(createStar, 1000);
});