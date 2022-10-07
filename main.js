import { recipes } from './recipes.js';

const main = document.querySelector('#main');
const searchInput = document.querySelector('#search-input');
const tags = document.querySelector('#tags');

const ingredientDD = document.querySelector('#ingredientDD');
const ustensileDD = document.querySelector('#ustensileDD');
const appareilDD = document.querySelector('#appareilDD');

const closeIngredientDD = document.querySelector('#closeIngredientDD');
const closeUstensileDD = document.querySelector('#closeUstensileDD');
const closeAppareilDD = document.querySelector('#closeAppareilDD');

const ingredient = document.querySelector('#ingredient');
const ustensile = document.querySelector('#ustensile');
const appareil = document.querySelector('#appareil');

const ingredientInput = document.querySelector('#inputIngredient');
const ustensileInput = document.querySelector('#inputUstensile');
const appareilInput = document.querySelector('#inputAppareil');

const listFilter = [];
let searchFilter = [];

const createCard = (data) => {
  const card = document.createElement('div');
  const img = document.createElement('div');
  const bottom = document.createElement('div');
  const header = document.createElement('div');
  const h3 = document.createElement('h3');
  const time = document.createElement('div');
  const minuteur = document.createElement('img');
  const body = document.createElement('div');
  const bodyleft = document.createElement('div');
  const bodyright = createP(data.description);

  card.classList.add('card');
  img.classList.add('src');
  bottom.classList.add('bottom');
  header.classList.add('header');
  h3.innerHTML = data.name;
  time.classList.add('timeDiv');
  minuteur.setAttribute('src', 'public/icon/minuteur.svg');
  body.classList.add('desc');
  bodyleft.classList.add('bodyleft');
  bodyright.classList.add('bodyright');

  card.appendChild(bottom);
  card.appendChild(img);
  bottom.appendChild(header);
  header.appendChild(h3);
  header.appendChild(time);
  time.appendChild(minuteur);
  time.appendChild(createP(`${data.time} min`));
  bottom.appendChild(body);
  body.appendChild(bodyleft);
  body.appendChild(bodyright);
  data.ingredients.forEach((e) => {
    if (e.unit)
      bodyleft.appendChild(
        createP(`<span class="bold">${e.ingredient}:</span> ${e.quantity} ${e.unit}`),
      );
    else if (e.quantity)
      bodyleft.appendChild(createP(`<span class="bold">${e.ingredient}:</span> ${e.quantity}`));
    else if (e.ingredient)
      bodyleft.appendChild(createP(`<span class="bold">${e.ingredient}</span>`));
  });

  return card;
};
const createP = (content, css) => {
  const p = document.createElement('p');
  p.innerHTML = content;
  if (css) p.classList.add(css);
  return p;
};

const createTag = (element, type) => {
  const tag = document.createElement('div');
  const name = document.createElement('p');
  const close = document.createElement('img');

  close.setAttribute('src', 'public/icon/close.svg');
  close.classList.add('close');
  name.classList.add('tagName');
  name.innerHTML = element;
  tag.classList.add('tag', type, deleteSpace(element));

  if (type === 'ingredient') {
    listFilter.push({ type: 'ingredient', value: element });
  } else if (type === 'ustensile') {
    listFilter.push({ type: 'ustensile', value: element });
  } else if (type === 'appareil') {
    listFilter.push({ type: 'appareil', value: element });
  }

  tag.appendChild(name);
  tag.appendChild(close);
  tags.appendChild(tag);

  close.addEventListener('click', (e) => {
    tag.remove();
    const indexOfDelete = listFilter.map((e) => e.value).indexOf(element);
    listFilter.splice(indexOfDelete, 1);
    insertElements('ingredientElement', '#ingredientElements');
    insertElements('ustensileElement', '#ustensileElements');
    insertElements('appareilElement', '#appareilElements');
  });
};
const toggleDropDown = (element) => {
  element.classList.toggle('display');
};
const getAllIngredient = (data) => {
  const list = [];
  data.forEach((recipe) => {
    recipe.ingredients.forEach((obj) => {
      if (list.indexOf(obj.ingredient.toLowerCase()) === -1)
        list.push(obj.ingredient.toLowerCase());
    });
  });
  return list;
};
const getAllUstensile = (data) => {
  const list = [];
  data.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (list.indexOf(ustensil.toLowerCase()) === -1) list.push(ustensil.toLowerCase());
    });
  });
  return list;
};
const getAllAppareil = (data) => {
  const list = [];
  data.forEach((recipe) => {
    if (list.indexOf(recipe.appliance.toLowerCase()) === -1)
      list.push(recipe.appliance.toLowerCase());
  });
  return list;
};

