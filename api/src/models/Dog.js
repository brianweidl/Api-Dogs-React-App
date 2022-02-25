const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define('breed', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		weight: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		avgWeight: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		avgHeight: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		height: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		life_span: {
			type: DataTypes.STRING,
		},
		image: {
			type: DataTypes.STRING,
		},
	})
}
