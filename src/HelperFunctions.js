const buildMatePool= (array) =>{
  let mateArray = []
  let optionsArray = []
  let size = array.length
  if (size % 2 !== 0) {
    console.log("Cant build a mate pool for odd size array");
    return undefined
  } 
  let sizeMax = size / 2
  // Init options array
  for (let i = sizeMax; i < sizeMax * 2; i++) {
    optionsArray[i-sizeMax] = i
  }
  // Init mate array
  for (let i = 0; i < sizeMax; i++) {
    mateArray[i]=[]
  }
  for (let i = 0; i < sizeMax; i++) {
    mateArray[i][0] = i
    // Find a random value in the actual optionsArray
    let value = random(optionsArray)
    let position = optionsArray.indexOf(value)
    mateArray[i][1] = value 
    optionsArray.splice(position,1)
  }
  return mateArray
}

const evaluateBestFitness = (array) => {
  let max = Infinity * -1
  let maxPos = 0
  for (let i = 0; i < array.length; i++) {
    array[i].fitness >= max && (max = array[i].fitness,maxPos = i)     
  }
  return {value:max,position:maxPos} 
}

const evaluateWorstFitness = (array) => {
  let min = Infinity
  let minPos = 0
  for (let i = 0; i < array.length; i++) {
    array[i].fitness <= min && (min = array[i].fitness,minPos = i)     
  }
  return {value:min,position:minPos} 
}

