const search = document.getElementById("search"),
    button = document.getElementById("button");
const error404 = document.querySelector(".error"),
    container = document.querySelector(".weather"),
    details = document.querySelector(".details"),
    weatherDetails = document.querySelector(".weather-details");

search.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        animacion();
        searching();
    }
});

button.addEventListener("click", function () {
    animacion();
    searching();
});

function animacion() {
    container.classList.add("mostrar");
}

function searching() {
    // Carga el archivo JSON de manera asíncrona usando Fetch
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            const APIKey = config.APIKey;
            const city = search.value;

            if (city === "") {
                return;
            }

            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`
            )
                .then((response) => response.json())
                .then((json) => {
                    if (json.cod === "404") {
                        container.classList.remove("mostrar");
                        error404.classList.add("mostrar");
                    } else {
                        const image = document.querySelector(".details img");
                        const temperature = document.querySelector(".details .temperature");
                        const description = document.querySelector(".details .description");
                        const humidity = document.querySelector(".huminitySpan");
                        const wind = document.querySelector(".huminityWind");

                        switch (json.weather[0].main) {
                            case "Clear":
                                image.src = "assets/clear.png";
                                break;
                            case "Rain":
                                image.src = "assets/rain.png";
                                break;
                            case "Snow":
                                image.src = "assets/snow.png";
                                break;
                            case "Haze":
                                image.src = "assets/haze.png";
                                break;
                            case "Clouds":
                                image.src = "assets/cloud.png";
                                break;
                            default:
                                image.src = '';
                        }
                        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                        description.innerHTML = `${json.weather[0].description}`;
                        humidity.innerHTML = `${json.main.humidity}%`;
                        wind.innerHTML = `${json.wind.speed}Km/h`;

                        container.classList.add("mostrar");
                        error404.classList.remove("mostrar");
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud de clima:', error);
                });
        })
        .catch(error => {
            console.error('Error en la carga del archivo de configuración:', error);
        });
}
