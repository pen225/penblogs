const Validator = require("fastest-validator");
const v = new Validator();

const validator = (post, shema) => {
    return v.validate(post, shema)
}


// const schema = {
//     nom: { type: "string", min: 3, max: 10, optional: false },
//     prenom: { type: "string", min: 3, max: 70, optional: false },
//     email: { type: "email", optional: false },
//     password: { type: "string", min: 4, max: 16, optional: false}
// }
// const validator = v.validate(post, schema);
// if (validator !== true) {
//     console.log("Vous devez remplir tous les champs", validator);
//     res.status(400).json({
//         message: "Vous devez remplir tous les champs",
//         erreur: validator[0].nessage="votre mot de passe doit etre compris entre 4 et 16 caractere"
//     })
// }