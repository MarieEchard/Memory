let themeSelectionne; 

const ROWS = 3; 
const COLUMNS = 4; 
let tableauImages = new Array(ROWS * COLUMNS).fill("images/question.svg"); 
const nbImages = (ROWS * COLUMNS) / 2; 

let premiereCarte = null; 
let deuxiemeCarte = null; 
let nbTentatives = 0; 

const compteurTentatives = document.getElementById("nbEssais"); 
const modal = document.getElementById("modal");
const rejouerButton = document.getElementById("rejouer");
const retourAuMenuButton = document.getElementById("retourMenu");

const extensionsThemes = { 
    alphabetScrabble: "png",
    animaux: "webp",
    animauxAnimes: "webp",
    animauxDomestiques: "jpg",
    chiens: "webp",
    dinosaures: "jpg",
    dinosauresAvecNom: "jpg",
    memoryLegume: "svg",
};

const themeCookie = document.cookie.split('; ').find(row => row.startsWith('theme='));
    
if (themeCookie) {
    themeSelectionne = themeCookie.split('=')[1]; 
} else {
    themeSelectionne = "alphabetScrabble"; 
}


constructionPlateau(); 
document.querySelectorAll("img").forEach(image => image.addEventListener("click", gestionEvent));
document.addEventListener("keydown", gererEvenements);
rejouerButton.addEventListener("click", () => {
    modal.style.display = "none";
    reinitialiserJeu();
});
retourAuMenuButton.addEventListener("click", () => {
    window.location.href = "accueil.html";
});



function genererTableauTheme(maxElements) {
    const tableauTheme = [];

    for (let i = 1; i <= maxElements; i++) {
        tableauTheme.push(i);
    }
    return tableauTheme;
}

function creerImage(src) { // Fonction pour créer un élément d'image
    const img = document.createElement("img"); // Crée un nouvel élément HTML de type "img"
    img.setAttribute("src", src); // Définit l'attribut "src" de l'élément image avec la source passée en argument
    return img; // Renvoie l'élément image créé
}

function generationTableauImages() { // Fonction pour générer les paires d'images
    const imagesUniques = genererTableauTheme(nbImages); // Crée un tableau d'images uniques
    const pairesImages = []; // Tableau pour stocker les paires d'images

    // Doubler chaque image unique pour créer des paires
    for (let i = 0; i < nbImages; i++) {
        pairesImages.push(imagesUniques[i]);
        pairesImages.push(imagesUniques[i]);
    }

    // Mélanger les paires d'images
    for (let i = pairesImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairesImages[i], pairesImages[j]] = [pairesImages[j], pairesImages[i]];
    }

    // Distribuer les paires d'images sur le tableauImages
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            tableauImages[i * COLUMNS + j] = pairesImages[i * COLUMNS + j];
        }
    }

    return tableauImages; // Renvoie le tableau d'images généré
}

function constructionPlateau() { // Fonction pour construire le plateau initial
    const plateau = document.getElementById("plateau"); // Récupère l'élément HTML qui représente le plateau de jeu par son ID

    // La boucle extérieure parcourt les rangées (ROWS) du plateau
    for (let i = 0; i < ROWS; i++) {
        let tr = document.createElement("tr"); // Crée un élément de ligne (tr) pour chaque rangée
        // La boucle intérieure parcourt les colonnes (COLUMNS) du plateau
        for (let j = 0; j < COLUMNS; j++) {
            let td = document.createElement("td"); // Crée un élément de cellule (td) pour chaque colonne
            let img = document.createElement("img"); // Crée un élément d'image (img) pour chaque case du jeu

            img.setAttribute("src", "images/question.svg"); // Définit l'attribut "src" de l'image avec le chemin de l'image "question.svg"   
            img.setAttribute("id", i * (ROWS + 1) + j + 1);
            td.appendChild(img);
            tr.appendChild(td);
        }
        plateau.appendChild(tr);
    }
    tableauImages = generationTableauImages();
}

function verifierPartieGagnee() {
    let toutesLesPairesTrouvees = true;

    // Parcourez le tableau d'images et vérifiez si toutes les paires sont révélées
    for (let i = 0; i < tableauImages.length; i++) {
        if (!document.getElementById(i + 1).classList.contains("revelee")) {
            toutesLesPairesTrouvees = false;
            break; // Sortez de la boucle dès que vous trouvez une paire non révélée
        }
    }
    if (toutesLesPairesTrouvees) {
        // Toutes les paires ont été trouvées affiche fenêtre modale
        const score = nbTentatives;
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = score;
        modal.style.display = "block";
    }
}

function gestionEvent(event) { 
    if (event && event.target) { // Vérifie que l'événement a été cliqué
        let image = event.target; 
        let id;
        if (image.getAttribute("id")) {
            id = image.getAttribute("id");
        }
        if (!image.classList.contains("revelee")) { // Vérifie si l'image n'est pas déjà révélée
            // Obtenez l'extension du thème à partir de la liste des extensions des thèmes ou utilisez "jpg" par défaut
            const extensionTheme = extensionsThemes[themeSelectionne];
            // Construisez le chemin de l'image en utilisant le thème, l'indice de l'image et l'extension
            const cheminImage = `images/${themeSelectionne}/${tableauImages[id - 1]}.${extensionTheme}`;
            image.setAttribute("src", cheminImage); // Change la source de l'image pour la révéler
            image.classList.add("revelee"); // Ajoute la classe "revelee" pour indiquer que l'image est révélée

            if (!premiereCarte) {
                premiereCarte = image;
            } else {
                deuxiemeCarte = image;
                nbTentatives++;
                compteurTentatives.textContent = nbTentatives; 

                if (premiereCarte.src === deuxiemeCarte.src) {
                    // Les images correspondent, les laisse révélées, puis réinitialise les variables de première et deuxième cartes
                    premiereCarte = null;
                    deuxiemeCarte = null;
                    verifierPartieGagnee();

                } else {
                    setTimeout(() => {
                        premiereCarte.setAttribute("src", "images/question.svg");
                        deuxiemeCarte.setAttribute("src", "images/question.svg");
                        premiereCarte.classList.remove("revelee");
                        deuxiemeCarte.classList.remove("revelee");
                        premiereCarte = null;
                        deuxiemeCarte = null;
                    }, 500); // Attend 0.5 seconde avant de les cacher
                }
            }
        }
    }
}

function gererEvenements(event) {
    if (event.type === "click") {
        gestionEvent(event);
    } else if (event.type === "keydown" && event.key === " ") {
        reinitialiserJeu();
    }
    else if (event.type === "click" && event.target.id === "retourMenu") {
        window.location.href = "accueil.html";
    }
}

function reinitialiserJeu() {
    premiereCarte = null;
    deuxiemeCarte = null;
    nbTentatives = 0;
    compteurTentatives.textContent = nbTentatives;

    // Réinitialisez les images et mélangez-les à nouveau
    tableauImages = generationTableauImages();
    document.querySelectorAll("img").forEach(image => {
        image.setAttribute("src", "images/question.svg");
        image.classList.remove("revelee");
    });
}
