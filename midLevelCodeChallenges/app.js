


// function extractInitials(names) {

//     //mapping through names/// splitting them by first and last.
// return names.map(name=>{
//     const [first,last] = name.split(' ')

//     //returning the name first letter of first and last name
//     return first[0] + last[0]
// })
// };


// const fullNames = ['John Doe', 'Alice Johnson', 'Bob Smith'];

// console.log(extractInitials(fullNames))
// // const initialsArray = extractInitials(fullNames);
// // console.log(initialsArray); // Output: ['JD', 'AJ', 'BS']







// function filterByProperty(objects, propertyName, propertyValue) {
//   // Filter through the objects and find those with the specified property name and value
//   const filtered = objects.filter(
//     (object) => object[propertyName] === propertyValue
//   );

//   // returns new array with the filtered items
//   return filtered;
// }

// const people = [
//   { name: "Alice", age: 30, country: "USA" },
//   { name: "Bob", age: 25, country: "Canada" },
//   { name: "Charlie", age: 35, country: "USA" },
//   { name: "Davik", age: 28, country: "Bahgdad" },
//   { name: "Daved", age: 28, country: "France" },
//   { name: "Divad", age: 28, country: "Australia" },
//   { name: "Greg", age: 28, country: "Australia" },
// ];

// const filteredByCountry = filterByProperty(people, "age",28);
// console.log(filteredByCountry);


function capitalizeWords(str){
// turn the string into an array
const splitStr = str.split(" ")
//map over the array 
const cappedArray= splitStr.map((word)=> {
  const newWord = word[0].toUpperCase() + word.slice(1)
  return newWord
})
// splitting at each space to give my array of words 
// grab the first letter of each word and cap it
//turn back into a string 
return cappedArray.join(" ")
}

const sentence = "welcome to the jungle!!!"    //Welcome To The Jungle!!!

console.log(capitalizeWords(sentence))

//talk through it  // understand   // ??s

// psuedo code

// solve

//explain