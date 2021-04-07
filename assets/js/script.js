var searchForm = document.querySelector("#search-form");
var ingredientsTermInput = document.querySelector("#foodIngredient");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var searchTerm = ingredientsTermInput.value;
    var urlToFetch = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerm}&number=20&apiKey=14d9da1ef7ea4d14af97948a6903f533`
    fetch(urlToFetch)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var dataId = data[0].id
            var urlToFetch2 = `https://api.spoonacular.com/recipes/${dataId}/information?includeNutrition=false&apiKey=14d9da1ef7ea4d14af97948a6903f533`
            fetch(urlToFetch2)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    console.log(data.title);
                    console.log(data.instructions)
                    var resultsContent = document.getElementById
                        ('food-root');
                        resultsContent.innerHTML = ""
                    var recipeTitlep = document.createElement("p");
                    recipeTitlep.textContent = "Recipe: " + data.title;
                    resultsContent.append(recipeTitlep)
                })
        })
})