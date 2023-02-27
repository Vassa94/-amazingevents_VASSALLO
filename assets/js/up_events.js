fetch("/assets/data.json")
    .then(response => response.json())
    .then(data => {

        const cards = data;

        const cardFragment = document.createDocumentFragment();
        for (let i = 0; i < cards.events.length; i++) {
            if (cards.events[i].date > cards.currentDate) {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card', 'm-2');
                cardElement.style.width = '18rem';
                cardElement.innerHTML = `
                        <img src="${cards.events[i].image}" class="card-img-top" alt="${cards.events[i].name}">
                        <div class="card-body">
                            <h5 class="card-title">${cards.events[i].name}</h5>
                            <p class="card-text">${cards.events[i].description}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center ">
                            <a href="">Precios: $${cards.events[i].price}</a>
                            <a href="/pages/details.html?cardData=${encodeURIComponent(JSON.stringify(cards.events[i]))}" class="btn btn-ae border">Ver más...</a>
                        </div>`;

                cardFragment.appendChild(cardElement);
            }
        }

        const cardContainer = document.getElementById('card-container');
        cardContainer.appendChild(cardFragment);

        $(document).ready(function () {
            $('#card-container').slick({
                infinite: true,
                slidesToShow: 6,
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
        });
    })
    .catch(error => console.error(error));
