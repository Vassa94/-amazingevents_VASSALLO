const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cardData = JSON.parse(decodeURIComponent(urlParams.get('cardData')));

console.log(cardData);


const detailContainer = document.querySelector('#details');
const details = document.createElement('div');
details.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'gap-3','p-3', 'm-2', 'border')
details.innerHTML = `    
        <figure class="border w-50 h-100 sombra-photo">
            <img class="detail-photo p-2" src="${cardData.image}" alt="Photo">
        </figure>
        <article class="border w-50 h-100 p-2">
            <h4>
                ${cardData.name}
            </h4>
            <p>
                ${cardData.description}
            </p>
            <p>
                Date: ${cardData.date}
            </p>
            <p>
               Capacity: ${cardData.capacity} 
            </p>
            <p>
               Price:  $${cardData.price}
            </p>
        </article>
    `;
detailContainer.appendChild(details);

/* {
    "id": 3,
    "image": "https://i.postimg.cc/GmHRkbNV/Jurassic-Park.jpg",
    "name": "Jurassic Park",
    "date": "2021-11-02",
    "description": "Let's go meet the biggest dinosaurs in the paleontology museum.",
    "category": "Museum",
    "place": "Field",
    "capacity": 82000,
    "assistance": 65892,
    "price": 15
} */