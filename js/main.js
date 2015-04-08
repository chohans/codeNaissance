/*
 * Main début du programme
 */

$(function(){

/*
 * Initialise le selecteur et charge les donnée du local storage
 */
    var $patients = $("#patients");
    $patients.select2({
        placeholder: "Choissir un patient",
        allowClear: true,
        data: _.map($.jStorage.index(), function(nomPatient){
            return {
                id: nomPatient,
                text: nomPatient
            }
        })
    });

    $("#newPatient").click(function(){
        $("#newPatientContainer").toggle("slow");
    });

    /* Mets en mémoire dans la var patient
     * les données introduits
     * dans le formulaire
     */

    var $name = $("#name");
    var $birthdate = $("#birthdate");

    $("#createNewPatient").click(function(){
        var patient = {
            name: $name.val(),
            birthdate: $birthdate.val()
        };

        $.jStorage.set(patient.name, patient) // Mets les données dans le local storage

        // efface le contenu de l'input nom et date'
        $name.val(null);
        $birthdate.val(null);

        $("#newPatientContainer").hide("slow"); // referme le formulaire automatiquement

        /*
        * réactualise la liste des noms des patients
        */

        $patients.select2({
            placeholder: "Choissir un patient",
            allowClear: true,
            data: _.map($.jStorage.index(), function(nomPatient){
                return {
                    id: nomPatient,
                    text: nomPatient
                }
            })
        });
    });

    /*
     *  En cliquant sur le bouton 'annuler' le formulaire se referme
     */

    $("#cancelNewPatient").click(function(){
        $("#newPatientContainer").hide("slow");
    } );

    /*
 *  selection d'un autre nom dans la liste disponible
 */
    $patients.on("change", function(selection){
        var patient = $.jStorage.get(selection.val);

        changePatient(patient); // envoie des données du patients
    });

    moment.lang('fr');
    //        Object {name: "tonio", birthdate: "1963-05-17"}
/*
 *  Calcul des 3 autrees dates de la personne choisie et des 4 clés
 *  des 4 jours cibles et des 4 ans cibles
 */
    var changePatient = function(patient){
        var nom = voyelleConsonne(patient.name);
        var naissance = formatDate(moment(patient.birthdate));
        var cleSaison = testTrimestre(patient.birthdate); // Pour récuperer la clé du trimestre
        var keyN = calculCle(naissance); // calcul clé de naissance
        var anCibleN = calculYear(naissance);
        var conception = formatDate(moment(patient.birthdate).subtract(9, "M"));
        var KeyC = calculCle(conception); // calcul clé de conception
        var anCibleC = calculYear(conception);
        var m9 = formatDate(moment(patient.birthdate).subtract(18, "M"));
        var KeyM9 = calculCle(m9); // calcul clé de -9 mois
        var anCibleM9 = calculYear(m9);
        var p9 = formatDate(moment(patient.birthdate).add(9, "M"));
        var KeyP9 = calculCle(p9); // calcul clé de +9 mois
        var anCibleP9 = calculYear(p9);

    /*
     *  complete le sous titre par le nom de la personne consultée
     */
        $("#theme").text("Thème").append(nom);

    /*
     *  Ecriture des 4 date fondatrices
     */
        $("#nDate").text(naissance);
        $("#cDate").text(conception);
        $("#m9Date").text(m9);
        $("#p9Date").text(p9);
    /*
     *  Ecriture des 4 clés
     */
        $("#keyN").text(formatKey(keyN));
        $("#keyC").text(formatKey(KeyC));
        $("#key-9").text(formatKey(KeyM9));
        $("#keyP9").text(formatKey(KeyP9));
    /*
     *  Ecriture des 4 jours cibles
     */
        $("#jourCibleN").text(anCibleN[1]);
        $("#jourCibleC").text(anCibleC[1]);
        $("#jourCible-9").text(anCibleM9[1]);
        $("#jourCibleP9").text(anCibleP9[1]);
    /*
     *  Ecriture des 4 ans cibles
     */
        $("#anCibleN").text(anCibleN[0]);
        $("#anCibleC").text(anCibleC[0]);
        $("#anCible-9").text(anCibleM9[0]);
        $("#anCibleP9").text(anCibleP9[0]);

        var nbCleSaison = KeyM9[1] + " " + KeyC[1] + " " + keyN[1] + " " + KeyP9[1];
        $("#cleSaison").text(cleSaison + nbCleSaison);
        $("#complements").text(" né(e) le : ");
        $("#complements").prepend(nom).append(moment(patient.birthdate).format("dddd D MMMM YYYY"));
    /*
     *  Ecriture des 4 clés dans l'arbre des clés
     */
        $("#cleMoins9").text(KeyM9[1]);
        $("#cleConception").text(KeyC[1]);
        $("#cleNaissance").text(keyN[1]);
        $("#clePlus9").text(KeyP9[1]);

        var totalEssence = KeyM9[1] + KeyC[1] + keyN[1] + KeyP9[1],
            totalTriangleP = parseInt(sup9(KeyM9[1] + KeyC[1])),
            totalTriangleR = parseInt(sup9(KeyC[1] + keyN[1])),
            totalTriangleC = parseInt(sup9(keyN[1] + KeyP9[1])),
            totalTransformation = totalTriangleP + totalTriangleR + totalTriangleC,
            totalIncarnation1 = sup9(totalTriangleP + totalTriangleR),
            totalIncarnation2 = sup9(totalTriangleC + totalTriangleR),
            totalIncarnation = sup9(totalIncarnation1 + totalIncarnation2),
            totalSommeInterne = sup9(KeyC[1] + keyN[1]),
            totalValeurSupreme =sup9(KeyM9[1] + KeyP9[1]);

        $("#essence").text(totalEssence+"/"+addPlus(totalEssence));
        $("#triangleP").text(totalTriangleP);
        $("#triangleR").text(totalTriangleR);
        $("#triangleC").text(totalTriangleC);
        $("#transformation").text(totalTransformation + "/" + addPlus(totalTransformation));
        $("#accordIncarnation1").text(totalIncarnation1);
        $("#accordIncarnation2").text(totalIncarnation2);
        $("#incarnation").text(totalIncarnation);
        $("#sommeInterne").text(totalSommeInterne);
        $("#valAbsolue").text(totalValeurSupreme);
    }

    /*
     *  formatage final de la date
     */
    var formatDate = function(date)
    {
        return date.format("D/M/YYYY");
    }
    /*
     *  formatage final de la clé de naissance
     */
    var formatKey = function(cle)
    {

        return cle.join("/");
    }

    $("#btnArbre").click(function(){
        $("#arbreContainer").toggle("slow");
    } );

});



