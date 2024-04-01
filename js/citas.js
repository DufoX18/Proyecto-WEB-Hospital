const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarTable = document.getElementById('calendar');
    calendarTable.innerHTML = '';

    // Generar encabezado de días de la semana
    const headerRow = calendarTable.insertRow();
    for (let day = 0; day < 7; day++) {
        const th = document.createElement('th');
        th.textContent = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][day];
        headerRow.appendChild(th);
    }

    // Generar días del mes
    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = calendarTable.insertRow();
        for (let j = 0; j < 7; j++) {
            const cell = row.insertCell();
            if (i === 0 && j < firstDay) {
                continue;
            }
            if (date > daysInMonth) {
                break;
            }
            cell.textContent = date;
            date++;
        }
    }

    // Actualizar el mes y año mostrados
    document.getElementById('month-year').textContent = `${months[month]} ${year}`;
}

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

generateCalendar(currentYear, currentMonth);

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
}

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Liberia,CR&appid=d6e78e9973c630eabf2059be4696b433&units=metric';

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const temperature = data.main.temp;
        const location = data.name;

        // Mostrar los datos en la columna de clima
        const climaColumna = document.getElementById('clima-columna');
        climaColumna.innerHTML = `<h5>Temperatura en ${location}: ${temperature}°C</h5>`;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });