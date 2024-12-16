const { TE, to } = require('../../global_functions.js');

module.exports = (Sequelize, DataTypes) => {
    const category = Sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false // Ensure this field is required
        },
        categoryImage:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        createdBy:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false // This is fine for soft deletion
        }
    }, {
        tableName: 'category',
        underscored: false,
        paranoid: true, // This enables soft deletes
        timestamps: true,
        schema: "category"
    });
    category.association = (models) => {
        this.product = this.hasMany(models.product,{ foreignKey: "categoryId" });
    };

    return category;
}
