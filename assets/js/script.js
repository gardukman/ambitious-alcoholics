/* API1 Booze - Data */
var boozeAPI = function (searchItem) {
    var numDrinks = 5                                                    //this function will find ten drinks based off the users button click.
    fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + searchItem            //fetch data from api using item user clicked on
    )
        .then(function (boozeResponse) {
            return boozeResponse.json()                                                     //convert result to json
        })
        .then(function (boozeResponse) {
            var drinkArray = []                                                             //create empty array
            for (var i = 0; drinkArray.length < numDrinks; i++) {                                  //start loop to build ten random drinks
                newArrayNumber = Math.floor(Math.random() * boozeResponse.drinks.length)    //generate new random number between 0 and total number of items in original array from fetch
                var duplicate = drinkArray.includes(newArrayNumber)                         //will return true/false if value already exists.  This will make sure we have ten unique drinks.
                if (!duplicate) {                                                           //verify if item is unique add to array
                    drinkArray.push(newArrayNumber)
                }
            }

            for (var t = 0; t < numDrinks; t++) {

                var parent = $("#card-" + t);
                console.log(parent)
                removeAllChildNodes(parent);

                var storedDrinks = JSON.parse(localStorage.getItem("favoriteDrinks")) || []

                // title of card
                var cardHeader = document.createElement("h4")
                cardHeader.id = "d" + t + "h"
                cardHeader.innerHTML = boozeResponse.drinks[drinkArray[t]].strDrink
                parent.append(cardHeader)

                // body div
                var cardBody = document.createElement("div")
                cardBody.id = "d" + t + "d"
                cardBody.classList.add("my-container")
                parent.append(cardBody)
                
                // image of card
                var cardImg = document.createElement("img")
                cardImg.id = "d" + t + "i"
                cardImg.src = boozeResponse.drinks[drinkArray[t]].strDrinkThumb

                $("#d" + t + "d").append(cardImg)

                // favorite icon
                
                var statusDrink = storedDrinks.includes(boozeResponse.drinks[drinkArray[t]].strDrink)
                if (statusDrink) {
                    var heartSetting1 = "fa"
                    var heartSetting2= "fa-heart"
                } else {
                    var heartSetting1 = "far"
                    var heartSetting2 = "fa-heart"
                }

                var cardIcon = document.createElement("i")
                cardIcon.id = "d" + t + "f"
                cardIcon.classList.add(heartSetting1, heartSetting2)
                cardIcon.setAttribute("onclick", "changeFav('d" + t + "h', 'd" + t + "f')")
                $("#d" + t + "d").append(cardIcon)
            }
        })
}

/* API2 Wikipedia - data */
var wikiAPI = function (searchItem) {
    switch (searchItem) {
        case "Vodka":
            var pageId = 32787;
            break;
        case "Rum":
            var pageId = 14834691;
            break;
        case "Tequila":
            var pageId = 39357;
            break;
        case "Gin":
            var pageId = 12988;
            break;
    }
    fetch(
        'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&pageids=' + pageId + '&inprop=url&format=json'
    )
        .then(function (wikiResponse) {
            return wikiResponse.json()
        })
        .then(function (wikiResponse) {
            var wikiArticle = wikiResponse.query.pages[pageId].extract
            $(".wiki").html(wikiArticle)
        })

}

var mainAPICall = function (alcoholType) {

    boozeAPI(alcoholType);
    wikiAPI(alcoholType);

}

function removeAllChildNodes(parent) {
    console.log("trying to remove")
    console.log(parent)
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function changeFav(headerID, iconID) {
    var favorites = JSON.parse(localStorage.getItem("favoriteDrinks")) || []
    var drinkName = $("#" + headerID).text()
    var drinkStatus = favorites.includes(drinkName)
    if (!drinkStatus) {
        favorites.push(drinkName)
        localStorage.setItem('favoriteDrinks', JSON.stringify(favorites))
        $("#" + iconID).toggleClass('fa far')

    } else {
        for (var a = 0; a <favorites.length; a++) {

            if (favorites[a] === drinkName){
                console.log(favorites[a], drinkName, a)
               favorites.splice((a),1)
               localStorage.setItem('favoriteDrinks', JSON.stringify(favorites))
               break;
            }

        }

        $("#" + iconID).toggleClass('fa far')
    }

}



