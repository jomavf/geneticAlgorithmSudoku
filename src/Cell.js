class Cell {
  constructor(maxSizeGenes = 9){
    this.genes = []
    this.initGenes(maxSizeGenes) 
    this.value = 0
    this.calculateValue()
  }

  initGenes(maxSizeGenes){
    //Generating random array of "n" dimention
    for (let i = 0; i < maxSizeGenes; i++) {
      // Generating random 0,1 values 
      this.genes[i] = floor(random(0,2)) 
    }
    //console.log("My gen is: ",this.genes)
  }

  calculateValue(){
    let sum = 0
    let binaryValue = 0
    // Calculate the total sum of an array of binary values
    for (let i = this.genes.length - 1; i >= 0 ; i--) {
      binaryValue = this.genes[(this.genes.length-1)-i] * (2 ** i)
      sum += binaryValue
      binaryValue = 0
    }
    this.value = sum
  }
  mutate(){
    let position = floor(random(0,this.genes.length))
    if(this.genes[position] === 1){
      this.genes[position] = 0
    }else if(this.genes[position] === 0){
      this.genes[position] = 1
    }
  }
}