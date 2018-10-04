

// ************ SORT APLHABETICALLY ***************//

export function sortAlpha (array) {
  array.sort((a, b) => {
    if(a.id < b.id) return -1;
    if(a.id > b.id) return 1;
    return 0;
  })
  return array
}
