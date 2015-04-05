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

    //        Object {name: "tonio", birthdate: "1963-05-17"}
/*
 *  Calcul des 3 autrees dates de la personne choisie et des 4 clés
 *  des 4 jours cibles et des 4 ans cibles
 */
    var changePatient = function(patient){
        var nom = voyelleConsonne(patient.name);
        var naissance = formatDate(moment(patient.birthdate));
        var keyN = formatKey(calculCle(naissance));
        var anCibleN = calculYear(naissance);
        var conception = formatDate(moment(patient.birthdate).subtract(9, "M"));
        var KeyC = formatKey(calculCle(conception));
        var anCibleC = calculYear(conception);
        var m9 = formatDate(moment(patient.birthdate).subtract(18, "M"));
        var KeyM9 = formatKey(calculCle(m9));
        var anCibleM9 = calculYear(m9);
        var p9 = formatDate(moment(patient.birthdate).add(9, "M"));
        var KeyP9 = formatKey(calculCle(p9));
        var anCibleP9 = calculYear(p9);

    /*
     *  complete le sous titre par le nom de la personne consultée
     */
        $("h2").text("Thème");
        $("h2").append(nom);
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
        $("#keyN").text(keyN);
        $("#keyC").text(KeyC);
        $("#key-9").text(KeyM9);
        $("#keyP9").text(KeyP9);
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
});



