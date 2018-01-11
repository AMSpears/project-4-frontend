import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

import TextInput from '../TextInput/TextInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import backend from '../BackendVariable'
import Section from '../Section/Section'

class LogInForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				email: '',
				password: ''
			},
			errors: {},
			submitted: false
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(event) {
		const user = this.state.user
		user[event.target.name] = event.target.value
		this.setState({ user })
	}

	validate({ email, password }) {
		const errors = {}
		const { minPasswordLength } = this.props
		const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

		if (!email) errors.email = 'Email required.'
		if (!emailRegex.test(email)) errors.email = 'Email must be valid.'
		if (password.length < minPasswordLength)
			errors.password = `Password must be at least ${minPasswordLength} characters.`

		this.setState({ errors })
		const formIsValid = Object.getOwnPropertyNames(errors).length === 0
		return formIsValid
	}

	onSubmit(event) {
		event.preventDefault()
		const formIsValid = this.validate(this.state.user)
		if (formIsValid) {
			this.props.onSubmit(this.state.user)
			this.setState({ submitted: true })
		}
		axios
			.post(`${backend}api/signin`, {
				email: this.state.user.email,
				password: this.state.user.password
			})
			.then(response => {
				console.log(response)
				console.log(response.data.token)
				localStorage.token = response.data.token
				console.log(localStorage.token)
				this.props.setMessage('Logged in successfully!')
				this.props.alertToggle(true)
				this.props.retrieveRestaurants()
				this.props.history.push('/')
			})
			.catch(err => {
				this.props.setMessage('Sorry, something went wrong.')
				this.props.alertToggle(true)
				console.log(err)
			})
	}

	render() {
		const { errors } = this.state
		// const { email, password } = this.state.user

		return (
			<Section>
				<div>
					<div className="form-style">
						<h2> Sign In </h2>
						<TextInput
							htmlId="login-form-email"
							labelName="Email"
							name="email"
							required
							error={errors.email}
							onChange={this.onChange}
						/>
						<PasswordInput
							htmlId="login-form-password"
							name="password"
							showVisibilityToggle
							maxLength={24}
							error={errors.password}
							onChange={this.onChange}
						/>

						<input type="submit" value="Sign In" onClick={this.onSubmit} />
						<div className="login-msg">
							<p>Don't have an account?</p>
							<Link
								to="/signup"
								style={Object.assign({
									fontSize: '16px',
									fontWeight: 'bold',
									textDecoration: 'underline'
								})}
							>
								Sign Up Here
							</Link>
						</div>
					</div>
				</div>
			</Section>
		)
	}
}

LogInForm.propTypes = {
	confirmationMessage: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	minPasswordLength: PropTypes.number
}

LogInForm.defaultProps = {
	confirmationMessage: 'Welcome back!',
	minPasswordLength: 8
}

export default LogInForm
