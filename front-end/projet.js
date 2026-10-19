// ============================================================
// inventaire.js : données et fonctions partagées par les pages
// ============================================================

// Liste des départements (id = utilisé dans l'adresse ?dept=...)
const DEPARTEMENTS = [
  { id: "audit", nom: "Audit Internet" },
  { id: "achats", nom: "Departement de Certification et de Controle de Locale (DCPL)" },
  { id: "DCA", nom: "Departement Commissariat d'Avaries (DCA)" },
  { id: "DCE", nom: "departement Controle d'Exportation(DCE)" },
  { id: "DCI", nom: "Departement Controle des Importations (DCI)" },
  { id: "DCT", nom: "Departement de Controle des Techinque (DCT)" },
  { id: "DCL", nom: "Departement de Controle de Lobaratoire(DCL)" },
  { id: "DSI", nom: "Departement de Controle de Système d'Information (DSI)" },
  { id: "DF", nom: "Departement Financier (DF)" },
  { id: "DJ", nom: "Departement Juridique (DJ)" },
  { id: "DLog", nom: "Departement Logistique (DLog)" },
  { id: "DMac", nom: "Departement de Marketing (DMac)" },
  { id: "DMec", nom: "Departement de Metrologie (DMec)" },
  { id: "DNor", nom: "Departement de Normalisation (DNor)" },
  { id: "DPD", nom: "Departement de Planification et Division (DPD)" },

];

const MOIS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

// Valeurs possibles pour les colonnes « État »
const ETATS = ["", "Excellent", "Bon", "Correct", "Mauvais"];

// Année affichée par défaut = année en cours
const ANNEE_COURANTE = new Date().getFullYear();

// Clé de sauvegarde unique pour un département + une année + un mois
function cle(dept, annee, mois) {
  return "occ:" + dept + ":" + annee + ":" + mois;
}

// Lit les lignes sauvegardées (ou un tableau vide s'il n'y a rien)
function chargerLignes(dept, annee, mois) {
  try {
    const brut = localStorage.getItem(cle(dept, annee, mois));
    return brut ? JSON.parse(brut) : [];
  } catch (e) {
    return []; // stockage indisponible : on affiche un tableau vide
  }
}

// Enregistre les lignes d'un mois
function sauverLignes(dept, annee, mois, lignes) {
  try {
    localStorage.setItem(cle(dept, annee, mois), JSON.stringify(lignes));
  } catch (e) {
    /* ignoré : stockage indisponible */
  }
}

// Une ligne est « renseignée » si au moins une cellule n'est pas vide
function ligneRemplie(ligne) {
  return ligne.some((c) => c && c.trim() !== "");
}

// Nombre de mois (année en cours) qui contiennent des données
function moisRenseignes(dept) {
  let n = 0;
  for (let m = 0; m < 12; m++) {
    if (chargerLignes(dept, ANNEE_COURANTE, m).some(ligneRemplie)) n++;
  }
  return n;
}

// Déconnexion : supprime la clé d'auth et revient à la page de login
window.deconnexion = function () {
  localStorage.removeItem("occ-auth");
  location.replace("login.html");
};

// Branche le bouton de déconnexion si présent sur la page
(function () {
  const btn = document.getElementById("logout");
  if (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      deconnexion();
    });
  }
})();