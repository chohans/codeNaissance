var extraireChiffres = function (nombre) {

    var chiffres = [];
    for (var i = 0; i < nombre.length; i++) {

        chiffres.push(parseInt(nombre.charAt(i)));
    }

    return chiffres;
};

var sommeChiffres = function (chiffres) {
    var result = 0;
    chiffres.forEach(function (chiffre) {
        result = result + chiffre;
    });

    return result;
};

var sommeDate = function (date) {
    /*console.log("Calcul somme pour la date:",date.format("DD/MM/YYYY"));*/
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();


    var sommeJour = sommeChiffres(extraireChiffres(jour.toString()));
    var sommeMois = sommeChiffres(extraireChiffres(mois.toString())) +1;
    var sommeAnnee = sommeChiffres(extraireChiffres(annee.toString()));

    /*console.log("La somme pour le jour vaut:", sommeJour);
    console.log("La somme pour le mois vaut:", sommeMois);
    console.log("La somme pour l'année vaut:", sommeAnnee);*/

    var totalDate = sommeJour + sommeMois + sommeAnnee;
    if (totalDate > 9) {
        totalDate = sommeChiffres(extraireChiffres(totalDate.toString()));
    }
    
   /* console.log("La somme pour la date de naissance", date.format("DD/MM/YYYY"), "vaut:", totalDate);*/
    return totalDate;
};