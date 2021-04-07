var bevSearchForm = document.querySelector("#bev-search-form");
var bevIngredInput = document.querySelector("#bevIngredient");
var bevSearchBtn = document.querySelector("#bev-search-btn");
var bevDivEl = document.querySelector("#bev-root");
var bevIngred = bevIngredInput.value;
var modalEl = document.querySelector(".modal-container");

bevSearchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var bevIngred = bevIngredInput.value;
  // url to get cocktails by alcohol type to obtain drink ID
  var urlToFetch = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${bevIngred}`;
  fetch(urlToFetch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.drinks[0]);
      // console.log(data.drinks[0].idDrink);
      // loop through data then append cocktail name and img to page
      for (var i = 0; i < data.drinks.length; i++) {
        // console.log(drinkName);
        var drinkName = data.drinks[i].strDrink;
        var drinkTitle = document.createElement("h6");
        drinkTitle.textContent = drinkName;
        bevDivEl.append(drinkTitle);

        // console.log(drinkImg);
        var drinkImg = data.drinks[i].strDrinkThumb;
        var drinkPic = document.createElement("img");
        drinkPic.setAttribute("src", drinkImg);
        drinkPic.classList.add("cocktail-imgs");
        bevDivEl.append(drinkPic);

        var linkAnchor = document.createElement("a");
        var linkButton = document.createElement("button");
        linkButton.classList.add("recipe-button");
        linkButton.setAttribute("data", drinkName);
        linkButton.textContent = "Get Recipe";
        linkAnchor.append(linkButton);
        bevDivEl.append(linkAnchor);
      }
    });
});

document.querySelector("#bev-root").addEventListener("click", (event) => {
  if (event.target.className.indexOf("recipe-button") > -1) {
    generateRecipe(event.target.getAttribute("data"));
    modalEl.classList.remove("hide");
  }
});

const generateRecipe = (recipe) => {
  //url to get cocktails by drink name
  var urlToFetch = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipe}`;
  fetch(urlToFetch)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      console.log(res);

      const data = res.drinks[0];

      const ingredient = [];
      const instruction = [];
      const measure = [];

      for (const key in data) {
        if (key.indexOf("strIngredient") > -1 && data[key]) {
          ingredient.push(data[key]);
        }
        if (key === "strInstructions" && data[key]) {
          instruction.push(data[key]);
        }
        if (key.indexOf("strMeasure") > -1 && data[key]) {
          measure.push(data[key]);
        }
      }

      console.log("******ingredient", ingredient);
      console.log("******instruction", instruction);
      console.log("******measure", measure);

      const cardTemplate = `
            <div class="card">
                <div class="card-body">
                    <button class="close">close</button>
                    <div class="ingredient-container">
                        <ul>${renderRecipeData(ingredient, "ingredient")}</ul>
                    </div>
                    <div class="instruction-container">
                        <ul>${renderRecipeData(instruction, "instruction")}</ul>
                    </div>
                    <div class="measure-container">
                        <ul>${renderRecipeData(measure, "measure")}</ul>
                    </div>
                </div>
            </div>
        `;

      document.querySelector(".modal-container").innerHTML = cardTemplate;
    });
};

const renderRecipeData = (array, type) => {
  let result = "";

  array.forEach((item) => {
    result += `<li class="${type}">${item}<li>`;
  });

  return result;
};
// url to input drink ID to get full cocktail details
// var urlToFetch2 = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
// fetch(urlToFetch2)
//     .then(function (response) {
//     return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       console.log(data.drinks[0].strDrink);
//       console.log(data.drinks[0].strDrinkThumb);
//       console.log(data.drinks[0].strIngredient1);
//       console.log(data.drinks[0].strMeasure1);
//       console.log(data.drinks[0].strInstructions);

//     })

// home page
// needs ingredient input for searching recipes containing ingredient
// send query data to results page

// recipe results page
// extract data from query parameters
// search api for: dish name, image, url of recipe
// append block to the page for each result

// cocktail results page
// capture user input to search cocktailDb
// generate a fetch request off the user input and get a responsed
// extract data from query parameters
// search api for: cocktail name, image, url of recipe
// append block to the page for each result
