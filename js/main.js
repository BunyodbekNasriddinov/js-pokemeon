let elBody = document.querySelector("body");
let elList = document.querySelector(".js-list");
let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elSelect = document.querySelector(".js-select");
let elSortSelect = document.querySelector(".js-sort-select");
let elModeBtn = document.querySelector(".js-mode");
let elScrollBtn = document.querySelector(".js-scroll");
let elModal = document.querySelector(".js-modal");
let elFavoriteList = document.querySelector(".js-favorite-list");

function createCardListItem(array, node) {
  elList.innerHTML = "";

  for (item of array) {
    let newItemLi = document.createElement("li");
    node.appendChild(newItemLi);
    newItemLi.dataset.id = item.id;

    newItemLi.setAttribute(
      "class",
      "col-12 col-md-4 col-lg-3 rounded shadow p-3"
    );
    newItemLi.innerHTML = `
    <div class="d-flex justify-content-between">
      <h2 class="h3 text-center" style="color: #${Math.floor(
        Math.random() * 1000
      )}">${item.name}</h2>
        <span class="h4 text-success">
          <button class="bg-transparent border-0 js-favorite">
            <img 
              class="me-1 js-favorite-img"
              data-poc-id = "${item.id}"
              src="./images/favorite-icon.png"
              width="35" 
              height="35"
              ></button>
                ${item.id}
        </span>
      </div>
      <div class="d-flex justify-content-between">
      <ul class="list-unstyled mt-3">
      <li class="p-1 text-danger fw-semibold">Height: ${item.height}</li>
      <li class="p-1 text-warning fw-semibold">Weight: ${item.weight}</li>
      <li class="p-1 text-success fw-semibold">Type: ${item.type[0]}</li>
      <li class="p-1 text-primary fw-semibold">Egg: ${item.egg}</li>
      <li class="p-1 text-light fw-semibold">Spawn time: ${item.spawn_time}</li>
      </ul>
      <img
      class="img-fluid offset-1"
      width="150"
      height="200"
      src="${item.img}"
      alt="Pokemon ${item.name} image"
      style="object-fit: fill;"
      />
    </div>`;
  }
}

function sortArray(arr, key, reverse) {
  return arr.sort((a, b) => {
    if (typeof a[key] === "number") {
      a = a[key];
      b = b[key];
      if (reverse) return b - a;
      return a - b;
    }
    if (typeof a[key] === "string") {
      a = a[key].toLowerCase().charCodeAt(0);
      b = b[key].toLowerCase().charCodeAt(0);
      if (reverse) return b - a;
      return a - b;
    }
  });
}

elModal.addEventListener("click", () => {
  elFavoriteList.classList.toggle("d-none");
});

window.addEventListener("scroll", () => {
  if (window.scrollY >= 700) {
    elScrollBtn.classList.remove("d-none");
  } else {
    elScrollBtn.classList.add("d-none");
  }
});

let theme = false;
let favoriteImgClick = false;

elModeBtn.addEventListener("click", () => {
  theme = !theme;

  let bg = theme ? "dark" : "light";
  localStorage.setItem("theme", bg);
  changeTheme();
});

changeTheme();

function changeTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.querySelector("body").classList.add("dark");
    elModeBtn.children[0].src = "./images/mode-icon.png";
  } else {
    document.querySelector("body").classList.remove("dark");
    elModeBtn.children[0].src = "./images/mode-icon-dark.png";
  }
}

createCardListItem(pokemons, elList, true);

let sortPokemons = [];
let pokemonsTypes = [];

pokemons.forEach((poc) => {
  poc.type.forEach((el) => {
    pokemonsTypes.push(el);
  });
});

let sortPokemonsTypes = new Set(pokemonsTypes);

sortPokemonsTypes.forEach((el) => {
  elOption = document.createElement("option");
  elSelect.appendChild(elOption);

  elOption.setAttribute("value", el);
  elOption.textContent = el;
});

