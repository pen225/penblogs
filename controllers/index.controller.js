
const IndexController = class {
    static accueil = (req, res) => {
        res.send("<h1> Bienvenue sur mon blog </h1>");
    }
}



module.exports = IndexController;