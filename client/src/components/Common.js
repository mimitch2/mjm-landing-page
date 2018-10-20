

// ************ SORT APLHABETICALLY ***************//

export const sortAlpha = (array) => {//FIX need to make it key agnostic
  array.sort((a, b) => {
    if(a.id < b.id) return -1;
    if(a.id > b.id) return 1;
    return 0;
  })
  return array
}

// ************ append proper ending to any number ***************//

export const firstSecond = (num) => {
  const strNum = num.toString()
  if (strNum[strNum.length -1] === "1" && 
      strNum !== "11"){
    return "rst" 
  } else if (strNum[strNum.length -1] === "2"  && 
             strNum !== "12") {
    return "nd"
  } else if (strNum[strNum.length -1] === "3"  && 
             strNum !== "13"){
    return "rd"
  }
  return "th"
}

// ************ remove leading zero on floating point numbers ONLY for display as string ***************//

export const removeLeadingZero = (num) => {
  const numString = num.toString()
  if (numString[0] === "0") {
    const trimedString = numString.substring(1)
    return trimedString
  }
  return num.toFixed(3)
}

// ************ FILTER ARRAY ON INPUT *****************//

// export const filterInput = (searchInput, array) => {

//   if (searchInput && array.length > 0) {
//     array.filter(item => {
//       return item.toLowerCase().includes(searchInput.toLowerCase()) 
//     })
//   }
//   return array
// }


//Promises **************** OLD

// const posts = [
//   { title: 'I love JavaScript', author: 'Wes Bos', id: 1 },
//   { title: 'CSS!', author: 'Chris Coyier', id: 2 },
//   { title: 'Dev tools tricks', author: 'Addy Osmani', id: 3 },
// ];

// const authors = [
//   { name: 'Wes Bos', twitter: '@wesbos', bio: 'Canadian Developer' },
//   { name: 'Chris Coyier', twitter: '@chriscoyier', bio: 'CSS Tricks and CodePen' },
//   { name: 'Addy Osmani', twitter: '@addyosmani', bio: 'Googler' },
// ];

// function getPostById(id) {
//   return new Promise((resolve, reject) => {
//     // find the post
//     setTimeout(() => {
//       const post = posts.find(post => post.id === id);
//       if(post) {
//         resolve(post);
//       } else {
//         reject(Error('Post not found!'));
//       }
//     },200);
//   });
// }

// function hydrateAuthor(post) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const authorDetails = authors.find(person => person.name === post.author);
//       if(authorDetails) {
//         post.author = authorDetails;
//         resolve(post);
//       } else {
//         reject(Error('Author not Found!'));
//       }
//     }, 200);
//   });
// }

// getPostById(1)
//   .then(post => {
//     return hydrateAuthor(post);
//   })
//   .then(author => {
//     console.log(author);
//   })
//   .catch(err => {
//     console.error(err);
//   })


// ASYNC AWAIT ****************************************************


// async function go() {
//   const p1 = fetch('https://api.github.com/users/wesbos');
//   const p2 = fetch('https://api.github.com/users/stolinski');
//   // Wait for both of them to come back
//   const res = await Promise.all([p1, p2]);
//   const dataPromises = res.map(r => r.json());
//   const [wes, scott] = await Promise.all(dataPromises);
//   console.log(wes, scott);
// }

// // go();

// async function getData(names) {
//   const promises = names.map(name => fetch(`https://api.github.com/users/${name}`).then(r => r.json()));
//   const people = await Promise.all(promises);
//   console.log(people);
// }

// getData(['wesbos', 'stolinski', 'darcyclarke']);