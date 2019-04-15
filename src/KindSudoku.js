class KindSudoku {
  constructor(size = 10,goal = 41,sizeCell = 9,cells = []){
    this.cells = cells
    this.size = size
    this.sizeCell = sizeCell
    if (this.cells.length === 0){
      this.initCells(this.size,this.sizeCell)
    } 

    this.columnValues = []
    this.rowValues = []
    this.calculateColumnRow()

    this.columnScore = []
    this.rowScore = []

    this.solved = true
    this.isSolved()
    this.goal = goal
    
    this.fitness = null
    this.calculateFitness()
  }
  printTable(){
    let w = width/this.size * 0.7
    let h = height/this.size * 0.7
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        rect(w*i,h*j,w-1,h-1)
        textSize(10)
        text(this.cells[i][j].value,i*w+w/2-10,j*h+h/2+5)
        
        //Printing total column values
        if (i === (this.size - 1)) {
          text(this.rowValues[j],j*w,(this.size - 1)*h+h/2+35)
        }
        if (j === (this.size - 1)) {
          text(this.columnValues[i],j*w+w/2+25,i*h+h/2)
        }

      }
    }
  }
  initCells(size,sizeCell){
    for (let i = 0; i < size; i++) {
        this.cells[i] = new Array(size)
    }
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.cells[i][j] = new Cell(sizeCell)
      }
    }
  }
  calculateColumnRow(){
    let sumRows = 0
    let sumColumns = 0
    this.columnValues = []
    this.rowValues = []
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        sumRows += this.cells[i][j].value
        sumColumns += this.cells[j][i].value  
      }
      this.rowValues.push(sumRows)
      this.columnValues.push(sumColumns)
      sumRows = 0
      sumColumns = 0
    }
  }
  isSolved(){
    this.columnValues.forEach(e => e !== this.goal && (this.solved = false))
    this.rowValues.forEach(e => e !== this.goal && (this.solved = false))
  }
  calculateFitness(){
    this.fitness = 0
    this.rowScore = []
    this.columnScore = []
    for (let i = 0; i < this.rowValues.length; i++) {
      // This is gonna calculate how far the value is from the goal
      this.rowScore[i] = (this.rowValues[i] / this.goal)
      this.rowScore[i] = 1 - this.rowScore[i]
      this.fitness += this.rowScore[i]
    }
    for (let i = 0; i < this.columnValues.length; i++) {
      // This is gonna calculate how far the value is from the goal
      this.columnScore[i] = (this.columnValues[i] / this.goal)
      this.columnScore[i] = 1 - this.columnScore[i] 
      this.fitness += this.columnScore[i]
    }    
  }
  generateChildren(anotherFatherSudoku,probabilityToMutate = 0.5){
    let choosenCellsPosition = null
    let randomPositionCell = null
    let randomProbability = null
    let newDNA = null
    let crossoverPoint = null

    // Generate a single crossover point for now
    crossoverPoint = floor(random(0,this.cells.length))
    // Generate new cells for children
    newDNA = []
    for (let i = 0; i < this.cells.length; i++) {
      newDNA[i] = this.cells[i]
    }
    //Crossover cells
    newDNA.splice(crossoverPoint,newDNA.length - crossoverPoint)
    for (let i = crossoverPoint; i < anotherFatherSudoku.cells.length; i++) {
      newDNA[i]=anotherFatherSudoku.cells[i]
    }
    //Mutate the children's DNA or cells
    
    choosenCellsPosition = floor(random(0,newDNA.length))
    randomPositionCell = floor(random(0,newDNA[0].length))
    
    randomProbability = random()  
    if(randomProbability <= probabilityToMutate){
      newDNA[choosenCellsPosition][randomPositionCell].mutate()
      newDNA[choosenCellsPosition][randomPositionCell].calculateValue()
    }

    return new KindSudoku(this.size,this.goal,this.sizeCell,newDNA)
  }
  mutateSudoku(probabilityToMutate){
    let chooseGenPosition = floor(random(0,this.cells.length))
    let chooseGen = this.cells[chooseGenPosition]

    let randomPosition = floor(random(0,chooseGen.genes.length))
    let randomProbability = random()  
    if(randomProbability <= probabilityToMutate){
      console.log('Fitness antes: ',this.fitness,this.cells,this.columnValues)
      
      console.log('Gen elegido para mutar ',this.cells[chooseGenPosition],' que esta en la posicion: ',chooseGenPosition,'y el cell elegido es de la pocision: ',randomPosition)
      console.log('GEN A MUTAR : ',this.cells[chooseGenPosition][randomPosition])
      this.cells[chooseGenPosition][randomPosition].mutate()
      console.log('GEN A MUTADO : ',this.cells[chooseGenPosition][randomPosition])
      this.calculateColumnRow()
      this.calculateFitness()
      console.log('Fitness despues: ',this.fitness,this.cells,this.columnValues);
    }
  }
}