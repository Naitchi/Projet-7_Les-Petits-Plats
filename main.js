import {
  appareil,
  appareilDD,
  appareilInput,
  closeAppareilDD,
  closeIngredientDD,
  closeUstensileDD,
  ingredient,
  ingredientDD,
  ingredientInput,
  searchInput,
  ustensile,
  ustensileDD,
  ustensileInput,
} from './DOM_elements.js';
import { displayResult, insertElements, toggleDropDown } from './functions.js';
import { recipes } from './recipes.js';

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
