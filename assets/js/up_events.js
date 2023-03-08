let cards = [];
const $checks = document.getElementById('category-section');
const $search = document.querySelector('input[placeholder="Search"]');

function dataFetch() {
    fetch("/assets/data.json")
        .then(response => response.json())
        .then(data => {
            cards = data;
            displayCards(cards.events)
            carrousel(cards.events);
            displayCategory(cards.events);
        })
        .catch(error => console.error(error));
}

dataFetch();

function displayCards(array) {
    const cardContainer = document.getElementById('card-container');
    const noResults = document.getElementById('no-results');
    cardContainer.innerHTML = ''; 

    const cardFragment = document.createDocumentFragment();
    array.forEach((element) => {
        if (element.date > cards.currentDate) {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card', 'm-2');
            cardElement.style.width = '18rem';
            cardElement.innerHTML = `
                <img src="${element.image}" class="card-img-top" alt="${element.name}">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center ">
                    <a href="">Precios: $${element.price}</a>
                    <a href="/pages/details.html?cardData=${encodeURIComponent(JSON.stringify(element))}" class="btn btn-ae border">Ver más...</a>
                </div>`;
            cardFragment.appendChild(cardElement);
        }
    });

    cardContainer.appendChild(cardFragment);

    if (array.length === 0) {
        noResults.classList.remove('d-none'); 
    } else {
        noResults.classList.add('d-none');
    }



}

const carrousel = (array) => {
    let slidesToShow = 5;
    if (array.length <= 5) { 
        slidesToShow = array.length; 
    }
    $('#card-container').slick({
        infinite: true,
        centerMode: array.length > 5,
        focusOnSelect: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1460,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ],
        prevArrow: $('#slider-controls .btn-prev'),
        nextArrow: $('#slider-controls .btn-next')
    });
}

const catArray = (array) => {
    const categoriesSet = new Set();
    array.forEach((event) => categoriesSet.add(event.category));
    return Array.from(categoriesSet);
}

function displayCategory(array) {
    let category = catArray(array);
    const catFragment = document.createDocumentFragment();
    category.forEach((element) => {
        const catElement = document.createElement('label');
        catElement.classList.add('form-check-label');
        catElement.innerHTML = `
            <input type="checkbox" id="${element.toLowerCase()}" class="form-check-input" name="${element}">
            ${element}`;
        catFragment.appendChild(catElement);
    });
    const catContainer = document.getElementById('category-section');
    catContainer.appendChild(catFragment);
}

const searchFilter = (array, search) => {
    let filteredArray = array.filter(element => element.name.toLowerCase().includes(search.toLowerCase()))
    return filteredArray
}

const categoryFilter = (array) => {
    let checked = document.querySelectorAll('input[type="checkbox"]:checked');
    let categories = Array.from(checked).map(el => el.id.toLowerCase());
    let filteredArray = array.filter(element => categories.some(category => element.category.toLowerCase().includes(category)));
    return filteredArray;
}

const unifiedFilter = (array) => {
    let filteredArray = searchFilter(array, $search.value);
    let checkedCategories = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedCategories.length > 0) {
        filteredArray = categoryFilter(filteredArray);
    }
    return filteredArray;
};

$checks.addEventListener('change', () => {
    let dataFilter = unifiedFilter(cards.events)
    $('#card-container').slick('unslick');
    displayCards(dataFilter)
    carrousel(dataFilter);

})

$search.addEventListener('input', (e) => {
    let dataFilter = unifiedFilter(cards.events)
    $('#card-container').slick('unslick');
    displayCards(dataFilter);
    carrousel(dataFilter);
})




