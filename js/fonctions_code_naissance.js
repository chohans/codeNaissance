
function calculYear(date)
{
    var newYear = "", // variablme contenant le calcul de l'année
        an ="", // variable contenat l'année reçue de la date
        mois ="", // variable contenant le mois reçue de la date
        jour ="", // variable contenat le jour reçue de la date
        l = date.length, // longueur de la date avec les "/"
        tabCibles = []; //on y met l'an cible et le jour cible'

    an = date.substr(l-4, 4); // récuperation des 4 chiffres de l'année reçue

    date = date.slice(0,l-5); // on prend le debut de la date jusqu'a la fin du mois


    for(var l=date.length-1; l>=0; l--)
    {
        /*  Je cherche le passage entre le jour et le mois en cherchant le "/"
         ** puis extraction de la partie contenant le mois
        */
        if(date[l]== "/")
        {
            mois = date.substr(l+1); // récuperation du mois
            jour = date.slice(0, l); // retire le mois reste le jour mit en mémoire
        }
    }

    newYear = parseInt(an) + parseInt(mois) + parseInt(jour);
    tabCibles.push(newYear);
    tabCibles.push(jour + "/" + mois);

    return tabCibles;
}


function calculCle (date)
{
    var newDate = extraire(date);
    var chemin = add(newDate);
    var resource = addPlus(chemin);

    resource.unshift(chemin);

    return resource;
}


function addPlus(nombre)
{
    nombre = nombre.toString();
    var total = 0, sousTotal = nombre,
        l = nombre.length;
    var tabTotaux = [];

    if(l>1){
        for(var i =0; i<l; i++)
        {
            total += parseInt(nombre[i]);
        }
    }
    else{
        total = parseInt(nombre);
    }

    if(total>9)
    {
        sousTotal = total;
        total = (total%10)+((total-(total%10))/10);
        tabTotaux.push(total, sousTotal);
    }
    else
    {
        if(total != nombre){
            tabTotaux.push(total);
        }
        else{
            tabTotaux = [];
        }
    }

    return tabTotaux;
}


function extraire(date)
{
    //var str = nombre.toString();
    var l= date.length;
    var tabChiffre = [];

    for(var i =0; i<l; i++)
    {
        if(date[i]!= "/"){
            tabChiffre.push(date[i]);
        }
    }

    return tabChiffre;
}


function add(nombre)
{
    var total = 0,
        l = nombre.length;

    if(l>1){
        for(var i = 0; i<=l-1; i++){
            total += parseInt(nombre[i]);
        }
    }
    else{
        total = parseInt(nombre);
    }

    return total;
}

function voyelleConsonne(nom)
{
    nom = nom.toLowerCase();
    var initiale = nom[0];
    if(initiale == "a" || initiale == "e" || initiale == "i" || initiale == "o" ||
       initiale == "u" || initiale == "y" || initiale == "é" || initiale == "è"){
        nom = " d' "+ nom;
    }
    else{
        nom = " de " + nom;
    }

    return nom;
}
