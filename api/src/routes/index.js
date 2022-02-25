const { default: axios } = require('axios')
const { Router } = require('express')

const { Breed, Temperament, Favorites } = require('../db.js')

const router = Router()
let databaseDogID = 11220

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//{"name": "morita", "weight": "4 - 6", "height":"2 - 8", "life_span" : "15 years", "temperament" : ["Willful", "Fast"]}
//{"name": "pepe", "weight": "8 - 18", "height":"4 - 8", "life_span" : "17 years", "temperament" : ["Playful", "Active"]}
//{"name": "pepeti", "weight": "8 - 17", "height":"4 - 9", "life_span" : "17 years", "temperament" : ["Extroverted"]}

let getApiDogs = async () => {
	let allDogs = await axios.get(
		'https://api.thedogapi.com/v1/breeds?api_key=5284e5e6-cb13-4bce-961f-93616b5f5ca1'
	)
	const apiDogs = allDogs.data.map((dog) => {
		let { name, life_span, id, temperament } = dog

		let image = dog.image.url
		let avgWeight
		let avgHeight
		let weight = dog.weight.metric

		if (!weight || weight === 'NaN') {
			weight = 'Weight is not available'
			avgWeight = null
		} else if (weight.length > 3) {
			let arrWeight = weight.split(' - ')
			avgWeight = (parseInt(arrWeight[0]) + parseInt(arrWeight[1])) / 2

			if (!avgWeight) {
				avgWeight = arrWeight[0] ? arrWeight[1] : arrWeight[0]
			}
		} else {
			avgWeight = parseInt(weight)
		}

		let height = dog.height.metric
		if (!height) {
			height = 'Height is not available'
			avgHeight = null
		} else if (height.length > 3) {
			let arrHeight = height.split(' - ')
			avgHeight = (parseInt(arrHeight[0]) + parseInt(arrHeight[1])) / 2
		} else {
			avgHeight = parseInt(height)
		}
		if (!temperament) {
			temperament = 'Temperaments not available'
		}

		return {
			name,
			weight,
			avgWeight,
			height,
			avgHeight,
			life_span,
			image,
			id,
			temperaments: temperament,
		}
	})
	return apiDogs
}
let getDbDogs = async () => {
	const allDogs = await Breed.findAll({ include: Temperament })

	return allDogs
}
let getAllDogs = async () => {
	let apiDogs = await getApiDogs()
	let dbDogs = await getDbDogs()
	let allDogs = apiDogs.concat(dbDogs)

	return allDogs
}
router.post('/temperament', async (req, res) => {
	let temperamentsPosted = await Temperament.findAll()
	if (!temperamentsPosted.length) {
		const temperaments = []
		const allDogs = await getApiDogs()
		allDogs.forEach((dog) => {
			if (dog.temperaments) {
				const arrayOfTemperaments = dog.temperaments
					.replace(/\s/g, '')
					.split(',')
				arrayOfTemperaments.forEach((temp) => {
					if (
						!temperaments.includes(temp) &&
						temp !== 'Temperamentsnotavailable'
					) {
						temperaments.push(temp)
					}
				})
			}
		})
		let formattedTemperaments = temperaments.map((temp) => {
			return { name: temp }
		})
		let addedTemperaments = await Temperament.bulkCreate(formattedTemperaments)
		res.json(addedTemperaments)
	} else res.json(temperamentsPosted)
})
router.post('/dog', async (req, res) => {
	const { name, weight, height, life_span, image, temperament } = req.body

	let arrWeight = weight.split(' - ')
	let avgWeight = (parseInt(arrWeight[0]) + parseInt(arrWeight[1])) / 2

	let arrHeight = height.split(' - ')
	let avgHeight = (parseInt(arrHeight[0]) + parseInt(arrHeight[1])) / 2

	try {
		let newDog = await Breed.create({
			name,
			weight,
			avgWeight,
			height,
			avgHeight,
			life_span,
			image,
			id: databaseDogID++,
		})

		const temperamentsToBeAdded = await Temperament.findAll({
			where: {
				name: temperament,
			},
		})
		temperamentsToBeAdded
		await newDog.addTemperaments(temperamentsToBeAdded)

		res.json(newDog)
	} catch (error) {
		res.send(error)
	}
})

router.get('/dogs', async (req, res) => {
	const allDogs = await getAllDogs()

	if (Object.keys(req.query).length !== 0) {
		const queryDogs = allDogs.filter((dog) => {
			return dog.name == req.query.name
		})
		res.json(queryDogs)
	} else {
		res.json(allDogs)
	}
})
router.get('/dogs/:id', async (req, res) => {
	const allDogs = await getAllDogs()

	const idDog = allDogs.find((dog) => dog.id == req.params.id)

	res.json(idDog)
})
router.post('/addFavorite', async (req, res) => {
	console.log(req.body)
	const favoriteBreedID = req.body.breedID
	try {
		let favoriteAdded = await Favorites.create({ breedID: favoriteBreedID })
		console.log(favoriteAdded)
		res.json(favoriteAdded)
	} catch (error) {
		console.log(error)
		res.status(404).send('Error')
	}
})

router.get('/favorites', async (req, res) => {
	try {
		const favoriteBreeds = await Favorites.findAll()
		console.log(favoriteBreeds)
		res.json(favoriteBreeds)
	} catch (error) {
		console.log(error)

		res.status(404).send('Error')
	}
})

module.exports = router
