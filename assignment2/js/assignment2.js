// What is the length of the "data" array (2 pts.)? 
data.length
// 100

// What is the fourth element of the array *hint: remember how indexing for arrays beings (2 pts.)
data[3]
// Vancouver

// Using the array "map" funcitonality, create a variable "city_names" that has the name of each city (4 pts.)
var city_names = data.map(function(x){
    return x.city
})

// Using the array "map" funcitonality, create a variable "populations" that the population of each city (4 pts.)
var populations = data.map(function(x){
    return x.pop
})

// Sort the data variable by median age (4 pts.)
data.sort(function(a,b){
    return a.age - b.age
})
 

// Based on this, what are the cities with the youngest/oldest median ages? (2 pts.)
function ages(data){
    var cities = []
    for (i = 0; i < data.length; i++) {
        cities.push(data[i].city)
    }
    return cities
}

// ["Lake Forest Park", "Mercer Island", "Edmonds", "Anacortes", "Bainbridge Island"]
var oldest = ages(data.slice(95,100))
// ["Pullman", "Ellensburg", "Sunnyside", "Pasco", "Oak Harbor"]
var youngest = ages(data.slice(0,5))
        

// Write a function called "description" that takes in an object (one element from the data array) and constructs the following sentence (4 pts.):

// "The median age in " {city} " is " {median age}"
function description(x){
    return "The median age in " + x.city + " is " + x.age
}
 
// Pass one of the data elements to your function and view the results
description(data[0])
 

// Using the array filter functionality, create an array called "maleCities" that has the names of cities where there are more men than women (3 pts.)

// Initial approach using a filter then map
// var maleCitiesObjs = data.filter(function(x){
    // return x.males > x.females
// })
// var maleCities = maleCitiesObjs.map(function(x){
    // return x.city
// })

// Shorter approach using reduce
var maleCities = data.reduce(function(x, cities){
    if (b.males > b.females) {
        cities.push(b.city)
    }
    return a
}, [])

// How many of the top 100 cities have more males than females?
maleCities.length
// 29