const { TE, to } = require('../../global_functions.js');

module.exports = (Sequelize, DataTypes) => {
    const cartProduct = Sequelize.define('cartProduct', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId:{
            type: DataTypes.INTEGER,
            required: true
        },
        userId:{
            type: DataTypes.INTEGER,
        },
        quantity:{
            type: DataTypes.INTEGER,
            defaultValue:1
        },
        isDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
       
    }, {
        tableName: 'cartProduct',
        underscored: false,
        paranoid: true, // This enables soft deletes
        timestamps: true,
        schema: "user"
    });
    cartProduct.associate = (models) => {
        cartProduct.belongsTo(models.product,{foreignKey: 'productId'});
    };
   

    return cartProduct;
}
