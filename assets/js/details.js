const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cardData = JSON.parse(decodeURIComponent(urlParams.get('cardData')));

console.log(cardData);


const detailContainer = document.querySelector('#details');
const details = document.createElement('div');
details.classList.add('contenedorDiv','p-3', 'm-2', 'border')
details.innerHTML = `    
        <figure class="border h-100 sombra-photo">
            <img class="detail-photo p-2" src="${cardData.image}" alt="Photo">
        </figure>
        <article class=" contenedorText border h-100 p-2">
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
                ${cardData.assistance ? `Assistance: ${cardData.assistance}` : `Estimate: ${cardData.estimate}`}
            </p>
            <p>
               Price:  $${cardData.price}
            </p>
        </article>
    `;
detailContainer.appendChild(details);