elSelect.addEventListener("change", (evt) => {
  evt.preventDefault();

  sortPokemons = [];

  pokemons.forEach((poc) => {
    poc.type.forEach((pocType) => {
      if (elSelect.value == "All") {
        sortPokemons = pokemons;
      }
      if (elSelect.value == pocType) sortPokemons.push(poc);
    });
  });

  createCardListItem(sortPokemons, elList);
});

elSortSelect.addEventListener("change", (evt) => {
  evt.preventDefault();

  let elSortSelectVal = elSortSelect.value;

  if (elSortSelectVal !== "all") {
    if (elSortSelectVal === "a-z")
      createCardListItem(sortArray(pokemons, "name"), elList);
    if (elSortSelectVal === "z-a")
      createCardListItem(sortArray(pokemons, "name", true), elList);
    if (elSortSelectVal === "0-9")
      createCardListItem(sortArray(pokemons, "id"), elList);
    if (elSortSelectVal === "9-0")
      createCardListItem(sortArray(pokemons, "id", true), elList);
  }
});

let searchPokemons = [];

elForm.addEventListener("input", (evt) => {
  evt.preventDefault();
  let elInputVal = elInput.value;

  if (+elInputVal > pokemons.length) {
    return (elList.innerHTML =
      '<li><h1 class="h1 text-center text-danger">NOT FOUND!</h1></li>');
  }

  pokemons.forEach((el) => {
    if (typeof +elInputVal === "number") {
      if (+elInputVal == el.id) searchPokemons.push(el);
    }

    if (typeof elInputVal === "string") {
      if (
        el.name.toLowerCase().includes(elInputVal.toLowerCase()) ||
        el.name.toUpperCase().includes(elInputVal.toUpperCase())
      )
        searchPokemons.push(el);
    }
  });

  createCardListItem(searchPokemons, elList);
  searchPokemons = [];
});

function favoriteRender(array, node) {
  node.innerHTML = "";
  array.forEach((el) => {
    const newFavLI = document.createElement("li");
    const newDeleteBtn = document.createElement("button");
    const newSpan = document.createElement("span");

    newFavLI.setAttribute(
      "class",
      "list-group-item w-100 text-start d-flex align-items-center justify-content-between"
    );
    newDeleteBtn.setAttribute(
      "class",
      "btn btn-danger ms-5 js-favorite-delete"
    );
    newSpan.setAttribute("class", "fs-5");

    newDeleteBtn.textContent = "DELETE";
    newDeleteBtn.dataset.pocId = el.id;
    newSpan.textContent = `${el.id}. ${el.name}`;

    newFavLI.appendChild(newSpan);
    newFavLI.appendChild(newDeleteBtn);
    node.appendChild(newFavLI);
    localStorage.setItem("favoritePok", JSON.stringify(favoritePok));
  });
}

let favoritePok = JSON.parse(localStorage.getItem("favoritePok")) || [];

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-favorite-img")) {
    const pocId = evt.target.dataset.pocId;
    const findIndex = pokemons.findIndex((el) => el.id == pocId);
    document.querySelectorAll(".js-favorite-img").forEach((item) => {
      if (item.dataset.pocId == pocId) item.src = "./images/heart-icon.png";
    });
    if (!favoritePok.includes(favoritePok[findIndex])) {
      favoritePok.push(pokemons[findIndex]);
      favoriteRender(favoritePok, elFavoriteList);
    }
  }
});

elFavoriteList.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-favorite-delete")) {
    const pocId = +evt.target.dataset.pocId;
    const findIndex = favoritePok.findIndex((el) => el.id === pocId);
    document.querySelectorAll(".js-favorite-img").forEach((item) => {
      if (item.dataset.pocId == pocId) item.src = "./images/favorite-icon.png";
    });
    favoritePok.splice(findIndex, 1);
    favoriteRender(favoritePok, elFavoriteList);
  }
});

favoriteRender(favoritePok, elFavoriteList);
