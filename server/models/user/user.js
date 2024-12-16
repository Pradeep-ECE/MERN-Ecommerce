const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {TE,to} = require('../../global_functions.js');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const cryptoService = require('../../services/crypto.service.js');
// const { type } = require('os');
module.exports = (Sequelize, DataTypes) => {
    const user = Sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        dob: {
            type: DataTypes.DATE,
        },
        email: {
            type: DataTypes.STRING,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            required: true

        },
        profilePic:{
            type: DataTypes.TEXT,
            defaultValue:null
        },
        isVerified:{
            type:DataTypes.BOOLEAN,
            defaultValue : false
        },
        isDeleted:{
            type: DataTypes.BOOLEAN,
            defaultValue : false
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue : false
        }
    }, {
        tableName:'user',
        underscored:false,
        paranoid:true,
        timestamps:true,
        schema: "user"
    });
    user.associate= function(models)
        {
        console.log('models666',models);
        this.product = this.hasMany(models.product,{foreignKey : 'createdBy'});
    } 
        
        user.beforeSave(async (user,options) => {
            let err;
            if(user.changed('password')){
                let salt,hash;
                let rounds = crypto.randomInt(6,10);
                [err,salt] = await to(bcrypt.genSalt(rounds));
                if(err){
                    console.log('errr'+err.message);
                }
                [err,hash] = await to(bcrypt.hash(user.password,salt));
                if(err){
                    console.log('err'+err.message);
                }
                user.password = hash;
            }
    
        });
        user.prototype.getJwt = async function(){
            let err, encryptedToken;
            const token = "Bearer " + jwt.sign({
                id:this.id,
                email:this.email
            },CONFIG.jwt_encryption,{expiresIn:CONFIG.jwt_expiration});
            [err,encryptedToken] = await to(cryptoService.encrypt(token));
            if(err) TE(err.message);
            // console.log('check123',encryptedToken);
             return encryptedToken;
        }
    return user;
}