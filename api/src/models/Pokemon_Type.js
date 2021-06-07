const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('pokemon_type', {
        pokemonId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemons',
                key: 'id'
            }
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'types',
                key: 'id'
            }
        }
    })
}