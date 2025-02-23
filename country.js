const countryDetailsContainer = document.getElementById("country-details");


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


async function fetchCountryDetails() {
    try {
        const countryName = getQueryParam("name");
        if (!countryName) {
            throw new Error("Mamlakat nomi URL'da topilmadi.");
        }

        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
            throw new Error("Mamlakat ma'lumotlarini olishda xatolik yuz berdi.");
        }

        const country = (await response.json())[0];
        displayCountryDetails(country);
    } catch (error) {
        console.error("Xatolik:", error);
        countryDetailsContainer.innerHTML = `<p style="color: red;">Ma'lumotni yuklashda xatolik yuz berdi.</p>`;
    }
}


function displayCountryDetails(country) {
    const lat = country.latlng[0]; 
    const lng = country.latlng[1]; 
    
    countryDetailsContainer.innerHTML = `
        <h1>${country.name.common}</h1>
        <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank">
            <img src="${country.flags.svg}" alt="Flag" style="width: 150px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
        </a>
        <p><strong>Poytaxt:</strong> ${country.capital || "Noma'lum"}</p>
        <p><strong>Aholisi:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Hudud:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion || "Noma'lum"}</p>
        <p><strong>Tillar:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "Noma'lum"}</p>
        <p><strong>Valyuta:</strong> ${country.currencies ? Object.values(country.currencies)[0].name + ` (${Object.keys(country.currencies)[0]})` : "Noma'lum"}</p>
    `;
}

function goBack() {
    window.history.back();
}

fetchCountryDetails();
