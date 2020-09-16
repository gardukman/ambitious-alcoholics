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

            // start of build cards section
            for (var t = 0; t < numDrinks; t++) {
                // clear parent div to remove old cards if necessary
                var parent = $("#card-" + t);
                $(parent).empty()

                //update drinks from local storage
                var storedDrinks = JSON.parse(localStorage.getItem("favoriteDrinks")) || []

                // title of card
                var cardHeader = document.createElement("h4")
                cardHeader.id = "d" + t + "h"
                cardHeader.innerHTML = boozeResponse.drinks[drinkArray[t]].strDrink
                parent.append(cardHeader)

                // body div
                var cardBody = document.createElement("div")
                cardBody.id = "d" + t + "d"
                parent.append(cardBody)
                
                // image of card
                var cardImg = document.createElement("img")
                cardImg.id = "d" + t + "i"
                cardImg.src = boozeResponse.drinks[drinkArray[t]].strDrinkThumb

                $("#d" + t + "d").append(cardImg)

                // favorite icon
                
                var statusDrink = storedDrinks.includes(boozeResponse.drinks[drinkArray[t]].strDrink)

                if (statusDrink) {                  //verify if drink is like or not
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
            // end of build card section
        })
}

/* API2 Wikipedia - data */
var wikiAPI = function (searchItem) {
    //case statement to return pageid for api request using button click from user
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
    //triggered by button click of user
    boozeAPI(alcoholType);
    wikiAPI(alcoholType);

}

function changeFav(headerID, iconID) {
    //update local storage from button click; also refresh icon fill
    var favorites = JSON.parse(localStorage.getItem("favoriteDrinks")) || []    //populate the array from local storage
    var drinkName = $("#" + headerID).text()                                    //get drink name from other element
    var drinkStatus = favorites.includes(drinkName)                             //find drink name in drink array
    if (!drinkStatus) {                                                         // if drink does not exist in the array
        favorites.push(drinkName)                                               //add drink name
        localStorage.setItem('favoriteDrinks', JSON.stringify(favorites))       //push drink array to local storage
        $("#" + iconID).toggleClass('fa far')                                   //update class to add icon fill

    } else {                                                                        //if array item already present, remove favorite status
        for (var a = 0; a < favorites.length; a++) {                                //loop to find position of drink name in array

            if (favorites[a] === drinkName){                                         //if drink name = array position 
               favorites.splice((a),1)                                              //remove drink position
               localStorage.setItem('favoriteDrinks', JSON.stringify(favorites))    //push updated array to local storage
               break;
            }

        }

        $("#" + iconID).toggleClass('fa far')                                   //update class to remove icon fill
    }

}