const User = require('./User');
const Wiki = require('./Wiki');
const Favorite = require('./Favorite');

//
User.hasMany(Favorite, {
    foreignKey: 'user_id',
});

Favorite.belongsToMany(User,{
    foreignKey: 'user_id',
});

Wiki.belongsToMany(User, {
    through:{
        model: Favorite,
        unique: false,
    },
    foreignKey: 'wiki_id',
    as: 'user_data'
});

module.exports = { User, Wiki, Favorite };
