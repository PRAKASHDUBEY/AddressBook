module.exports = async function(arr,page,limit){
  
  // calculating the starting and ending index
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  if (endIndex < arr.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }
  
  results.results = arr.slice(startIndex, endIndex);
  return results;
}
  