// fonction pour trouver quel ingredient/ustensile/appareil existe dans le json en fonction de l'input
const getFilteredIngredient = (data, filter) => {
  const list = [];
  data.forEach((recipe) => {
    recipe.ingredients.forEach((obj) => {
      if (list.indexOf(obj.ingredient.toLowerCase()) === -1)
        list.push(obj.ingredient.toLowerCase());
    });
  });
  const result = list.filter((e) => {
    if (e.search(filter.toLowerCase()) !== -1) return true;
  });
  return result;
};
const getFilteredUstensile = (data, filter) => {
  const list = [];
  data.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (list.indexOf(ustensil.toLowerCase()) === -1) list.push(ustensil.toLowerCase());
    });
  });
  const result = list.filter((e) => {
    if (e.search(filter.toLowerCase()) !== -1) return true;
  });
  return result;
};
const getFilteredAppareil = (data, filter) => {
  const list = [];
  data.forEach((recipe) => {
    if (list.indexOf(recipe.appliance.toLowerCase()) === -1)
      list.push(recipe.appliance.toLowerCase());
  });
  const result = list.filter((e) => {
    if (e.search(filter.toLowerCase()) !== -1) return true;
  });
  return result;
};

const deleteSpace = (str) => {
  return str.replace(/ /g, '');
};

const insertElements = (idName, nameElementDOM) => {
  const elements = applySearchFilter();
  let list = [];
  switch (nameElementDOM) {
    case '#ingredientElements':
      console.log(ingredientInput.value);
      if (ingredientInput.value.length !== 0)
        list = getFilteredIngredient(elements, ingredientInput.value);
      else list = getAllIngredient(elements);
      break;
    case '#ustensileElements':
      console.log(ustensileInput.value);
      if (ustensileInput.value.length !== 0)
        list = getFilteredUstensile(elements, ustensileInput.value);
      else list = getAllUstensile(elements);
      break;
    case '#appareilElements':
      console.log(appareilInput.value);
      if (appareilInput.value.length !== 0)
        list = getFilteredAppareil(elements, appareilInput.value);
      else list = getAllAppareil(elements);
      break;
  }
  const elementDOM = document.querySelector(nameElementDOM);
  if (elementDOM.hasChildNodes()) {
    while (elementDOM.firstChild) {
      elementDOM.removeChild(elementDOM.lastChild);
    }
  }
  for (let i = 0; i < 30; i++) {
    if (list[i]) {
      const p = createP(list[i], 'element');
      p.classList.add(idName);
      elementDOM.appendChild(p);
      if (nameElementDOM === '#ingredientElements') {
        p.addEventListener('click', (e) => {
          let alreadyCreated = false;
          const tags = document.querySelectorAll('.tag');
          tags.forEach((elem) => {
            if (elem.classList.value === 'tag ingredient ' + deleteSpace(list[i])) {
              document.querySelector('.' + deleteSpace(list[i])).remove();
              const indexOfDelete = listFilter.map((e) => e.value).indexOf(list[i]);
              listFilter.splice(indexOfDelete, 1);
              alreadyCreated = true;
            }
          });
          if (!alreadyCreated) {
            createTag(p.innerHTML, 'ingredient');
            insertElements('ingredientElement', '#ingredientElements');
          }
        });
      } else if (nameElementDOM === '#ustensileElements') {
        p.addEventListener('click', (e) => {
          let alreadyCreated = false;
          const tags = document.querySelectorAll('.tag');
          tags.forEach((elem) => {
            if (elem.classList.value === 'tag ustensile ' + deleteSpace(list[i])) {
              document.querySelector('.' + deleteSpace(list[i])).remove();
              const indexOfDelete = listFilter.map((e) => e.value).indexOf(list[i]);
              listFilter.splice(indexOfDelete, 1);
              alreadyCreated = true;
            }
          });
          if (!alreadyCreated) {
            createTag(p.innerHTML, 'ustensile');
            insertElements('ustensileElement', '#ustensileElements');
          }
        });
      } else if (nameElementDOM === '#appareilElements') {
        p.addEventListener('click', (e) => {
          let alreadyCreated = false;
          const tags = document.querySelectorAll('.tag');
          tags.forEach((elem) => {
            if (elem.classList.value === 'tag appareil ' + deleteSpace(list[i])) {
              document.querySelector('.' + deleteSpace(list[i])).remove();
              const indexOfDelete = listFilter.map((e) => e.value).indexOf(list[i]);
              listFilter.splice(indexOfDelete, 1);
              alreadyCreated = true;
            }
          });
          if (!alreadyCreated) {
            createTag(p.innerHTML, 'appareil');
            insertElements('appareilElement', '#appareilElements');
          }
        });
      }
    }
  }
  applySearchFilter();
};

