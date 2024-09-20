const nodemailer=require('nodemailer');
const config=require('../config/config');
const{to,TE}=require("../global_functions");

const sendMail= async function(toMail,mailContent,keyObject)
{

    console.log("Mail Called");
    
    const sender=nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
                user: CONFIG.user,
                pass:CONFIG.pass

             },
        host:"smtp.gmail.com",
        port:465
    });
    for(let key in keyObject)
        {
            const replaceText='%' + key +'%';
            const replaceRegExp =new RegExp(replaceText,'g');
            mailContent=mailContent.replace(replaceRegExp,keyObject[key]);
        }
    const composeMail=
        {
             from:'pradeepery141@gmail.com',
             to:[toMail,'pradeep@mailinator.com'],
             subject:'Test mail',
             html: mailContent
        }
    let[err,response]=await to(sender.sendMail(composeMail));
    // console.log('err in sending mail',err);
    if(err) TE(err.message);
    return response;
}
module.exports.sendMail=sendMail;