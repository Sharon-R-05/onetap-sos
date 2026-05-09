function startCountdown() {
    console.log("Countdown started!");
    let seconds = 5;
    let cdOverlay = document.getElementById('countdownOverlay');
    let cdNum = document.getElementById('cdNum');
    
    if (cdOverlay) {
        cdOverlay.style.display = 'flex';
        if (cdNum) cdNum.textContent = seconds;
    }
    
    let timer = setInterval(() => {
        seconds--;
        if (cdNum) cdNum.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(timer);
            if (cdOverlay) cdOverlay.style.display = 'none';
            
            // TRIGGER SOS
            let alertBox = document.getElementById('alertOverlay');
            let alertText = document.getElementById('alertMsgText');
            if (alertBox) {
                alertBox.style.display = 'flex';
                alertText.innerHTML = "🚨 EMERGENCY ACTIVATED! 🚨<br><br>📍 Getting your location...";
            }
            
            // Get location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    let loc = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
                    if (alertText) {
                        alertText.innerHTML = `🚨 EMERGENCY ACTIVATED! 🚨<br><br>📍 Location: ${loc}<br>⏰ Time: ${new Date().toLocaleString()}`;
                    }
                });
            }
            
            // Flash
            document.body.style.backgroundColor = 'red';
            setTimeout(() => document.body.style.backgroundColor = '', 2000);
            
            console.log("✅ SOS TRIGGERED!");
        }
    }, 1000);
}

// Replace the button click handler
let sosButton = document.getElementById('sosMainBtn') || document.querySelector('.sos-button');
if (sosButton) {
    let oldClick = sosButton.onclick;
    sosButton.onclick = function(e) {
        e.preventDefault();
        startCountdown();
    };
    console.log("✅ SOS button fixed! Click it now!");
}