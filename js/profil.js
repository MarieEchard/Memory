// Cette partie du code attend que le document HTML soit complètement chargé
document.addEventListener("DOMContentLoaded", function () {
    // Récupère la référence à l'élément du sélecteur de thème dans le HTML.
    const selecteurTheme = document.getElementById("selecteurTheme");
    // Récupère la référence à l'élément du bouton "Enregistrer" dans le HTML.
    const enregistrerTheme = document.getElementById("enregistrerTheme");

    // Attache un gestionnaire d'événement au bouton "Enregistrer" pour gérer les clics.
    enregistrerTheme.addEventListener("click", function () {
        // Récupère la valeur actuellement sélectionnée dans le sélecteur de thème.
        const themeSelectionne = selecteurTheme.value;
        // Enregistre le thème sélectionné par l'utilisateur dans un cookie nommé "theme".
        document.cookie = `theme=${themeSelectionne}`;
        //'Alerte' pour informer l'utilisateur que le thème a été enregistré avec succès.
        alert("Thème enregistré avec succès !");
    });
});