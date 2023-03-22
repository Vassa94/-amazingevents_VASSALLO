const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = JSON.parse(decodeURIComponent(urlParams.get('cardId')));





function dataFetch() {
    fetch("/assets/data.json")
        .then(response => response.json())
        .then(data => {
            const eventArray = data.events;
            const event = eventArray.filter(event => event._id === id).find(evento => evento)
            displayDetail(event);
        })
        .catch(error => console.error(error));
}

dataFetch();



function displayDetail(data) {
    const detailContainer = document.querySelector('#details');
    const details = document.createElement('div');
    details.classList.add('contenedorDiv', 'p-3', 'm-2', 'border')
    details.innerHTML = `    
            <figure class="border h-100 sombra-photo">
                <img class="detail-photo p-2" src="${data.image}" alt="Photo">
            </figure>
            <article class=" contenedorText border h-100 p-2">
                <h4>
                    ${data.name}
                </h4>
                <p>
                    ${data.description}
                </p>
                <p>
                    Date: ${data.date}
                </p>
                <p>
                    Capacity: ${data.capacity} 
                </p>
                <p>
                    ${data.assistance ? `Assistance: ${data.assistance}` : `Estimate: ${data.estimate}`}
                </p>
                <p>
                    Price:  $${data.price}
                </p>
            </article>
        `;
    detailContainer.appendChild(details);
}
/* */

