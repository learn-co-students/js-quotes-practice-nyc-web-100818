const dataStore = { quotez: []}

// debugger
// var arrayChangeHandler = {
//   get: function(target, property) {
//     // console.log('getting ' + property + ' for ' + target);
//     // property is index in this case
//     return target[property];
//   },
//   set: function(target, property, value, receiver) {
//     // console.log('setting ' + property + ' for ' + target + ' with value ' + value);
//     target[property] = value;
//     // you have to return true to accept the changes
//     return true;
//   }
// };
//
// var originalArray = [];
// var proxyToArray = new Proxy( originalArray, arrayChangeHandler );
//
// proxyToArray.push('Test');
// // console.log(proxyToArray[0]);
//
// // pushing to the original array won't go through the proxy methods
// // originalArray.push('test2');
//
// debugger






const helper1 = {
  set: () => {
    console.log("quotez array change");
    getAllQuotes(dataStore.quotez)
  }
}

const helper2 = {
  set: () => {
    console.log("quote changed - re-rendering quotes");
    document.getElementById('quote-list').innerHTML = "";
    getAllQuotes(dataStore.quotez)
  }
}

// const observer = {
//   get: (obj) => {
//     console.log("looking at me");
//     document.getElementById('quote-list').innerHTML = "";
//     getAllQuotes(dataStore.quotez)
//     // let quotes = obj
//     // console.log(obj.quotez.find(quote => quote.id == 1));
//     // return obj.find(quote => quote.id == 1)
//     return obj
//   }
// }

const proxy1 = new Proxy(dataStore, helper1)
const proxy2 = new Proxy(dataStore, helper2)
// const proxy3 = new Proxy(dataStore, observer)

class Quote {
  constructor(quote) {
    if (quote.id) {
      this.id = quote.id;
    } else {
      this.id = (dataStore.quotez.length + 1)
    }
    this.quote = quote.quote;
    if (quote.likes) {
      this.likes = quote.likes;
    } else {
      this.likes = 0;
    }
    this.author = quote.author;
    dataStore.quotez.push(this);
  }
}

// debugger
