/**
 * Application Loi de Hick - Cours UI/UX
 * Gère le test interactif et la comparaison de design.
 */

class HickApp {
    constructor() {
        // Liste complète des plats pour le test 1 (Surchargé)
        this.allDishes = [
            "🍕 Pizza Margherita", // La cible
            "🍕 Pizza Regina", "🍕 Pizza Calzone", "🍕 Pizza Marinara", 
            "🍕 Pizza Pepperoni", "🍕 Pizza Quattro Formaggi", "🍕 Pizza Diavola", 
            "🍕 Pizza Capricciosa", "🍕 Pizza Tonno", "🍕 Pizza Funghi", 
            "🍕 Pizza Hawaï", "🍕 Pizza Bianca", "🍕 Pizza Napoletana", 
            "🍕 Pizza Rustica", "🍕 Pizza Ortolana", "🍕 Pizza Végétarienne",
            "🍝 Pâtes Carbonara", "🍝 Pâtes Bolognaise", "🍝 Pâtes Pesto", 
            "🍝 Pâtes Lasagnes", "🍝 Pâtes Ravioles", "🍝 Pâtes Gnocchi", 
            "🍝 Pâtes Cannelloni", "🍝 Pâtes Arrabbiata", "🍝 Pâtes Fruits de Mer",
            "🥗 Salade César", "🥗 Salade Niçoise", "🥗 Salade Grecque", 
            "🥗 Salade Caprese", "🥗 Salade Verte", "🥗 Salade Piémontaise",
            "🍰 Tiramisu", "🍰 Panna Cotta", "🍰 Tarte Tatin", 
            "🍰 Fondant Chocolat", "🍰 Mousse Chocolat", "🍰 Crème Brûlée", 
            "🍰 Moelleux Pistache", "🍰 Baba au Rhum", "🍰 Glace Vanille",
            "🍟 Frites Maison", "🍔 Burger Classique", "🍔 Burger Poulet",
            "🥩 Entrecôte Grillée", "🥩 Tartare de Bœuf", "🐟 Filet de Saumon",
            "🍛 Risotto Poulet", "🍛 Risotto Truffe"
        ];

        // Catégorisation pour le test 2 (Épuré)
        this.categorizedDishes = {
            entrees: [
                { name: "🥗 Salade César", price: "9.50 €", emoji: "🥗" },
                { name: "🥗 Salade Caprese", price: "8.50 €", emoji: "🥗" },
                { name: "🥗 Bruschetta Tomate", price: "7.00 €", emoji: "🍞" }
            ],
            plats: [
                { name: "🍝 Pâtes Carbonara", price: "14.00 €", emoji: "🍝" },
                { name: "🍕 Pizza Margherita", price: "11.00 €", emoji: "🍕" }, // La cible
                { name: " lasagna Lasagnes Bœuf", price: "13.50 €", emoji: "🍝" }
            ],
            desserts: [
                { name: "🍰 Tiramisu Maison", price: "6.50 €", emoji: "🍰" },
                { name: "🍰 Panna Cotta Fruits", price: "6.00 €", emoji: "🍮" },
                { name: "🍨 Café Gourmand", price: "7.50 €", emoji: "☕" }
            ]
        };

        // Textes explicatifs des hotspots
        this.hotspotExplosions = {
            'nav-bad': {
                title: "Navigation Surchargée (15 liens)",
                badge: "Erreur UI",
                text: "Donner trop de choix de navigation dès le premier regard perd l'internaute. Son regard papillonne et le temps de décision pour trouver la bonne rubrique explose. Il vaut mieux regrouper sous 3 ou 4 grands onglets."
            },
            'hero-bad': {
                title: "Boutons d'importance égale",
                badge: "Erreur UI",
                text: "Mettre 4 boutons d'action (CTA) côte à côte avec le même style visuel et la même couleur sème la confusion. L'utilisateur hésite devant tant d'options et finit souvent par quitter la page sans cliquer."
            },
            'features-bad': {
                title: "Catalogue brut sans filtres",
                badge: "Erreur UI",
                text: "Afficher toutes les fonctionnalités ou catégories en vrac force le cerveau à tout lire pour faire un tri mental. C'est l'illustration directe de la surcharge cognitive."
            },
            'nav-good': {
                title: "Navigation Minimaliste",
                badge: "Bonne Pratique",
                text: "Seulement 3 catégories principales pour orienter l'utilisateur. Les options secondaires sont masquées dans des sous-rubriques ou repoussées dans le pied de page."
            },
            'hero-good': {
                title: "Appel à l'action unique (CTA)",
                badge: "Bonne Pratique",
                text: "Un seul bouton principal contrasté (Indigo) pour guider le clic. Le choix secondaire ('Voir la démo') est traité sous forme de lien discret pour ne pas concerrencer l'action principale."
            },
            'features-good': {
                title: "Règle de trois piliers",
                badge: "Bonne Pratique",
                text: "Les services sont synthétisés en 3 grands piliers d'information faciles à balayer visuellement. Le temps de lecture et de compréhension est réduit au minimum."
            }
        };

        // État de l'expérience
        this.timeBad = 0;
        this.timeGood = 0;
        this.timerInterval = null;
        this.startTime = 0;
        this.activeGoodTab = "plats";
    }

