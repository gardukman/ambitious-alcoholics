/* API1 Booze - Data */
var boozeAPI = function (searchItem) {                                                      //this function will find ten drinks based off the users button click.
    fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + searchItem            //fetch data from api using item user clicked on
    )
        .then(function (boozeResponse) {
            return boozeResponse.json()                                                     //convert result to json
        })
        .then(function (boozeResponse) {
            var drinkArray = []                                                             //create empty array
            for (var i = 0; drinkArray.length < 5; i++) {                                  //start loop to build ten random drinks
                newArrayNumber = Math.floor(Math.random() * boozeResponse.drinks.length)    //generate new random number between 0 and total number of items in original array from fetch
                var duplicate = drinkArray.includes(newArrayNumber)                         //will return true/false if value already exists.  This will make sure we have ten unique drinks.
                if (!duplicate) {                                                           //verify if item is unique add to array
                    drinkArray.push(newArrayNumber)
                }
            }
            console.log(drinkArray)
        })
}


boozeAPI("Vodka");                                                                          //testing user input using static variable.  will be replaced with button click results

/* API2 Wikipedia - data */
var wikiAPI = function (searchItem) {
    switch (searchItem) {
        case "Vodka":
            var pageId = 32787;
            console.log("found vodka")
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
        'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&pageids='+ pageId + '&inprop=url&format=json'
    )
       .then(function (wikiResponse) {
           return wikiResponse.json()
       })
       .then(function (wikiResponse){
           console.log(wikiResponse)
           var wikiArticle = wikiResponse.query.pages[pageId].extract
           console.log(wikiArticle)
           $(".wiki").html(wikiArticle)
       })
       
}
wikiAPI("Vodka");