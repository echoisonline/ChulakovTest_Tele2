window.addEventListener("load", () => {
  let city = localStorage.getItem("selectedCity");
  if (!city) {
    city = "Санкт Петербург";
    localStorage.setItem("selectedCity", city);
  }

  const alreadyConfirmed = localStorage.getItem("cityConfirmed");
  if (!alreadyConfirmed) {
    document.getElementById("city-confirm").style.display = "flex";
  }

  const cityElement = document.getElementById("selected-city");
  if (cityElement) {
    cityElement.textContent = city;
  }

  const cityText = document.querySelector(".city-confirm__text");
  if (cityText) {
    cityText.textContent = `Ваш регион ${city}?`;
  }
});

function confirmCity(answer) {
  document.getElementById("city-confirm").style.display = "none";

  if (answer) {
    localStorage.setItem("cityConfirmed", "true");
  }
}

function showCitySelector() {
  document.getElementById("city-confirm").style.display = "none";
  document.getElementById("city-selector").style.display = "flex";
  document.getElementById("city-selector").style.top = "60px";
}

function selectCity(cityName) {
  document.getElementById("city-selector").style.display = "none";
  localStorage.setItem("cityConfirmed", "true");
  localStorage.setItem("selectedCity", cityName);

  const cityElement = document.getElementById("selected-city");
  if (cityElement) {
    cityElement.textContent = cityName;
  }

  const cityText = document.querySelector(".city-confirm__text");
  if (cityText) {
    cityText.textContent = `Ваш регион ${cityName}?`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cityDisplay = document.getElementById("location-picker");

  if (cityDisplay) {
    cityDisplay.addEventListener("click", () => {
      document.getElementById("city-selector").style.display = "flex";
    });
  }
});

document.querySelector(".button__accept")?.addEventListener("click", () => {
  document.getElementById("promo-modal").style.display = "flex";
});

function closePromoModal() {
  document.getElementById("promo-modal").style.display = "none";
}

document.getElementById("scrollTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

async function fetchGitHubUsers(page = 1) {
  const res = await fetch(
    `https://api.github.com/users?since=${(page - 1) * 10}`
  );
  const users = await res.json();

  const slider = document.getElementById("userSlider");
  slider.innerHTML = "";

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.innerHTML = `<strong>${user.login}</strong>`;
    userCard.onclick = () => openUserModal(user);
    slider.appendChild(userCard);
  });

  renderPagination(page);
}

function renderPagination(currentPage) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const dot = document.createElement("button");
    dot.onclick = () => fetchGitHubUsers(i);
    pagination.appendChild(dot);
  }
}

function openUserModal(user) {
  document.getElementById(
    "modalUsername"
  ).textContent = `Пользователь: ${user.login}`;
  document.getElementById("modalLogin").textContent = `ID: ${user.id}`;
  document.getElementById("userModal").style.display = "flex";
}

function closeUserModal() {
  document.getElementById("userModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  fetchGitHubUsers();
});
