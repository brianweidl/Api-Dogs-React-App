import { React, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getTemperaments } from '../Actions/Actions'
import { Link } from 'react-router-dom'

//React form and validation component
function DogCreate({ temperaments, getTemperaments }) {
	useEffect(() => {
		if (temperaments.length <= 1) {
			const getAllTemperaments = async () => {
				let temperaments = await axios.post('http://localhost:3001/temperament')
				getTemperaments(temperaments.data)
			}
			getAllTemperaments()
		}
	}, [])

	const [input, setInput] = useState({
		name: '',
		minWeight: '',
		maxWeight: '',
		minHeight: '',
		maxHeight: '',
		life_span: '',
		image: '',
		temperament: [],
	})

	const [errors, setErrors] = useState({})

	const validations = {
		name: {
			isValid: (name) => {
				return name.length > 3 && name.length < 15 ? true : false
			},
			errorMessage: 'Name must contain between 3 and 15 characters',
		},
		minWeight: {
			isValid: (minWeight) => {
				minWeight = parseInt(minWeight)
				return minWeight < 150 && minWeight < parseInt(input.maxWeight)
					? true
					: false
			},
			errorMessage:
				'The minimum weight has to be less than the maximum weight and less than 150 kilograms',
		},
		maxWeight: {
			isValid: (maxWeight) => {
				maxWeight = parseInt(maxWeight)

				return maxWeight < 200 && maxWeight > parseInt(input.minWeight)
					? true
					: false
			},
			errorMessage:
				'The maximum weight has to be more than the minimum weight and less than 200 kilograms',
		},
		minHeight: {
			isValid: (minHeight) => {
				minHeight = parseInt(minHeight)
				return minHeight < 100 && minHeight < parseInt(input.maxHeight)
					? true
					: false
			},
			errorMessage:
				'The minimum height has to be less than the maximum weight and less than 100 m',
		},
		maxHeight: {
			isValid: (maxHeight) => {
				maxHeight = parseInt(maxHeight)
				return maxHeight < 100 && maxHeight > parseInt(input.minHeight)
					? true
					: false
			},
			errorMessage:
				'The minimum height has to be less than the maximum weight and less than 100 m',
		},
		life_span: {
			isValid: (life_span) => {
				life_span = parseInt(life_span)
				return life_span > 0 && life_span < 50 ? true : false
			},
			errorMessage: 'Life span has to be less than 50 years old',
		},
		temperament: {
			isValid: (temperament) => {
				return temperament.length ? true : false
			},
			errorMessage: 'Choose a temperament for your dog',
		},
	}
	let addTempElement = (temp) => {
		let tempSelected = document.createElement('div')

		tempSelected.classList.add('displayTemp')
		tempSelected.innerText = temp
		let tempContainer = document.getElementById('temp-container')
		tempContainer.appendChild(tempSelected)
	}
	let handleChange = (e) => {
		setInput({
			...input,
			[e.name]: e.value,
		})
	}
	let handleSelect = (temp) => {
		if (temp === '') return
		if (!input.temperament.length) {
			setInput({
				...input,
				temperament: [...input.temperament, temp],
			})
			addTempElement(temp)
			return
		}
		if (!input.temperament.includes(temp)) {
			setInput({
				...input,
				temperament: [...input.temperament, temp],
			})
			addTempElement(temp)
			return
		} else {
			alert('Temperament already selected')
		}
	}

	let handleSubmit = async (e) => {
		e.preventDefault()
		setErrors(() => {})
		const newErrors = {}

		if (validations) {
			let validSubmit = true

			for (let key in validations) {
				let foundError = validations[key].isValid(input[key])

				if (!foundError) {
					validSubmit = false
					console.log(newErrors[key])
					newErrors[key] = validations[key].errorMessage
				}
			}
			console.log(newErrors)
			if (!validSubmit) {
				setErrors(() => newErrors)

				return
			} else {
				let formatSend = {
					name: input.name,
					weight: `${input.minWeight} - ${input.maxWeight}`,
					height: `${input.minHeight} - ${input.maxHeight}`,
					life_span: `${input.life_span} years`,
					image: input.image,
					temperament: input.temperament,
				}
				if (!formatSend.image) {
					formatSend.image =
						'http://www.citydogshare.org/assets/default_dog-f1f5e5aa031ad0a956a936dc4fb4bde95c712f2ad1f99e883b5bc58d22aec668.jpg'
				}

				await axios.post('http://localhost:3001/dog', formatSend)
				console.log(formatSend)
			}
		}
	}

	let reset = () => {
		setInput({ ...input, temperament: [] })
		const tempsDisplay = document.getElementsByClassName('displayTemp')
		while (tempsDisplay.length > 0) {
			tempsDisplay[0].parentNode.removeChild(tempsDisplay[0])
		}
	}
	return (
		<div>
			<div>
				<Link to="/dogs">Volver a Perros</Link>
			</div>
			<form>
				<label htmlFor="name">Name: </label>
				<input
					name="name"
					required
					value={input.name}
					onChange={(e) => handleChange(e.target)}
				/>
				{errors && errors.name && <p className="error">{errors.name}</p>}
				<label htmlFor="minWeight">Min. Weight: </label>
				<input
					name="minWeight"
					required
					value={input.minWeight}
					onChange={(e) => handleChange(e.target)}
				/>
				{errors && errors.minWeight && (
					<p className="error">{errors.minWeight}</p>
				)}
				<label htmlFor="maxWeight">Max. Weight: </label>
				<input
					name="maxWeight"
					required
					value={input.maxWeight}
					onChange={(e) => handleChange(e.target)}
				/>
				{errors && errors.maxWeight && (
					<p className="error">{errors.maxWeight}</p>
				)}
				<label htmlFor="MinHeight">Min. Height: </label>
				<input
					name="minHeight"
					required
					value={input.minHeight}
					onChange={(e) => handleChange(e.target)}
				/>
				{errors && errors.minHeight && (
					<p className="error">{errors.minHeight}</p>
				)}
				<label htmlFor="MaxHeight">Max. Height: </label>
				<input
					name="maxHeight"
					required
					value={input.maxHeight}
					onChange={(e) => handleChange(e.target)}
				/>
				{errors && errors.maxHeight && (
					<p className="error">{errors.maxHeight}</p>
				)}

				<label htmlFor="life_span">Life Span: </label>
				<input
					name="life_span"
					required
					value={input.life_span}
					onChange={(e) => handleChange(e.target)}
				/>
				{errors && errors.life_span && (
					<p className="error">{errors.life_span}</p>
				)}
				<label htmlFor="image">Image URL: </label>
				<input
					name="image"
					value={input.image}
					onChange={(e) => handleChange(e.target)}
				/>
			</form>
			<div id="temp-container">
				<div>Temperament:</div>
				{temperaments.length ? (
					<div>
						<select
							id="temperament"
							onChange={(e) => handleSelect(e.target.value)}
						>
							{temperaments.map((temp) => (
								<option>{temp.name}</option>
							))}
						</select>
						{errors && errors.temperament && (
							<p className="error">{errors.temperament}</p>
						)}
						<button onClick={() => reset()}>Reset Temperaments</button>
					</div>
				) : (
					<div>Loading...</div>
				)}
			</div>
			<button type="submit" onClick={(e) => handleSubmit(e)}>
				Create
			</button>
		</div>
	)
}

function mapStateToProps(state) {
	state.temperaments.shift()
	state.temperaments.unshift('')

	return {
		temperaments: state.temperaments,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getTemperaments: (temperaments) => dispatch(getTemperaments(temperaments)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DogCreate)
