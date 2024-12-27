import generateRecipe from "./genAI";

const titleBar = document.querySelector(".title-bar");
const textarea = document.getElementById("ingredients-input");
const findRecipeBtn = document.getElementById("find-recipe");
const clearIpBtn = document.getElementById("clear-input");
const recipeContainer = document.getElementById("recipe-container");

let recipe = null;

window.addEventListener("scroll", (event) => {
  if (window.scrollY > 61) {
    titleBar.classList.add("scrolled");
  } else {
    titleBar.classList.remove("scrolled");
  }
});

findRecipeBtn.addEventListener("click", async (event) => {
  const ingredients = textarea.value.trim();
  if (!ingredients) {
    alert("Please enter some ingredients.");
    return;
  }

  try {
    findRecipeBtn.disabled = true;
    findRecipeBtn.textContent = "Loading...";

    recipe = await generateRecipe(ingredients);
    renderRecipe(recipe);
  } catch (error) {
    alert("An error occurred. Please try again.");
    console.error(error);
  } finally {
    findRecipeBtn.disabled = false;
    findRecipeBtn.textContent = "Find Recipe";
  }
});

clearIpBtn.addEventListener("click", (event) => {
  textarea.value = "";
  recipeContainer.innerHTML = "";
});

function renderRecipe(recipe) {
  recipeContainer.classList.add("hidden");
  recipeContainer.innerHTML = `
        <h1 class="text-head">${recipe.name}</h1>
        <div class="text-content" style="margin: 2rem 1.5rem">
          <h2>Ingredients:</h2>
          <ul class="section">
          ${recipe.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}  
          </ul>

          <h2>Instructions:</h2>
          <ul class="section">
            ${recipe.instructions
              .map((instruction) => `<li>${instruction}</li>`)
              .join("")}
          </ul>

          <h2>Notes:</h2>
          <p class="section">${recipe.notes}</p>
        </div>
  `;
  recipeContainer.classList.remove("hidden");
}
