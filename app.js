const accesskey = "66HwwCtB6Jkt2Sq6i3F-2lcaWg9yVWHqxaGUKzi3OsY";

const formEl = document.querySelector("form");
const inputEL = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("showMoreButton");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEL.value; // Corrected input value retrieval
    const encodedInputData = encodeURIComponent(inputData); // Encode input data

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodedInputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", (event) => {
    searchImages();
});
