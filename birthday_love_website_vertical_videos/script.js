const PASSWORD = "1110";

const lockScreen = document.getElementById("lockScreen");
const mainSite = document.getElementById("mainSite");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMessage = document.getElementById("errorMessage");
const heartField = document.getElementById("heartField");

function unlock() {
  if (passwordInput.value === PASSWORD) {
    errorMessage.classList.remove("show");
    lockScreen.classList.add("unlocked");
    setTimeout(() => {
      lockScreen.style.display = "none";
      mainSite.classList.add("visible");
      startHearts();
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 850);
  } else {
    errorMessage.classList.remove("show");
    void errorMessage.offsetWidth;
    errorMessage.classList.add("show");
    passwordInput.value = "";
    passwordInput.focus();
    passwordInput.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-7px)" },
        { transform: "translateX(7px)" },
        { transform: "translateX(0)" }
      ],
      { duration: 280 }
    );
  }
}

unlockBtn.addEventListener("click", unlock);
passwordInput.addEventListener("keydown", e => {
  if (e.key === "Enter") unlock();
});

/* Floating hearts */
function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > .15 ? "♥" : "♡";

  const size = 10 + Math.random() * 23;
  const duration = 6 + Math.random() * 8;
  const left = Math.random() * 100;
  const drift = (Math.random() * 180 - 90).toFixed(0) + "px";
  const rotation = (Math.random() * 90 - 45).toFixed(0) + "deg";

  heart.style.left = left + "%";
  heart.style.fontSize = size + "px";
  heart.style.animationDuration = duration + "s";
  heart.style.setProperty("--drift", drift);
  heart.style.setProperty("--rot", rotation);

  heartField.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

function startHearts() {
  for (let i = 0; i < 22; i++) setTimeout(createHeart, i * 180);
  setInterval(createHeart, 430);
}

/* Flip cards */
document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("click", () => card.classList.toggle("flipped"));
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.toggle("flipped");
    }
  });
});

/* Love letter */
const letterBtn = document.getElementById("letterBtn");
const finalMessage = document.getElementById("finalMessage");
const closeLetter = document.getElementById("closeLetter");

letterBtn.addEventListener("click", () => {
  if (!letterBtn.classList.contains("open")) {
    letterBtn.classList.add("open");
    setTimeout(() => finalMessage.classList.add("open"), 850);
  } else {
    finalMessage.classList.add("open");
  }
});

closeLetter.addEventListener("click", () => finalMessage.classList.remove("open"));
finalMessage.addEventListener("click", e => {
  if (e.target === finalMessage) finalMessage.classList.remove("open");
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") finalMessage.classList.remove("open");
});