<<<<<<< HEAD
const applySearchFilter = () => {
  searchFilter = searchInput.value;
  let i = 0;
  let resultSearchBar = [];
  if (searchFilter.length > 0)
    while (i < recipes.length) {
      let needed = true;
      if (
        recipes[i].name.toLowerCase().search(searchFilter.toLowerCase()) === -1 &&
        recipes[i].description.toLowerCase().search(searchFilter.toLowerCase()) === -1
      )
        needed = false;
      if (needed) resultSearchBar.push(recipes[i]);
      i++;
    }
  if (!searchFilter.length) resultSearchBar = recipes;
  const finalResult = applyFilter(resultSearchBar);
  insertElements('ingredientElement', '#ingredientElements', getAllIngredient(finalResult));
  insertElements('ustensileElement', '#ustensileElements', getAllUstensile(finalResult));
  insertElements('appareilElement', '#appareilElements', getAllAppareil(finalResult));
  displayResult(finalResult);
  console.log(finalResult);
  return finalResult;
};
=======
const applySearchFilter = () => {};

>>>>>>> master
const applyFilter = (data) => {
  const result = [];
  data.forEach((recipe) => {
    let needed = true;
    listFilter.forEach((e) => {
      if (e.type === 'ingredient') {
        if (
          recipe.ingredients.filter((obj) => {
            if (obj.ingredient.toLowerCase() === e.value.toLowerCase()) return true;
          }).length === 0
        ) {
          needed = false;
        }
      } else if (e.type === 'ustensile') {
        if (
          recipe.ustensils.filter((obj) => {
            if (obj.toLowerCase() === e.value.toLowerCase()) return true;
          }).length === 0
        ) {
          needed = false;
        }
      } else if (e.type === 'appareil') {
        if (recipe.appliance.toLowerCase() !== e.value.toLowerCase()) {
          needed = false;
        }
      }
    });
    if (needed) {
      result.push(recipe);
    }
  });
  if (!listFilter.length) return data;
  if (!result.length) {
    // TODO message d'erreur (aucun résultat ne correspond à votre recherche)
  }
  return result;
};

const displayResult = (data) => {
  if (main.hasChildNodes()) {
    while (main.firstChild) {
      main.removeChild(main.lastChild);
    }
  }
  data.forEach((e) => {
    main.appendChild(createCard(e));
  });
};

displayResult(recipes);

// TODO faire un fonction qui s'assure que les autres sont fermé quand on ouvre un DD via autre chose que des toggle
ingredientDD.addEventListener('click', (e) => {
  toggleDropDown(ingredient);
  insertElements('ingredientElement', '#ingredientElements');
});
ustensileDD.addEventListener('click', (e) => {
  toggleDropDown(ustensile);
  insertElements('ustensileElement', '#ustensileElements');
});
appareilDD.addEventListener('click', (e) => {
  toggleDropDown(appareil);
  insertElements('appareilElement', '#appareilElements');
});

closeIngredientDD.addEventListener('click', (e) => toggleDropDown(ingredient));
closeUstensileDD.addEventListener('click', (e) => toggleDropDown(ustensile));
closeAppareilDD.addEventListener('click', (e) => toggleDropDown(appareil));

ingredientInput.addEventListener('input', (e) => {
  insertElements('ingredientElement', '#ingredientElements');
});
ustensileInput.addEventListener('input', (e) => {
  insertElements('ustensileElement', '#ustensileElements');
});
appareilInput.addEventListener('input', (e) => {
  insertElements('appareilElement', '#appareilElements');
});

searchInput.addEventListener('input', (e) => {
  insertElements('ingredientElement', '#ingredientElements');
  insertElements('ustensileElement', '#ustensileElements');
  insertElements('appareilElement', '#appareilElements');
});
