var elBody = document.querySelector("body");
var elList = document.querySelector(".js-list");

elBody.style.background =
  "linear-gradient(90deg, rgba(182,219,21,1) 0%, rgba(255,0,44,1) 0%, rgba(255,239,0,1) 49%, rgba(0,212,255,1) 100%)";

for (item of pokemons) {
  var newItemLi = document.createElement("li");

  elList.appendChild(newItemLi);

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
