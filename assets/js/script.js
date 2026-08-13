/* ========================================
   DAY / NIGHT THEME
======================================== */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("night");
});


/* ========================================
   DATA
======================================== */

let pokemonData = [];
let evolutionData = [];


/* ========================================
   ELEMENTS
======================================== */

const searchBtn = document.getElementById("searchBtn");
const pokemonInput = document.getElementById("pokemonInput");
const suggestions = document.getElementById("suggestions");

const statsImage = document.getElementById("statsImage");
const statsPlaceholder = document.getElementById("statsPlaceholder");
const statsStatus = document.getElementById("statsStatus");

const evolutionSection =
    document.getElementById("evolutionSection");

const evolutionChain =
    document.getElementById("evolutionChain");

const evolutionStatus =
    document.getElementById("evolutionStatus");


/* ========================================
   LOAD POKÉMON DATA
======================================== */

fetch("./assets/Data/json/pokemon_data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("pokemon_data.json not found");
        }

        return response.json();
    })
    .then(data => {
        pokemonData = Array.isArray(data) ? data : [];

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
   LOAD EVOLUTION DATA
======================================== */

fetch("./assets/Data/json/pokemon_evolution.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(
                "pokemon_evolution.json not found"
            );
        }

        return response.json();
    })
    .then(data => {
        evolutionData =
            Array.isArray(data) ? data : [];

        console.log(
            "Evolution data loaded:",
            evolutionData.length
        );
    })
    .catch(error => {
        console.error(
            "Error loading pokemon_evolution.json:",
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
   NORMALIZE TEXT
======================================== */

function normalizeText(value) {

    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/♀/g, "")
        .replace(/♂/g, "")
        .replace(/[’']/g, "")
        .replace(/[^a-z0-9]/g, "");
}


/* ========================================
   FIND POKÉMON
======================================== */

function findPokemonByName(name) {

    const normalizedName =
        normalizeText(name);

    return pokemonData.find(pokemon => {

        return normalizeText(
            getPokemonName(pokemon)
        ) === normalizedName;

    });
}


/* ========================================
   FIND EVOLUTION RECORD
======================================== */

function findEvolutionRecord(name) {

    const normalizedName =
        normalizeText(name);

    return evolutionData.find(pokemon => {

        return normalizeText(
            pokemon.Name
        ) === normalizedName;

    });
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

                return name.startsWith(
                    searchText
                );
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
        pokemonInput.value.trim();


    if (searchName === "") {

        alert(
            "Please enter a Pokémon name."
        );

        return;
    }


    if (pokemonData.length === 0) {

        alert(
            "Pokémon data is still loading. Please try again."
        );

        return;
    }


    const pokemon =
        findPokemonByName(searchName);


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


    /* ========================================
       POKÉMON IMAGE
    ======================================== */

    loadPokemonImage(
        pokemon,
        pokemonNumber
    );


    /* ========================================
       MATPLOTLIB CHART
    ======================================== */

    loadStatsChart(
        pokemon,
        pokemonNumber
    );


    /* ========================================
       EVOLUTION
    ======================================== */

    loadEvolutionChain(pokemon);

}


/* ========================================
   LOAD POKÉMON IMAGE
======================================== */

function loadPokemonImage(
    pokemon,
    pokemonNumber
) {

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
}


/* ========================================
   LOAD MATPLOTLIB CHART
======================================== */

function loadStatsChart(
    pokemon,
    pokemonNumber
) {

    statsImage.style.display = "none";

    statsPlaceholder.style.display =
        "block";

    statsPlaceholder.textContent =
        "Loading Matplotlib statistics chart...";

    statsStatus.textContent =
        "Loading chart...";


    const chartPath =
        `./assets/media/pokemon_charts/${pokemonNumber}.png`;


    statsImage.src =
        `${chartPath}?v=${Date.now()}`;


    statsImage.alt =
        `${getPokemonName(pokemon)} Base Stats`;


    statsImage.onload = () => {

        statsImage.style.display =
            "block";

        statsPlaceholder.style.display =
            "none";

        statsStatus.textContent =
            "Matplotlib Chart";
    };


    statsImage.onerror = () => {

        statsImage.style.display =
            "none";

        statsPlaceholder.style.display =
            "block";

        statsPlaceholder.textContent =
            "Stats chart not found. Run pokemon_chart_gen.py first.";

        statsStatus.textContent =
            "Chart unavailable";
    };
}


/* ========================================
   LOAD EVOLUTION CHAIN
======================================== */

function loadEvolutionChain(pokemon) {

    evolutionChain.innerHTML = "";


    if (evolutionData.length === 0) {

        evolutionSection.style.display =
            "block";

        evolutionStatus.textContent =
            "Loading evolution data";


        evolutionChain.innerHTML = `
            <p id="evolutionPlaceholder">
                Loading evolution data...
            </p>
        `;

        return;
    }


    const chain =
        buildEvolutionChain(
            getPokemonName(pokemon)
        );


    console.log(
        "Evolution chain:",
        chain
    );


    if (chain.length <= 1) {

        evolutionSection.style.display =
            "block";

        evolutionStatus.textContent =
            "No evolution";


        evolutionChain.innerHTML = `
            <p id="evolutionPlaceholder">
                This Pokémon does not evolve.
            </p>
        `;

        return;
    }


    evolutionSection.style.display =
        "block";

    evolutionStatus.textContent =
        `${chain.length} Stages`;


    chain.forEach(
        (pokemonName, index) => {

            const evolutionPokemon =
                findPokemonByName(
                    pokemonName
                );


            if (!evolutionPokemon) {
                return;
            }


            const number =
                getPokemonNumber(
                    evolutionPokemon
                );


            const name =
                getPokemonName(
                    evolutionPokemon
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "evolution-pokemon";


            card.innerHTML = `

                <img
                    src="./assets/media/pokemon_images/${number}.png"
                    alt="${name}"
                    loading="lazy"
                >

                <h3>
                    ${name}
                </h3>

                <span>
                    #${number}
                </span>

            `;


            card.addEventListener(
                "click",
                () => {

                    pokemonInput.value =
                        name;

                    searchPokemon();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );


            evolutionChain.appendChild(
                card
            );


            if (
                index <
                chain.length - 1
            ) {

                const arrow =
                    document.createElement(
                        "div"
                    );


                arrow.className =
                    "evolution-arrow";

                arrow.textContent =
                    "→";


                evolutionChain.appendChild(
                    arrow
                );
            }

        }
    );

}


/* ========================================
   BUILD COMPLETE EVOLUTION CHAIN
======================================== */

function buildEvolutionChain(
    pokemonName
) {

    const chain = [];


    let current =
        findEvolutionRecord(
            pokemonName
        );


    if (!current) {
        return [];
    }


    let firstName =
        current["Name"];


    let safety = 0;


    while (safety < 100) {

        const record =
            findEvolutionRecord(
                firstName
            );


        if (!record) {
            break;
        }


        const previous =
            String(
                record["Evolves From"] || ""
            ).trim();


        if (previous === "") {
            break;
        }


        const previousRecord =
            findEvolutionRecord(
                previous
            );


        if (!previousRecord) {
            break;
        }


        firstName =
            previousRecord["Name"];


        safety++;
    }


    let currentName =
        firstName;


    safety = 0;


    while (
        currentName &&
        safety < 100
    ) {

        const record =
            findEvolutionRecord(
                currentName
            );


        if (!record) {
            break;
        }


        if (
            !chain.some(
                name =>
                    normalizeText(name) ===
                    normalizeText(currentName)
            )
        ) {

            chain.push(
                currentName
            );
        }


        const next =
            String(
                record["Evolves To"] || ""
            ).trim();


        if (next === "") {
            break;
        }


        const nextRecord =
            findEvolutionRecord(
                next
            );


        if (!nextRecord) {
            break;
        }


        currentName =
            nextRecord["Name"];


        safety++;
    }


    return chain;
}