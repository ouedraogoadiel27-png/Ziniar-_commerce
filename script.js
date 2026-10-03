/* =========================================
   CONFIGURATION DE LA BOUTIQUE
========================================= */

const boutique = {
    nom: "Ziniaré Commerce",
    whatsapp: "22607207713",
    adresse: "Ziniaré, Burkina Faso",
    horaires: "Lundi - Samedi : 8h00 - 19h00",
    livraison: "Livraison disponible"
};


/* =========================================
   PRODUITS
========================================= */

const produits = [
    {
        nom: "Montre élégante",
        prix: 15000,
        description: "Montre moderne pour homme.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
    },

    {
        nom: "Chaussures sport",
        prix: 20000,
        description: "Chaussures confortables et modernes.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
    },

    {
        nom: "Sac moderne",
        prix: 12500,
        description: "Sac pratique pour le quotidien.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
    }
];


/* =========================================
   PERSONNALISATION DU SITE
========================================= */

// Titre de la page
document.title = boutique.nom;


// Logo
const logo = document.querySelector(".logo");

if (logo) {
    logo.innerHTML = boutique.nom;
}


// Adresse dans le badge
const badge = document.querySelector(".badge");

if (badge) {
    badge.textContent = "📍 " + boutique.adresse;
}


// Texte de contact
const contactSection = document.querySelector("#contact");

if (contactSection) {

    contactSection.innerHTML = `
        <div class="container">

            <h2>Contactez-nous</h2>

            <p>📞 +${boutique.whatsapp}</p>

            <p>📍 ${boutique.adresse}</p>

            <p>🕒 ${boutique.horaires}</p>

            <p>🚚 ${boutique.livraison}</p>

        </div>
    `;
}


// Footer
const footerText = document.querySelector("footer p");

if (footerText) {
    footerText.textContent =
        "© 2026 " + boutique.nom;
}


/* =========================================
   AFFICHAGE DES PRODUITS
========================================= */

const productsGrid =
    document.querySelector(".products-grid");


function afficherProduits() {

    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    produits.forEach(function (produit) {

        const article =
            document.createElement("article");

        article.className = "product";

        article.innerHTML = `

            <img
                src="${produit.image}"
                alt="${produit.nom}"
            >

            <div class="product-info">

                <h3>
                    ${produit.nom}
                </h3>

                <p>
                    ${produit.description}
                </p>

                <div class="product-bottom">

                    <strong>
                        ${produit.prix.toLocaleString("fr-FR")} F
                    </strong>

                    <button>
                        Ajouter
                    </button>

                </div>

            </div>
        `;

        productsGrid.appendChild(article);
    });

    activerBoutonsProduits();
}


/* =========================================
   PANIER
========================================= */

let panier = [];


/* =========================================
   OUVRIR / FERMER LE PANIER
========================================= */

const cartButton =
    document.querySelector(".cart-button");

const cartPanel =
    document.getElementById("cart-panel");

const closeCart =
    document.getElementById("close-cart");


if (cartButton && cartPanel) {

    cartButton.addEventListener("click", function () {

        cartPanel.classList.add("active");

    });
}


if (closeCart && cartPanel) {

    closeCart.addEventListener("click", function () {

        cartPanel.classList.remove("active");

    });
}


/* =========================================
   AJOUTER UN PRODUIT AU PANIER
========================================= */

function activerBoutonsProduits() {

    document
        .querySelectorAll(".product-bottom button")
        .forEach(function (bouton) {

            bouton.addEventListener("click", function () {

                const produitElement =
                    bouton.closest(".product");

                const nom =
                    produitElement
                        .querySelector("h3")
                        .textContent;

                const prixTexte =
                    produitElement
                        .querySelector("strong")
                        .textContent;

                const prix =
                    parseInt(
                        prixTexte
                            .replace(/\s/g, "")
                            .replace("F", "")
                    );


                const produitExistant =
                    panier.find(function (article) {

                        return article.nom === nom;

                    });


                if (produitExistant) {

                    produitExistant.quantite++;

                } else {

                    panier.push({

                        nom: nom,

                        prix: prix,

                        quantite: 1

                    });

                }


                afficherPanier();

            });

        });
}


