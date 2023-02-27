const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cardData = JSON.parse(decodeURIComponent(urlParams.get('cardData')));


console.log(cardData)

const detailContainer = document.querySelector('#details');
const cardElement = document.createElement('div');
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
        </article>
    `;
    detailContainer.appendChild(details);

/*  */

/*  <div class="card m-2" style="width: 18rem;">
    <img src="${cards.events[i].image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${cards.events[i].name}</h5>
        <p class="card-text">${cards.events[i].description}</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center ">
        <a href="">Precios: $${cards.events[i].price}</a>
        <a href="/pages/details.html?cardData=${encodeURIComponent(JSON.stringify(card))}" class="btn btn-ae border">Ver más...</a>                </div>
</div> */