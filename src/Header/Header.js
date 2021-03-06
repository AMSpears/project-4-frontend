import React from 'react'

import { Link } from 'react-router-dom'
import Img from '../Img/FS-logo.png'
import './Header.css'

const Header = () => {
	return (
		<div className="navs">
			<Link to="/">
				<img className="logo" src={Img} alt="Logo" />
					<div className="title">
						<h1>Food Search </h1>
					</div>
			</Link>
		</div>
	)
}

export default Header
