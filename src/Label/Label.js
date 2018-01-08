import React from 'react'
import PropTypes from 'prop-types'

const Label = ({ labelName, required }) => {
	let requiredStyle = { color: 'rgb(255,0,0)' }
	const fieldRequired = <span style={requiredStyle}>*</span>
	return (
		<label>
			{labelName} {required && fieldRequired}
		</label>
	)
}

Label.propTypes = {
	labelName: PropTypes.string.isRequired,
	required: PropTypes.bool
}

export default Label
