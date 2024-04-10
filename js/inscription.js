// Récupération des éléments HTML
const formulaireInscription = document.getElementById("inscriptionForm");
const nomUtilisateurInput = document.getElementById("nomUtilisateur");
const emailInput = document.getElementById("email");
const motDePasseInput = document.getElementById("motDePasse");
const confirmationMotDePasseInput = document.getElementById("confirmationMotDePasse");
const validerButton = document.getElementById("validerButton");


function ajouterUtilisateur(nom, email, motDePasse) {
    // Vérifiez si des données d'utilisateurs existent déjà dans le localStorage
    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

    // Créez un nouvel objet utilisateur
    const nouvelUtilisateur = {
        nom: nom,
        email: email,
        motDePasse: motDePasse
    };

    // Ajoutez le nouvel utilisateur au tableau
    utilisateurs.push(nouvelUtilisateur);

    // Enregistrez le tableau mis à jour dans le localStorage
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
}


// Écouteur d'événement pour la soumission du formulaire
validerButton.addEventListener("click", function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    // Récupération des valeurs des champs
    const nomUtilisateur = nomUtilisateurInput.value;
    const email = emailInput.value;
    const motDePasse = motDePasseInput.value;
    const confirmationMotDePasse = confirmationMotDePasseInput.value;

    // Vérifications
    if (nomUtilisateur.length < 3) {
        alert("Le nom d'utilisateur doit contenir au moins 3 caractères.");
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailRegex)) {
        alert("L'adresse email n'est pas valide.");
        return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{6,}$/;
    if (!motDePasse.match(passwordRegex)) {
        alert("Le mot de passe doit contenir au moins 6 caractères, un chiffre, une lettre et un symbole.");
        return;
    }

    if (motDePasse !== confirmationMotDePasse) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    // Enregistrement dans le localStorage
    ajouterUtilisateur(nomUtilisateur, email, motDePasse);
    alert("Inscription réussie. Les informations de l'utilisateur ont été enregistrées.");
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
