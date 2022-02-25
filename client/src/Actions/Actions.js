export function getAllDogs(dogs) {
	dogs = dogs.map((dog) => {
		if (dog.id.toString().startsWith(1122)) {
			let formatTemperament = ''
			dog.temperaments.forEach((temp) => {
				formatTemperament = formatTemperament.concat(`${temp.name}, `)
			})
			formatTemperament = formatTemperament.slice(
				0,
				formatTemperament.length - 2
			)

			dog.temperaments = formatTemperament
		}
		return dog
	})

	return {
		type: 'GET_ALL_DOGS',
		payload: dogs,
	}
}

export function filterByName(name) {
	return {
		type: 'FILTER_BY_NAME',
		payload: name,
	}
}
export function filterBySource(source) {
	return {
		type: 'FILTER_BY_SOURCE',
		payload: source,
	}
}

export function filterAlphabetical(alpha) {
	return {
		type: 'FILTER_ALPHABETICAL',
		payload: alpha,
	}
}

export function filterByWeight(sort) {
	return {
		type: 'FILTER_BY_WEIGHT',
		payload: sort,
	}
}
export function getTemperaments(temperaments) {
	return {
		type: 'GET_TEMPERAMENTS',
		payload: temperaments,
	}
}

export function filterByTemperament(temperament) {
	return {
		type: 'FILTER_BY_TEMPERAMENTS',
		payload: temperament,
	}
}
