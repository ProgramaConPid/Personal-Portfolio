import showParticlesDarkMode from "./js/particlesConfig.js";

// Detect environment and set API_URL
const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const API_URL = isLocalhost
  ? "http://localhost:3000"              
  : "https://personal-portfolio-i7vv.onrender.com";  

// Loader hide on page load
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 1500);
  }
});

// Show Particles Effect
showParticlesDarkMode();

// Light - Dark Mode
const inputSubmit = document.getElementById("input__submit");

const iconTheme = document.getElementById("icon__theme");
const initialIcon = "url(./imgs/sun__icon.png)";
iconTheme.style.backgroundImage = initialIcon;

iconTheme.addEventListener("click", () => {
  document.body.classList.toggle("light__mode");
  const lightMode = document.body.classList.contains("light__mode");

  let navLogo = document.querySelector(".nav__logo--text");
  const nav = document.querySelector(".navbar");
  const links = document.querySelectorAll("#nav__link");
  const aboutTitle = document.querySelector(".about__me--title");
  const titles = [...document.getElementsByClassName("title")];
  const socialIcons = document.querySelectorAll(".contact__link");
  const inputs = document.querySelectorAll(".input__field");
  const textarea = document.getElementById("message");
  const footer = document.querySelector(".footer");

  links.forEach((link) => {
    link = lightMode
      ? link.classList.add("dark")
      : link.classList.remove("dark");
  });

  titles.forEach((title) => {
    title = lightMode
      ? title.classList.add("dark")
      : title.classList.remove("dark");
  });

  socialIcons.forEach((socialIcon) => {
    socialIcon = lightMode
      ? socialIcon.classList.add("dark")
      : socialIcon.classList.remove("dark");
  });

  inputs.forEach((input) => {
    input = lightMode
      ? input.classList.add("dark")
      : input.classList.remove("dark");
  });

  navLogo = lightMode
    ? navLogo.classList.add("dark")
    : navLogo.classList.remove("dark");

  if (lightMode) {
    aboutTitle.classList.add("dark");
    nav.classList.add("light");
    footer.classList.add("dark");
    inputSubmit.classList.add("dark");
    textarea.classList.add("dark");
    iconTheme.style.backgroundImage = "url(./imgs/moon__icon.png)";
  } else {
    aboutTitle.classList.remove("dark");
    nav.classList.remove("light");
    footer.classList.remove("dark");
    inputSubmit.classList.remove("dark");
    textarea.classList.remove("dark");
    iconTheme.style.backgroundImage = initialIcon;
  }
});

// Elements
const hamburguerMenu = document.querySelector("#hamburguer__menu");
const responsiveNav = document.querySelector(".nav__links");
const links = document.querySelectorAll(".nav__link");

// Show Menu (Tablet and Mobile)
hamburguerMenu.addEventListener("click", () => {
  responsiveNav.classList.toggle("active");
});

// Remove class .active from CSS once the user click any link
links.forEach((link) => {
  link.addEventListener("click", () => {
    if (responsiveNav.classList.contains("active")) {
      responsiveNav.classList.remove("active");
    }
  });
});

async function postUserToDB(name, email, message) {
  try {
    const res = await fetch(`${API_URL}/form/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (!res.ok) {
      throw new Error("Error sending data.");
    }

    Swal.fire({
      title: "Form sent successfully",
      text: "I will be contacting you very soon.",
      icon: "success",
    });

    form.reset();
  } catch (error) {
    Swal.fire({
      title: "Error sending data.",
      text: "An error occurred while sending the data, please try again later.",
      icon: "error",
    });
    console.error(error);
  }
}

// Form Section
const form = document.getElementById("form");
const errorMessages = document.getElementsByClassName("errorMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputName = document.getElementById("name").value.trim();
  const inputEmail = document.getElementById("email").value.trim();
  const inputMessage = document.getElementById("message").value.trim();
  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let hasErrors = false;

  if (!inputName) {
    errorMessages[0].textContent = "Debes ingresar un nombre válido";
    hasErrors = true;
  } else {
    errorMessages[0].textContent = "";
  }

  if (!inputEmail || !regEx.test(inputEmail)) {
    errorMessages[1].textContent = "Debes ingresar un email válido";
    hasErrors = true;
  } else {
    errorMessages[1].textContent = "";
  }

  if (hasErrors) {
    return;
  }

  await postUserToDB(inputName, inputEmail, inputMessage);
});
