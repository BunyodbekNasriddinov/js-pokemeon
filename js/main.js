let elBody = document.querySelector("body");
let elList = document.querySelector(".js-list");
let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elSelect = document.querySelector(".js-select");
let elSortSelect = document.querySelector(".js-sort-select");

// elBody.style.background =
//   "linear-gradient(90deg, rgba(182,219,21,1) 0%, rgba(255,0,44,1) 0%, rgba(255,239,0,1) 49%, rgba(0,212,255,1) 100%)";

function createCardListItem(array, node) {
  elList.innerHTML = "";

  for (item of array) {
    let newItemLi = document.createElement("li");

    node.appendChild(newItemLi);

    newItemLi.classList.add("col-12");
    newItemLi.classList.add("col-md-6");
    newItemLi.classList.add("col-lg-3");
    newItemLi.classList.add("rounded");
    newItemLi.classList.add("shadow");
    newItemLi.classList.add("p-3");
    newItemLi.innerHTML = `<div class="d-flex justify-content-between">
    <h2 class="h3 text-center" style="color: #${Math.floor(
      Math.random() * 1000
    )}">${item.name}</h2>
      <span class="h4">${item.id}</span>
      </div>
      <div class="d-flex">
      <ul class="list-unstyled mt-3">
      <li class="p-1 text-danger fw-semibold">Height: ${item.height}</li>
      <li class="p-1 text-primary fw-semibold">Weight: ${item.weight}</li>
      <li class="p-1 text-dark fw-semibold">Type: ${item.type[0]}</li>
      <li class="p-1 text-dark fw-semibold">Egg: ${item.egg}</li>
      <li class="p-1 text-light fw-semibold">Candy: ${item.candy}</li>
      </ul>
      <img
      class="img-fluid offset-1"
      width="120"
      height="120"
      src="${item.img}"
      alt="Pokemon ${item.name} image"
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
