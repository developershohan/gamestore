//dark mode style
let styleMode = localStorage.getItem("styleMode");
const styleToggle = document.querySelector(".header-mode-switcher");

const enableDarkStyle = () => {
  document.body.classList.add("dark-mode-gamestore");
  localStorage.setItem("styleMode", "dark");
};
const disableDarkStyle = () => {
  document.body.classList.remove("dark-mode-gamestore");
  localStorage.setItem("styleMode", null);
};

if (styleToggle) {
  styleToggle.addEventListener("click", () => {
    styleMode = localStorage.getItem("styleMode");
    if (styleMode !== "dark") {
      enableDarkStyle();
    } else {
      disableDarkStyle();
    }
  });
}

if (styleMode === "dark") {
  enableDarkStyle();
}

document.addEventListener("DOMContentLoaded", function () {
  const searchContainer = document.querySelector(
    ".popup-games-search-container"
  );
  const searchResult = document.querySelector(".popup-search-results");
  const searchInput = document.querySelector("#popup-search-input");
  const openButton = document.querySelector(".header-search");
  const closeButton = document.querySelector("#close-search");
  const titleElement = document.querySelector(".search-popup-title");

  openButton.addEventListener("click", function () {
    searchContainer.style.display = "block";
    titleElement.textContent = "You might be interested";
    showPlaceholders();

    loadDefaultGames();
  });

  searchInput.addEventListener("input", function () {
    const searchItem = searchInput.value;
    titleElement.textContent = "Search Results";
    showPlaceholders();

    fetch(gamestore_params.ajaxurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: new URLSearchParams({
        action: "search_game_by_title",
        search: searchItem,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          titleElement.textContent = "Search Results";
          renderGames(data.data);
        } else {
          titleElement.textContent =
            "Nothing was found. You might be interested in";
          showPlaceholders();
          loadDefaultGames();
        }
      })
      .catch((error) => console.log("error"));
  });

  closeButton.addEventListener("click", function () {
    searchContainer.style.display = "none";
    searchResult.innerHTML = "";
  });

  function showPlaceholders() {
    searchResult.innerHTML = "";

    for (let i = 0; i < 12; i++) {
      const placeholder = document.createElement("div");
      placeholder.className = "game-placeholder";
      searchResult.appendChild(placeholder);
    }
  }
  function renderGames(games) {
    searchResult.innerHTML = "";

    games.forEach(function (game) {
      const gameDiv = document.createElement("div");
      gameDiv.className = "game-result";

      gameDiv.innerHTML = `
            <a href ="${game.link}">
            <div class= "game-featured-image">${game.thumbnail}</div>
            <div class= "game-meta">
                <p>${game.price}</p>
                <h3> ${game.title}</h3>
            </div>
            </a>
        `;

      searchResult.appendChild(gameDiv);
    });
  }
  function loadDefaultGames() {
    fetch(gamestore_params.ajaxurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: new URLSearchParams({
        action: "load_latest_games",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          renderGames(data.data);
        }
      })
      .catch((error) => console.log("error"));
  }
});
