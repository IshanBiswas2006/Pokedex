/* ========================================
   DAY / NIGHT THEME
======================================== */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("night");

    if (document.body.classList.contains("night")) {
        themeBtn.textContent = "☀️ Day";
    } else {
        themeBtn.textContent = "🌙 Night";
    }

});


/* ========================================
   DATA
======================================== */

let pokemonData = [];


/* ========================================
   ELEMENTS
======================================== */

const searchBtn =
    document.getElementById("searchBtn");

const pokemonInput =
    document.getElementById("pokemonInput");

const suggestions =
    document.getElementById("suggestions");

const statsImage =
    document.getElementById("statsImage");

const statsPlaceholder =
    document.getElementById("statsPlaceholder");

const statsStatus =
    document.getElementById("statsStatus");


/* ========================================
   LOAD POKÉMON DATA
======================================== */

fetch("./assets/Data/json/pokemon_data.json")

    .then(response => {

        if (!response.ok) {
            throw new Error(
                "pokemon_data.json not found"
            );
        }

        return response.json();

    })

    .then(data => {

        pokemonData = data;

        console.log(
            "Pokémon data loaded:",
            pokemonData.length
        );

    })

    .catch(error => {

        console.error(
            "Error loading Pokémon data:",
            error
        );

    });


/* ========================================
   GET POKÉMON NAME
======================================== */

function getPokemonName(pokemon) {

    return String(
        pokemon.Name ||
        pokemon.name ||
        ""
    ).trim();

}


/* ========================================
   GET POKÉMON NUMBER
======================================== */

function getPokemonNumber(pokemon) {

    const number =
        pokemon["S.no"] ||
        pokemon["S.No"] ||
        pokemon["S.NO"] ||
        pokemon["No."] ||
        pokemon["Number"] ||
        pokemon["ID"] ||
        pokemon["Id"] ||
        "";

    return String(number)
        .replace("#", "")
        .replace(".0", "")
        .trim()
        .padStart(4, "0");

}


/* ========================================
   SEARCH SUGGESTIONS
======================================== */

pokemonInput.addEventListener(
    "input",
    showSuggestions
);


function showSuggestions() {

    const searchText =
        pokemonInput.value
            .trim()
            .toLowerCase();

    suggestions.innerHTML = "";


    if (
        searchText === "" ||
        pokemonData.length === 0
    ) {

        suggestions.style.display = "none";

        return;

    }


    const matches =
        pokemonData
            .filter(pokemon => {

                const name =
                    getPokemonName(pokemon)
                        .toLowerCase();

                return name.startsWith(searchText);

            })
            .slice(0, 8);


    if (matches.length === 0) {

        suggestions.style.display = "none";

        return;

    }


    matches.forEach(pokemon => {

        const name =
            getPokemonName(pokemon);

        const item =
            document.createElement("div");

        item.className =
            "suggestion-item";

        item.textContent =
            name;


        item.addEventListener(
            "click",
            () => {

                pokemonInput.value = name;

                suggestions.style.display =
                    "none";

                searchPokemon();

            }
        );


        suggestions.appendChild(item);

    });


    suggestions.style.display = "block";

}


/* ========================================
   CLOSE SUGGESTIONS
======================================== */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".search-input-wrapper"
            )
        ) {

            suggestions.style.display =
                "none";

        }

    }
);


/* ========================================
   SEARCH BUTTON
======================================== */

searchBtn.addEventListener(
    "click",
    searchPokemon
);


/* ========================================
   ENTER KEY
======================================== */

pokemonInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            suggestions.style.display =
                "none";

            searchPokemon();

        }

    }
);


/* ========================================
   SEARCH POKÉMON
======================================== */

function searchPokemon() {

    const searchName =
        pokemonInput.value
            .trim()
            .toLowerCase();


    /* Empty search */

    if (searchName === "") {

        alert(
            "Please enter a Pokémon name."
        );

        return;

    }


    /* Data loading */

    if (pokemonData.length === 0) {

        alert(
            "Pokémon data is still loading. Please try again."
        );

        return;

    }


    /* Find Pokémon */

    const pokemon =
        pokemonData.find(pokemon => {

            return getPokemonName(pokemon)
                .toLowerCase() === searchName;

        });


    /* Not found */

    if (!pokemon) {

        alert(
            "Pokémon not found!"
        );

        return;

    }


    console.log(
        "Found Pokémon:",
        pokemon
    );


    /* ========================================
       BASIC INFORMATION
    ======================================== */

    document.getElementById(
        "pokemonName"
    ).textContent =
        getPokemonName(pokemon) || "---";


    document.getElementById(
        "type"
    ).textContent =
        pokemon.Type || "---";


    document.getElementById(
        "category"
    ).textContent =
        pokemon.Category || "---";


    document.getElementById(
        "weaknesses"
    ).textContent =
        pokemon.Weaknesses || "---";


    document.getElementById(
        "gender"
    ).textContent =
        pokemon.Gender || "---";


    document.getElementById(
        "height"
    ).textContent =
        pokemon.Height || "---";


    document.getElementById(
        "weight"
    ).textContent =
        pokemon.Weight || "---";


    /* ========================================
       POKÉMON NUMBER
    ======================================== */

    const pokemonNumber =
        getPokemonNumber(pokemon);


    console.log(
        "Pokémon Number:",
        pokemonNumber
    );


    /* ========================================
       POKÉMON IMAGE
    ======================================== */

    const pokemonImage =
        document.getElementById(
            "pokemonImage"
        );


    pokemonImage.onerror = null;


    pokemonImage.src =
        `./assets/media/pokemon_images/${pokemonNumber}.png`;


    pokemonImage.alt =
        getPokemonName(pokemon) ||
        "Pokémon";


    pokemonImage.onerror = () => {

        console.error(
            "Pokémon image not found:",
            pokemonImage.src
        );

        pokemonImage.alt =
            "Image not found";

    };


    /* ========================================
       LOAD MATPLOTLIB CHART
    ======================================== */

    loadStatsChart(
        pokemon,
        pokemonNumber
    );

}


/* ========================================
   LOAD MATPLOTLIB CHART
======================================== */

function loadStatsChart(
    pokemon,
    pokemonNumber
) {

    statsImage.style.display =
        "none";


    statsPlaceholder.style.display =
        "block";


    statsPlaceholder.textContent =
        "Loading Matplotlib statistics chart...";


    statsStatus.textContent =
        "Loading chart...";


    /*
       Python-generated chart location:

       assets/media/pokemon_charts/0001.png
       assets/media/pokemon_charts/0002.png
       assets/media/pokemon_charts/0003.png
       ...
    */

    const chartPath =
        `./assets/media/pokemon_charts/${pokemonNumber}.png`;


    /*
       Cache-busting
    */

    statsImage.src =
        `${chartPath}?v=${Date.now()}`;


    statsImage.alt =
        `${getPokemonName(pokemon)} Base Stats`;


    /* ========================================
       CHART LOADED
    ======================================== */

    statsImage.onload = () => {

        statsImage.style.display =
            "block";


        statsPlaceholder.style.display =
            "none";


        statsStatus.textContent =
            "Matplotlib Chart";

    };


    /* ========================================
       CHART ERROR
    ======================================== */

    statsImage.onerror = () => {

        statsImage.style.display =
            "none";


        statsPlaceholder.style.display =
            "block";


        statsPlaceholder.textContent =
            "Stats chart not found. Run pokemon_chart_gen.py first.";


        statsStatus.textContent =
            "Chart unavailable";


        console.error(
            "Matplotlib chart not found:",
            chartPath
        );

    };

}