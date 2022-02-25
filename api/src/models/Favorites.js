const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define('favorites', {
		breedID: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	})
}
