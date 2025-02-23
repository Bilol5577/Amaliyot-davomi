const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

// Функция для загрузки стран
async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Error fetching countries");
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Функция для отображения стран
function displayCountries(countries) {
    countriesContainer.innerHTML = "";
    countries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("country-card");
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
        `;
        card.addEventListener("click", () => {
            window.location.href = `country.html?name=${country.name.common}`;
        });
        countriesContainer.appendChild(card);
    });
}

// Функция поиска страны
searchInput.addEventListener("input", async () => {
    const query = searchInput.value.toLowerCase();
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();
    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(query)
    );
    displayCountries(filteredCountries);
});

// Фильтрация по континенту
filterSelect.addEventListener("change", async () => {
    const region = filterSelect.value;
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();
    const filteredCountries = region ? countries.filter(country => country.region === region) : countries;
    displayCountries(filteredCountries);
});

// Загрузка стран при открытии страницы
fetchCountries();