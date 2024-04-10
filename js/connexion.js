// Récupération des éléments HTML
const formulaireConnexion = document.getElementById("connexionForm");
const emailInput = document.getElementById("email");
const motDePasseInput = document.getElementById("motDePasse");
const connexionButton = document.getElementById("connexionButton");

// Écouteur d'événement pour la soumission du formulaire de connexion
connexionButton.addEventListener("click", function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    // Récupération des valeurs des champs
    const email = emailInput.value;
    const motDePasse = motDePasseInput.value;

    // Vérification des informations d'identification
    const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
    const utilisateurTrouve = utilisateurs.find((utilisateur) => utilisateur.email === email && utilisateur.motDePasse === motDePasse);

    if (utilisateurTrouve) {
        alert("Connexion réussie. Vous êtes maintenant connecté.");
        // Redirigez l'utilisateur vers une autre page ou accordez-lui l'accès aux fonctionnalités appropriées.
    } else {
        alert("E-mail ou mot de passe incorrect. Veuillez réessayer.");
    }
});

let visible = false;
document.getElementById("btn-visibilite-password").addEventListener("click", () => {
    visibilite();
});
function visibilite() {
    let oeil = document.getElementById("oeil");
	//visible est une variable booléenne
	//si ce n'est pas visible alors au clic je viens modifier l'image
    if (!visible) {
        visible = true;
        oeil.setAttribute('src', "images/eye-open.png");
        oeil.setAttribute('alt', "Icône oeil ouvert");
		//je modifie également le type de l'input pour afficher le mot de passe en clair
        document.getElementById("motDePasse").setAttribute('type', 'text');
    } else {
        visible = false;
        oeil.setAttribute('src', "images/eye-close.png");
        oeil.setAttribute('alt', "Icône oeil fermé");
        document.getElementById("motDePasse").setAttribute('type', 'password');
    }
}