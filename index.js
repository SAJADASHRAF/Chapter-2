const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

/////BD 2.1

let person = {
  firstName: 'Amit',
  lastName: 'Sharma',
  gender: 'Male',
  age: 30,
  isMember: true,
};

app.get('/person', (req, res) => {
  res.json(person);
});

function getFullName(person) {
  return person.firstName + ' ' + person.lastName
}

app.get('/person/fullname', (req, res) => {
  let fullName = getFullName(person);
  res.json({fullName: fullName});
});

function getFirstNameAndGender(person) {
  return {
    firstName: person.firstName,
    gender: person.gender,
  };
}

app.get('/person/firstname-gender', (req, res) => {
  let firstNameAndGender = getFirstNameAndGender(person);
  res.json(firstNameAndGender);
});

function getIncrementedAgeObject(person) {
  person.age = person.age + 1
  return person
}

app.get('/person/increment-age', (req, res) => {
  let updatedObject = getIncrementedAgeObject(person);
  res.json(updatedObject);
});

function getFullNameAndMembership(person) {
  return {
    fullName: getFullName(person),
    isMember: person.isMember,
  };
}

app.get('/person/fullname-membership', (req, res) => {
  let fullNameAndMembership = getFullNameAndMembership(person);
  res.json(fullNameAndMembership);
});

function getFinalPrice(cartTotal, isMember) {
  let finalPrice;
  if(person.isMember === true) {
    finalPrice = cartTotal - (cartTotal * 0.10);
  } else {
    finalPrice = cartTotal;
  }
  return finalPrice
}

app.get('/person/final-price', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person.isMember);
  res.json({ finalprice: finalPrice });
});

//// BD 2.2

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let ages = [10, 20, 30, 15, 17, 25];

let words = ["apple", "banana", "cherry", "date", "fig", "grape"];

let fileSizes = [50, 200, 75, 120, 30, 90, 150];

function filterEvenNumbers(num) {
  return num % 2 === 0;
}

app.get('/even-numbers', (req, res) => {
  let result = numbers.filter((num) => filterEvenNumbers(num));
  res.json(result);
});


function filterAgesGreaterThan18(age) {
  return age > 18;
}

app.get('/adult-ages', (req, res) => {
  let result = ages.filter((age) => filterAgesGreaterThan18(age));
  res.json(result);
});


function filterWordsGreaterThanFiveChars(word) {
  return word.length > 5;
}

app.get('/long-words', (req, res) => {
  let result = words.filter((word) => filterWordsGreaterThanFiveChars(word));
  res.json(result);
});


function filterSmallerFileSizes(fileSize, filterParam) {
  return fileSize < filterParam;
}

app.get('/small-files', (req, res) => {
  let filterParam = req.query.filterParam;
  let result = fileSizes.filter((fileSize) => filterSmallerFileSizes(fileSize, filterParam));
  res.json(result);
});

//// BD 2.3

let products = [
  { "name": "Laptop", "price": 50000, "category": "Electronics" },
  { "name": "Mobile", "price": 20000, "category": "Electronics" },
  { "name": "Shirt", "price": 1500, "category": "Apparel" },
  {"name": "Mixer Grinder", "price": 4000, "category": "Home Appllances" }
 ];

let cars = [
  { "make": "Maruti", "model": "Swift", "mileage": 1500 },
  { "make": "Hyundai", "model": "i20", "mileage": 20000 },
  { "make": "Tata", "model": "Nexon", "mileage": 30000 }
];

let movies = [
  { "title": "3 idiots", "genre": "Comedy", "rating": 9 },
  { "title": "Dangal", "genre": "Drama", "rating": 10 },
  { "title": "Bahubali", "genre": "Action", "rating": 8 }
];

let orders = [
  { "orderId": 1, "customerName": "Rahul", "status": "shipped" },
  { "orderId": 2, "customerName": "Sita", "status": "pending" },
  { "orderId": 3, "customerName": "Amit", "status": "shipped" }
];
 
function filterByCategory(productObj, category) {
   return productObj.category === category;
}
   
app.get("/products/category/:category", (req, res) => {
  let category = req.params.category;
  let results = products.filter((productObj) => filterByCategory(productObj, category));
  res.json(results);
});

function filterByMileage(carObj, mileage) {
  return carObj.mileage < mileage;
}
  
app.get("/cars/mileage/:mileage", (req, res) => {
 let mileage = req.params.mileage;
 let results = cars.filter((carObj) => filterByMileage(carObj, mileage));
 res.json(results);
});

function filterByRating(movieObj, rating) {
  return movieObj.rating > rating;
}
  
app.get("/movies/rating/:rating", (req, res) => {
 let rating = req.params.rating;
 let results = movies.filter((movieObj) => filterByRating(movieObj, rating));
 res.json(results);
});

function filterByOrderStatus(orderObj, status) {
  return orderObj.status === status;
}
  
app.get("/orders/status/:status", (req, res) => {
 let status = req.params.status;
 let results = orders.filter((orderObj) => filterByOrderStatus(orderObj, status));
 res.json(results);
});


//// BD 2.4

let ages1 = [25, 30, 18, 22, 27];

let students = [
  { "name": "Rohit", "rollNo": 101, "marks": 85 },
  { "name": "Sita", "rollNo": 102, "marks": 90 },
  { "name": "Amit", "rollNo": 103, "marks": 70 }
];

let cars1 = [
  { "make": "Maruti", "model": "Swift", "mileage": 15 },
  { "make": "Hyundai", "mode": "i20", "mileage": 18 },
  { "make": "Tata", "model": "Nexon", "mileage": 20 }
];

function sortAscendingOrder(age1, age2) {
  return age1 - age2;
}

app.get('/ages/sort-ascending', (req, res) => {
  let agesCopy = ages1.slice();
  agesCopy.sort(sortAscendingOrder);
  res.json(agesCopy);
});

function sortDecendingOrder(age1, age2) {
  return age2 - age1;
}

app.get('/ages/sort-decending', (req, res) => {
  let agesCopy = ages1.slice();
  agesCopy.sort(sortDecendingOrder);
  res.json(agesCopy);
});


function sortStudentMarksInDecendingOrder(student1, student2) {
  return student2.marks - student1.marks;
}

app.get('/students/sort-by-marks-decending', (req, res) => {
  let studentsCopy = students.slice();
  studentsCopy.sort(sortStudentMarksInDecendingOrder);
  res.json(studentsCopy);
});


function sortCarMileageInDecendingOrder(car1, car2) {
  return car2.mileage - car1.mileage;
}

app.get('/cars/sort-by-mileage-decending', (req, res) => {
  let carsCopy = cars1.slice();
  carsCopy.sort(sortCarMileageInDecendingOrder);
  res.json(carsCopy);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
