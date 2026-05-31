const popup = document.getElementById("popup");

const closeBtn = document.getElementById("closeBtn");

const popupImg = document.getElementById("popup-img");

const popupTitle = document.getElementById("popup-title");

const popupCategory = document.getElementById("popup-category");

const popupLocation = document.getElementById("popup-location");

const popupDescription = document.getElementById("popup-description");

// UNIVERSAL POPUP FUNCTION

function openPopup(item){

    popup.style.display = "flex";

    popupImg.src = item.image;
    popupTitle.innerText = item.title || item.name;
    popupCategory.innerText = item.category || "";
    popupLocation.innerText = item.location || "";
    popupDescription.innerText = item.description || "";

    
    popupMap.src = item.map || "https://www.google.com/maps?q=Bahawalpur&output=embed";
}


// CLOSE POPUP

closeBtn.addEventListener("click", () => {

    popup.style.display = "none";

});

fetch("http://localhost:3000/places")

.then(res => res.json())

.then(data => {

    const container = document.getElementById("places-container");

    data.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("place-card");

        card.innerHTML = `

            <img src="${item.image}">

            <h2>${item.name}</h2>

        `;

        card.addEventListener("click", () => {

            openPopup(item);

        });

        container.appendChild(card);

    });

});

fetch("http://localhost:3000/foods")

.then(res => res.json())

.then(data => {

    const container = document.getElementById("places-container");

    data.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("place-card");

        card.innerHTML = `

            <img src="${item.image}">

            <h2>${item.name}</h2>

        `;

        card.addEventListener("click", () => {

            openPopup(item);

        });

        container.appendChild(card);

    });

});

fetch("http://localhost:3000/restaurants")

.then(res => res.json())

.then(data => {

    const container = document.getElementById("places-container");

    data.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("place-card");

        card.innerHTML = `

            <img src="${item.image}">

            <h2>${item.name}</h2>

        `;

        card.addEventListener("click", () => {

            openPopup(item);

        });

        container.appendChild(card);

    });

});

fetch("http://localhost:3000/hotels")

.then(res => res.json())

.then(data => {

    const container = document.getElementById("places-container");

    data.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("place-card");

        card.innerHTML = `

            <img src="${item.image}">

            <h2>${item.name}</h2>

        `;

        card.addEventListener("click", () => {

            openPopup(item);

        });

        container.appendChild(card);

    });

});
