(function() {

    var $eventModal;
    var $eventName = $("#eventName");

    $("#addEvent").click(function() {
        $eventModal = $("#newEvent").modal();
    });


    $("#saveEvent").click(function saveEvent() {
        // Je stocke notre var globale ici comme raccourci
        var codeNaissance = window.codeNaissance;

        // On récupère le patient courant dans notre variable globale
        var currentPatient = codeNaissance.currentPatient;
        var eventName = $eventName.val();


        // Si le patient courant n'a pas encore d'évenement on initialise la liste
        if (!currentPatient.events) {
            currentPatient.events = [];
        }

        // On rajoute le nouvel évènement à la liste
        currentPatient.events.push({
            name: eventName
        });

        // On sauve le patient modifié
        codeNaissance.savePatient(currentPatient);

        // On nettoie le champ du formulaire
        $eventName.val(null);
        // On ferme la modal
        $eventModal.modal("hide");
    });
})();