    // Mélange de tableau (Fisher-Yates)
    shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // Change d'étape active
    goToStep(stepId) {
        document.querySelectorAll('.experiment-step').forEach(step => {
            step.classList.remove('active');
        });
        document.getElementById(stepId).classList.add('active');
    }

    // --- PHASE 1 : MAUVAISE PRATIQUE ---
    startExperiment() {
        this.goToStep('step-countdown-1');
        this.runCountdown(3, 'countdown-val-1', () => this.startTest1());
    }

    runCountdown(seconds, elementId, onComplete) {
        let count = seconds;
        const el = document.getElementById(elementId);
        el.textContent = count;
        
        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                el.textContent = count;
            } else {
                clearInterval(interval);
                onComplete();
            }
        }, 1000);
    }

    startTest1() {
        this.goToStep('step-test-1');
        const grid = document.getElementById('bad-grid');
        grid.innerHTML = '';
        
        // Mélanger les plats
        const shuffledDishes = this.shuffle([...this.allDishes]);
        
        // Générer les 48 boutons
        shuffledDishes.forEach(dish => {
            const btn = document.createElement('button');
            btn.className = 'btn-grid-bad';
            btn.textContent = dish;
            
            // Écouteur de clic
            btn.onclick = () => {
                if (dish === "🍕 Pizza Margherita") {
                    this.endTest1();
                } else {
                    // Petite animation d'erreur
                    btn.style.backgroundColor = 'var(--error-light)';
                    btn.style.borderColor = 'var(--error)';
                    btn.style.color = 'var(--error)';
                    setTimeout(() => {
                        btn.style.backgroundColor = '';
                        btn.style.borderColor = '';
                        btn.style.color = '';
                    }, 500);
                }
            };
            
            grid.appendChild(btn);
        });

        // Lancer le timer
        this.startTimer('timer-1');
    }

    endTest1() {
        this.stopTimer();
        this.timeBad = this.elapsedTime;
        this.goToStep('step-transition');
    }

    // --- PHASE 2 : BONNE PRATIQUE ---
    startCountdown2() {
        this.goToStep('step-countdown-2');
        this.runCountdown(3, 'countdown-val-2', () => this.startTest2());
    }

    startTest2() {
        this.goToStep('step-test-2');
        this.switchGoodTab('plats'); // L'onglet par défaut contient la Pizza Margherita
        this.startTimer('timer-2');
    }

    switchGoodTab(tabName) {
        this.activeGoodTab = tabName;
        
        // Gérer les classes actives de la sidebar
        document.querySelectorAll('.sidebar-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`tab-${tabName}`).classList.add('active');
        
        // Afficher les plats de cet onglet
        const container = document.getElementById('good-products-container');
        container.innerHTML = '';
        
        const products = this.categorizedDishes[tabName];
        products.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-card-good';
            
            card.innerHTML = `
                <div class="product-emoji">${prod.emoji}</div>
                <div class="product-name">${prod.name}</div>
                <div class="product-price">${prod.price}</div>
                <div class="btn-select-good">Sélectionner</div>
            `;
            
            card.onclick = () => {
                if (prod.name === "🍕 Pizza Margherita") {
                    this.endTest2();
                } else {
                    card.style.borderColor = 'var(--error)';
                    setTimeout(() => {
                        card.style.borderColor = '';
                    }, 500);
                }
            };
            
            container.appendChild(card);
        });
    }

    endTest2() {
        this.stopTimer();
        this.timeGood = this.elapsedTime;
        this.showResults();
    }

    // --- CHRONOMÈTRE ---
    startTimer(timerElementId) {
        this.startTime = Date.now();
        const el = document.getElementById(timerElementId);
        
        this.timerInterval = setInterval(() => {
            this.elapsedTime = ((Date.now() - this.startTime) / 1000).toFixed(1);
            el.textContent = `${this.elapsedTime}s`;
        }, 100);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    // --- RÉSULTATS ---
    showResults() {
        this.goToStep('step-results');
        
        const badTimeSec = parseFloat(this.timeBad);
        const goodTimeSec = parseFloat(this.timeGood);
        
        document.getElementById('result-time-bad').textContent = `${badTimeSec.toFixed(2)} s`;
        document.getElementById('result-time-good').textContent = `${goodTimeSec.toFixed(2)} s`;
        
        // Calcul du rapport
        const ratio = (badTimeSec / goodTimeSec).toFixed(1);
        const improvement = Math.round(((badTimeSec - goodTimeSec) / badTimeSec) * 100);
        
        // Gérer les barres du graphique
        setTimeout(() => {
            const barBad = document.getElementById('bar-bad');
            const barGood = document.getElementById('bar-good');
            
            barBad.style.width = '100%';
            const goodWidth = Math.max(10, Math.min(100, (goodTimeSec / badTimeSec) * 100));
            barGood.style.width = `${goodWidth}%`;
        }, 200);

        // Texte récapitulatif
        const summaryText = document.getElementById('chart-summary-text');
        if (goodTimeSec < badTimeSec) {
            summaryText.innerHTML = `🎉 Vous avez été <strong>${ratio} fois</strong> plus rapide (${improvement}% de gain de temps) avec l'interface épurée !`;
        } else {
            summaryText.innerHTML = `🧐 Vos temps sont similaires, mais l'interface épurée a considérablement réduit votre effort visuel !`;
        }
    }

    resetExperiment() {
        this.timeBad = 0;
        this.timeGood = 0;
        this.elapsedTime = 0;
        this.goToStep('step-intro');
    }

    // --- INTERACTIVE MOCKUPS COMPARISON ---
    switchMockup(type) {
        // Gérer l'état des boutons du toggle
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`btn-show-${type}`).classList.add('active');
        
        // Gérer l'état d'affichage des maquettes
        document.querySelectorAll('.mockup-view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`mockup-${type}`).classList.add('active');
        
        // Fermer le tooltip courant
        this.closeTooltip();
    }

    showTooltip(key, element) {
        const tooltip = document.getElementById('tooltip-box');
        const badge = document.getElementById('tooltip-badge');
        const titleEl = document.createElement('h4');
        const textEl = document.getElementById('tooltip-text');
        
        const data = this.hotspotExplosions[key];
        
        if (!data) return;
        
        badge.textContent = data.badge;
        badge.className = `tooltip-badge ${data.badge === 'Erreur UI' ? 'bad' : 'good'}`;
        
        // Mettre à jour le texte du tooltip
        textEl.innerHTML = `<strong>${data.title}</strong><br>${data.text}`;
        
        // Afficher l'overlay tooltip
        tooltip.style.display = 'block';
        
        // Style de couleur selon le type
        if (data.badge === 'Erreur UI') {
            badge.style.color = 'var(--error)';
        } else {
            badge.style.color = 'var(--success)';
        }
    }

    closeTooltip() {
        document.getElementById('tooltip-box').style.display = 'none';
    }
}

// Initialisation au chargement de la page
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new HickApp();
});