/* =========================================
   AFFICHER LE PANIER
========================================= */

function afficherPanier() {

    const cartItems =
        document.getElementById("cart-items");

    const compteur =
        document.getElementById("cart-count");

    const totalElement =
        document.getElementById("cart-total");


    if (!cartItems || !compteur || !totalElement) {
        return;
    }


    let nombreProduits = 0;

    let total = 0;


    panier.forEach(function (article) {

        nombreProduits += article.quantite;

        total +=
            article.prix * article.quantite;

    });


    compteur.textContent =
        nombreProduits;


    /* PANIER VIDE */

    if (panier.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Votre panier est vide.</p>';

        totalElement.textContent =
            "0 F";

        return;
    }


    /* AFFICHAGE */

    cartItems.innerHTML = "";


    panier.forEach(function (article, index) {

        const sousTotal =
            article.prix * article.quantite;


        const item =
            document.createElement("div");

        item.className =
            "cart-item";


        item.innerHTML = `

            <div class="cart-item-info">

                <span class="cart-item-name">
                    ${article.nom}
                </span>

                <span class="cart-item-price">
                    ${sousTotal.toLocaleString("fr-FR")} F
                </span>

            </div>


            <div class="quantity-controls">

                <button
                    class="moins"
                    data-index="${index}">
                    −
                </button>


                <span>
                    ${article.quantite}
                </span>


                <button
                    class="plus"
                    data-index="${index}">
                    +
                </button>


                <button
                    class="remove-item"
                    data-index="${index}">
                    🗑️
                </button>

            </div>
        `;


        cartItems.appendChild(item);

    });


    /* TOTAL */

    totalElement.textContent =
        total.toLocaleString("fr-FR") + " F";


    /* =====================================
       BOUTON +
    ===================================== */

    document
        .querySelectorAll(".plus")
        .forEach(function (bouton) {

            bouton.addEventListener("click", function () {

                const index =
                    Number(bouton.dataset.index);

                panier[index].quantite++;

                afficherPanier();

            });

        });


    /* =====================================
       BOUTON -
    ===================================== */

    document
        .querySelectorAll(".moins")
        .forEach(function (bouton) {

            bouton.addEventListener("click", function () {

                const index =
                    Number(bouton.dataset.index);

                panier[index].quantite--;


                if (panier[index].quantite <= 0) {

                    panier.splice(index, 1);

                }


                afficherPanier();

            });

        });


    /* =====================================
       SUPPRIMER
    ===================================== */

    document
        .querySelectorAll(".remove-item")
        .forEach(function (bouton) {

            bouton.addEventListener("click", function () {

                const index =
                    Number(bouton.dataset.index);

                panier.splice(index, 1);

                afficherPanier();

            });

        });

}


/* =========================================
   COMMANDE WHATSAPP
========================================= */

const whatsappButton =
    document.getElementById("order-whatsapp");


if (whatsappButton) {

    whatsappButton.addEventListener(
        "click",
        function () {

            if (panier.length === 0) {

                alert(
                    "Votre panier est vide !"
                );

                return;
            }


            let message =
                "Bonjour " +
                boutique.nom +
                ", je souhaite passer une commande :\n\n";


            let total = 0;


            panier.forEach(function (article) {

                const sousTotal =
                    article.prix *
                    article.quantite;


                total += sousTotal;


                message +=
                    "• " +
                    article.nom +
                    " × " +
                    article.quantite +
                    " : " +
                    sousTotal.toLocaleString("fr-FR") +
                    " F\n";

            });


            message +=
                "\n💰 Total : " +
                total.toLocaleString("fr-FR") +
                " F";


            message +=
                "\n\n📍 Livraison : à préciser";


            const url =
                "https://wa.me/" +
                boutique.whatsapp +
                "?text=" +
                encodeURIComponent(message);


            window.open(url, "_blank");

        }
    );

}


/* =========================================
   LANCEMENT DU SITE
========================================= */

afficherProduits();
