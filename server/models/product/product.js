const { TE, to } = require('../../global_functions.js');

module.exports = (Sequelize, DataTypes) => {
    const product = Sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false // Ensure this field is required
        },
        brandName: {
            type: DataTypes.STRING,
            allowNull: false // Ensure this field is required
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true // Can be null if not required
        },
        productImage: {
            type: DataTypes.JSONB, // Change this to DataTypes.BLOB if storing binary data
            allowNull: true // If the image is optional
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false // Ensure this field is required
        },
        MRP: {
            type: DataTypes.INTEGER,
            allowNull: false, // Ensure MRP is required
            defaultValue: 0 // Set a numeric default instead of false
        },
        sellingPrice: {
            type: DataTypes.INTEGER,
            allowNull: false, // Ensure selling price is required
            defaultValue: 0 // Set a numeric default instead of false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false // This is fine for soft deletion
        }
    }, {
        tableName: 'product',
        underscored: false,
        paranoid: true, // This enables soft deletes
        timestamps: true,
        schema: "product"
    });
    product.association = (models) => {
        product.belongsTo(models.user,{ foreignKey: "createdBy" });
        product.belongsTo(models.category,{ foreignKey: "categoryId" });
        product.hasMany(models.cartProduct, {foreignKey:'productId'});
    };

    return product;
}
