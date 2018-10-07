

// ************ SORT APLHABETICALLY ***************//

export const sortAlpha = (array) => {
  array.sort((a, b) => {
    if(a.id < b.id) return -1;
    if(a.id > b.id) return 1;
    return 0;
  })
  return array
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
