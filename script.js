document.addEventListener('DOMContentLoaded', () => {
    // Set the birthday date to July 11th of the current year
    const birthdayDate = new Date(`July 11, ${new Date().getFullYear()} 00:00:00`).getTime();

    // Elements for countdown
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Message and Gift elements
    const revealMessageBtn = document.getElementById('revealMessageBtn');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const openGiftBtn = document.getElementById('openGiftBtn');
    const giftContent = document.getElementById('giftContent');

    // Confetti container
    const confettiContainer = document.querySelector('.confetti-container');

    // --- Countdown Timer Logic ---
    const updateCountdown = () => {
        const now = new Date().getTime();
        let distance = birthdayDate - now;

        // If the birthday has passed this year, calculate for next year
        if (distance < 0) {
            const nextYearBirthday = new Date(`July 11, ${new Date().getFullYear() + 1} 00:00:00`).getTime();
            distance = nextYearBirthday - now;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-section h2').textContent = "Happy Birthday!!!";
            document.getElementById('countdown').innerHTML = "<p>It's your special day!</p>";
            triggerConfettiBurst(); // Trigger confetti when it's her birthday
        }
    };

    // Update the countdown every 1 second
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Call immediately to avoid initial flicker


    // --- Message Reveal Logic ---
    revealMessageBtn.addEventListener('click', () => {
        birthdayMessage.classList.add('visible');
        revealMessageBtn.style.display = 'none'; // Hide button after reveal
    });

    // --- Gift Content Reveal Logic ---
    openGiftBtn.addEventListener('click', () => {
        giftContent.classList.toggle('visible');
        if (giftContent.classList.contains('visible')) {
            openGiftBtn.textContent = 'Close Gift 🎁';
            triggerConfettiBurst(); // Confetti when opening gift
        } else {
            openGiftBtn.textContent = '🎉 Open Your Birthday Gift! 🎉';
        }
    });

    // --- Confetti Animation Logic ---
    const triggerConfettiBurst = () => {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`; // Random color
            confetti.style.animationDuration = `${Math.random() * 2 + 1}s`; // 1 to 3 seconds
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            confetti.style.opacity = '1';
            confettiContainer.appendChild(confetti);

            // Remove confetti after animation to prevent DOM bloat
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    };
});