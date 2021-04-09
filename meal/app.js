// fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
//     .then(res => res.json())
//     .then(data => console.log(data.meals));

const meals = document.getElementById("meals");
const category = document.getElementById("category");
const btn = document.getElementById("create");

const numOfMeals = 3;

btn.addEventListener("click", () => {
    addMeals(category.value);
});

async function getMeals(catVal) {
    let mealRes;
    if (catVal != "Random") {
        mealRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catVal}`);
    } else {
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        mealRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alphabet[Math.floor(Math.random() * 26)]}`);
    }
    const mealArr = await mealRes.json();
    return mealArr;
}

async function addMeals(catVal) {
    const mealList = await getMeals(catVal);
    const randomMeals = await createPlan(mealList);
    meals.innerHTML = "";
    for (let i = 0; i < numOfMeals; i++) {
        const insRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${randomMeals[i].strMeal}`);
        const insData = await insRes.json();
        meals.innerHTML += `
            <h4>${randomMeals[i].strMeal}</h4>
            <img src=${randomMeals[i].strMealThumb}>
            <p><b>Instructions: </b>${insData.meals[0].strInstructions}</p>
        `
    }
}

function createPlan(mList) {
    let randomizedList = [];
    let lengthOfList = 0;
    for (let meal in mList.meals) {
        lengthOfList++;
    }
    for (let i = 0; i < numOfMeals; i++) {
        let flag = false;
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * lengthOfList);
            if (randomizedList.includes(mList.meals[randomNumber])) {
                continue;
            } else {
                randomizedList[i] = mList.meals[randomNumber];
                flag = true;
            }
        } while (!flag);
    }
    return randomizedList;
}