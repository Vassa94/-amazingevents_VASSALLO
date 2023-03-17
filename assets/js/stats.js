let events = [];
let currentDate
let maxAttendanceEvent
const upcomingStatistics = document.getElementById('upcomingStatistics')
const pastStatistics = document.getElementById('pastStatistics')



function dataFetch() {
    fetch("/assets/data.json")
        .then(response => response.json())
        .then(data => {
            events = data.events;
            currentDate = data.currentDate;
            maxAttendanceEvent = getMaxAttendanceEvent(events);
            lowestAttendanceEvent = getLowestPercentAttendance(events);
            maxCapacityEvent = getMaxCapacityEvent(events);
            const upcomingEventsDetails = getCategoryDetails(events, "upcoming");
            const pastEventsDetails = getCategoryDetails(events, "past");
            displayEventsStatistics();
            displayCategoryStatistics(upcomingEventsDetails, upcomingStatistics);
            displayCategoryStatistics(pastEventsDetails, pastStatistics)
        })
        .catch(error => console.error(error));
}

dataFetch();

function getMaxAttendanceEvent(events) {
    let maxAttendancePercent = 0;
    let maxAttendanceEvent = null;
    events.forEach(event => {
        let attendancePercent = (event.assistance / event.capacity) * 100;
        if (attendancePercent > maxAttendancePercent) {
            maxAttendancePercent = attendancePercent;
            maxAttendanceEvent = event;
        }
    });
    return maxAttendanceEvent.name;

}

function getLowestPercentAttendance() {
    let minAttendancePercent = 100;
    let minAttendanceEvent = null;
    events.forEach(event => {
        let attendancePercent = (event.assistance / event.capacity) * 100;
        if (attendancePercent < minAttendancePercent) {
            minAttendancePercent = attendancePercent;
            minAttendanceEvent = event;
        }
    });
    return minAttendanceEvent.name;
}

function getMaxCapacityEvent(events) {
    let maxCapacity = 0;
    let maxCapacityEvent = null;
    events.forEach(event => {
        if (event.capacity > maxCapacity) {
            maxCapacity = event.capacity;
            maxCapacityEvent = event;
        }
    });
    return maxCapacityEvent.name;
}

function getCategoryDetails(events, categoryType) {
    let filteredEvents = [];

    if (categoryType === "upcoming") {
        filteredEvents = events.filter((event) => event.date >= currentDate);
    } else if (categoryType === "past") {
        filteredEvents = events.filter((event) => event.date < currentDate);
    }
    console.log(filteredEvents)
    /* Crear un objeto con las categorías como claves y los valores son el nombre, los ingresos, la
    asistencia y el número de eventos. */
    const categories = {};

    filteredEvents.forEach((event) => {
        if (!categories[event.category]) {
            categories[event.category] = {
                name: event.category,
                revenue: 0,
                attendance: 0,
                capacity: 0,
                eventCount: 0,
            };
        }

        const attendance = event.assistance || event.estimate;
        const revenue = event.price * attendance;

        categories[event.category].revenue += revenue;
        categories[event.category].attendance += attendance;
        categories[event.category].eventCount++;
        categories[event.category].capacity += event.capacity;
    });
    console.log(categories)
    const categoriesArray = [];

    /* Iterando a través del objeto de categorías y empujando el nombre, los ingresos y el porcentaje
    de asistencia a las categoríasArray. */
    for (const category in categories) {
        const revenue = categories[category].revenue.toFixed(2);
//        const attendancePercentage = ((categories[category].attendance / (categories[category].eventCount * categories[category].capacity)) * 100).toFixed(2);
        const attendancePercentage = ((categories[category].attendance * 100)/ categories[category].capacity).toFixed(2);


        categoriesArray.push({
            name: categories[category].name,
            revenue: revenue,
            attendancePercentage: attendancePercentage + "%",
        });
    }
    

    return categoriesArray
}

function displayEventsStatistics() {
    const rowContainer = document.getElementById('eventStatistics');
    const tablebody = document.createElement('tbody');
    tablebody.classList.add();
    tablebody.innerHTML = `
        <tr>
        <td>${maxAttendanceEvent}</td>
        <td>${lowestAttendanceEvent}</td>
        <td>${maxCapacityEvent}</td>
    </tr>`;
    rowContainer.appendChild(tablebody);
}

function displayCategoryStatistics(array, id) {
    const rowFragment = document.createDocumentFragment();
    array.forEach((element) => {
        const row = document.createElement('tr');
        row.classList.add();
        row.innerHTML = `
        <td>${element.name}</td>
        <td>$${element.revenue.toLocaleString()}</td>
        <td>${element.attendancePercentage}</td>
    `;
        rowFragment.appendChild(row);
    });
    id.appendChild(rowFragment);
}

