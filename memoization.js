const memoize = fun => {
  //Create cache for results
  const cacheResult = {};
  return (...args) => {
    //create a key for our cache
    const argsKey = JSON.stringify(args);
    //only execute func if no cached value
    if (!cacheResult[argsKey]) {
      cacheResult[argsKey] = fun(...args);
    }
    return cacheResult[argsKey];
  }
}

let slowFunction = num => {
  let result = 0;
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      result++;
    }
  }
  return result;
};

//overwriting the "slowFunction" 
slowFunction = memoize(slowFunction);

const startTime = new Date();
let result1 = slowFunction(8000);
console.log(new Date() - startTime);  // 102

const startTime2 = new Date();
let result2 = slowFunction(8000);
console.log(new Date() - startTime2); // 0