window.addEventListener("load", () => {
  const alreadyConfirmed = localStorage.getItem("cityConfirmed");
  if (!alreadyConfirmed) {
    document.getElementById("city-confirm").style.display = "flex";
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
    cityElement.textContent = `${cityName}`;
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
