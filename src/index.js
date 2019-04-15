let iterations = 10000
let population = []
let populationSize = 22
let newPopulation = []

let bestFitness
let worstFitness
let matingPool

let counter = 0

let mutationProbability = 0.5

function setup(){
	createCanvas(500,500)
}
function draw(){
	counter === 0 && console.log('Inicio del programa')
	
	background(255)
	if(counter === iterations){
		console.log('Max interations reached :(')		
		noLoop()	
	} 

	// <-------------- < Init a population > --------------> 
	if(counter === 0){
		for (let i = 0; i < populationSize; i++) {
			// <-------------- < Fitness evaluated each time a new population constructor is created > --------------> 
			// By default size matrix = 10,goal wished = 41,sizeCell = 9
			population[i] = new KindSudoku()
		}
	}
	// <-------------- < Delete the population with less fitness and clone the population with the best fitness > -------------->
	bestFitness = evaluateBestFitness(population)
	worstFitness = evaluateWorstFitness(population)
	population[worstFitness.position] = population[bestFitness.position]
	// population[worstFitness.position].mutateSudoku(mutationProbability)

	// <-------------- < Building a Mating pool according to the fitness (random in this case)> -------------->
	matingPool = buildMatePool(population)
	
	// <-------------- < Reproduction > -------------->
	// <Pick parents ,crossover and mutate ... create the new Population (generate children)>
	newPopulation = []
	for (let i = 0; i < population.length / 2; i++) {
		newPopulation.push(population[matingPool[i][0]].generateChildren(population[matingPool[i][1]],mutationProbability))
		newPopulation.push(population[matingPool[i][1]].generateChildren(population[matingPool[i][0]],mutationProbability)) 
	}

	for (let i = 0; i < population.length; i++) {
		background(255)
		population[i].printTable()
		console.log(population[i].fitness);
	}
	
	population = newPopulation
	populationSize = newPopulation.length

	for (let i = 0; i < population.length; i++) {
		if(population[i].fitness === 0){
			console.log('The winner is: ',population[i])
			noLoop()
		}  
	}
	
	counter++
	// console.log(counter)
}