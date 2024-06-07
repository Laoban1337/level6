


function extractInitials(names) {

    //mapping through names/// splitting them by first and last.
return names.map(name=>{
    const [first,last] = name.split(' ')

    //returning the name first letter of first and last name
    return first[0] + last[0]
})
};


const fullNames = ['John Doe', 'Alice Johnson', 'Bob Smith'];

console.log(extractInitials(fullNames))
// const initialsArray = extractInitials(fullNames);
// console.log(initialsArray); // Output: ['JD', 'AJ', 'BS']







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

// const filteredByCountry = filterByProperty(people, "country", "USA");
// console.log(filteredByCountry);
