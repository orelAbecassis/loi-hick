/**
 * Hub des Lois de l'UX - Hick, Fitts, Miller
 * Gère la navigation générale, les chronomètres et les expériences.
 */

class UXHubApp {
    constructor() {
        this.activeLaw = "hick";

        // --- DONNÉES LOI DE HICK ---
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

        this.categorizedDishes = {
            entrees: [
                { name: "🥗 Salade César", price: "9.50 €", emoji: "🥗" },
                { name: "🥗 Salade Caprese", price: "8.50 €", emoji: "🥗" },
                { name: "🥗 Bruschetta Tomate", price: "7.00 €", emoji: "🍞" }
            ],
            plats: [
                { name: "🍝 Pâtes Carbonara", price: "14.00 €", emoji: "🍝" },
                { name: "🍕 Pizza Margherita", price: "11.00 €", emoji: "🍕" }, // La cible
                { name: "🍝 Lasagnes Bœuf", price: "13.50 €", emoji: "🍝" }
            ],
            desserts: [
                { name: "🍰 Tiramisu Maison", price: "6.50 €", emoji: "🍰" },
                { name: "🍰 Panna Cotta Fruits", price: "6.00 €", emoji: "🍮" },
                { name: "🍨 Café Gourmand", price: "7.50 €", emoji: "☕" }
            ]
        };

        this.activeGoodTab = "plats";

        // --- EXPANSIONS HOTSPOTS ---
        this.hotspotExplosions = {
            // Hick
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
                text: "Un seul bouton principal contrasté pour guider le clic. Le choix secondaire ('Voir la démo') est traité sous forme de lien discret pour ne pas concurrencer l'action principale."
            },
            'features-good': {
                title: "Règle de trois piliers",
                badge: "Bonne Pratique",
                text: "Les services sont synthétisés en 3 grands piliers d'information faciles à balayer visuellement. Le temps de lecture et de compréhension est réduit au minimum."
            },
            // Fitts
            'fitts-nav-bad': {
                title: "Liens minuscules en hauteur",
                badge: "Erreur UI",
                text: "Placer les boutons principaux de navigation en haut de l'écran force l'utilisateur à étirer son pouce de manière inconfortable sur mobile. C'est hors de la zone naturelle d'action."
            },
            'fitts-actions-bad': {
                title: "Boutons minuscules côte à côte",
                badge: "Erreur UI",
                text: "Des boutons de moins de 48px de large placés trop proches provoquent des erreurs de clic fréquentes (le syndrome du gros pouce)."
            },
            'fitts-nav-good': {
                title: "Navigation simplifiée",
                badge: "Bonne Pratique",
                text: "Les actions de navigation secondaires sont réduites et faciles à ignorer."
            },
            'fitts-actions-good': {
                title: "Thumb Zone et grands boutons",
                badge: "Bonne Pratique",
                text: "Les boutons occupent toute la largeur (au moins 48px de hauteur) et sont placés au bas de l'écran, directement sous le pouce, optimisant l'accessibilité."
            },
            // Miller
            'miller-text-bad': {
                title: "Surcharge cognitive textuelle",
                badge: "Erreur UI",
                text: "Un long paragraphe compact sans repère visuel ni hiérarchie force l'œil à lire mot à mot. L'utilisateur se décourage et quitte la page sans mémoriser l'information."
            },
            'miller-text-good': {
                title: "Regroupement par piliers (Chunking)",
                badge: "Bonne Pratique",
                text: "L'information est découpée en 4 sections distinctes avec des puces et des mots-clés importants mis en gras. Le regard identifie le mot recherché en moins d'une seconde."
            }
        };

        // --- ETAT CHRONOMETRE ---
        this.times = {
            hick: { bad: 0, good: 0 },
            fitts: { bad: 0, good: 0 },
            miller: { bad: 0, good: 0 }
        };
        this.timerInterval = null;
        this.startTime = 0;
        this.elapsedTime = 0;
    }

    // --- NAVIGATION PRINCIPALE DES LOIS ---
    switchLaw(lawName) {
        this.activeLaw = lawName;

        // Activer l'onglet de navigation
        document.querySelectorAll('.law-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`tab-law-${lawName}`).classList.add('active');

        // Afficher la section correspondante
        document.querySelectorAll('.law-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`law-content-${lawName}`).classList.add('active');

        // Réinitialiser l'expérience en cours
        this.resetExperiment(lawName);
    }

    // --- LOGIQUE CHRONOMÈTRE ---
    startTimer(timerElementId) {
        this.startTime = Date.now();
        const el = document.getElementById(timerElementId);
        this.elapsedTime = 0;
        
        this.timerInterval = setInterval(() => {
            this.elapsedTime = ((Date.now() - this.startTime) / 1000).toFixed(1);
            el.textContent = `${this.elapsedTime}s`;
        }, 100);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    // --- REINITIALISER TEST ---
    resetExperiment(law) {
        this.stopTimer();
        this.elapsedTime = 0;
        this.times[law].bad = 0;
        this.times[law].good = 0;
        this.goToStep(law, 'intro');
    }

    goToStep(law, stepPrefix) {
        // Cacher toutes les étapes de la loi active
        const section = document.getElementById(`law-content-${law}`);
        section.querySelectorAll('.experiment-step').forEach(step => {
            step.classList.remove('active');
        });

        // Afficher l'étape cible
        let targetId = '';
        if (stepPrefix === 'intro') targetId = `step-intro-${law}`;
        else if (stepPrefix === 'countdown-1') targetId = `step-countdown-1-${law}`;
        else if (stepPrefix === 'test-1') targetId = `step-test-1-${law}`;
        else if (stepPrefix === 'transition') targetId = `step-transition-${law}`;
        else if (stepPrefix === 'countdown-2') targetId = `step-countdown-2-${law}`;
        else if (stepPrefix === 'test-2') targetId = `step-test-2-${law}`;
        else if (stepPrefix === 'results') targetId = `step-results-${law}`;

        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.classList.add('active');
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

    startExperiment(law) {
        this.goToStep(law, 'countdown-1');
        this.runCountdown(3, `countdown-val-1-${law}`, () => {
            if (law === 'hick') this.startTest1Hick();
            else if (law === 'fitts') this.startTest1Fitts();
            else if (law === 'miller') this.startTest1Miller();
        });
    }

    startCountdown2(law) {
        this.goToStep(law, 'countdown-2');
        this.runCountdown(3, `countdown-val-2-${law}`, () => {
            if (law === 'hick') this.startTest2Hick();
            else if (law === 'fitts') this.startTest2Fitts();
            else if (law === 'miller') this.startTest2Miller();
        });
    }

    // --- PHASE 1 FIN ---
    endTest1(law) {
        this.stopTimer();
        this.times[law].bad = this.elapsedTime;
        this.goToStep(law, 'transition');
    }

    // --- PHASE 2 FIN ---
    endTest2(law) {
        this.stopTimer();
        this.times[law].good = this.elapsedTime;
        this.showResults(law);
    }

    // --- EXPLICATIONS ET TOOLTIPS ---
    switchMockup(law, type) {
        document.querySelectorAll(`#law-content-${law} .toggle-btn`).forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`btn-show-${type}-${law}`).classList.add('active');
        
        document.querySelectorAll(`#law-content-${law} .mockup-view`).forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`mockup-${type}-${law}`).classList.add('active');
        
        this.closeTooltip(law);
    }

    showTooltip(key, element) {
        const tooltip = document.getElementById(`tooltip-box-${this.activeLaw}`);
        const badge = document.getElementById(`tooltip-badge-${this.activeLaw}`);
        const textEl = document.getElementById(`tooltip-text-${this.activeLaw}`);
        
        const data = this.hotspotExplosions[key];
        if (!data) return;
        
        badge.textContent = data.badge;
        badge.className = `tooltip-badge ${data.badge === 'Erreur UI' ? 'bad' : 'good'}`;
        textEl.innerHTML = `<strong>${data.title}</strong><br>${data.text}`;
        
        tooltip.style.display = 'block';
    }

    closeTooltip(law) {
        const box = document.getElementById(`tooltip-box-${law}`);
        if (box) box.style.display = 'none';
    }

    // --- LOGIQUE SPÉCIFIQUE : LOI DE HICK ---
    startTest1Hick() {
        this.goToStep('hick', 'test-1');
        const grid = document.getElementById('bad-grid-hick');
        grid.innerHTML = '';
        
        // Mélanger les plats (Fisher-Yates)
        let shuffled = this.shuffle([...this.allDishes]);
        
        shuffled.forEach(dish => {
            const btn = document.createElement('button');
            btn.className = 'btn-grid-bad';
            btn.textContent = dish;
            
            btn.onclick = () => {
                if (dish === "🍕 Pizza Margherita") {
                    this.endTest1('hick');
                } else {
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

        this.startTimer('timer-1-hick');
    }

    startTest2Hick() {
        this.goToStep('hick', 'test-2');
        this.switchGoodTab('plats');
        this.startTimer('timer-2-hick');
    }

    switchGoodTab(tabName) {
        this.activeGoodTab = tabName;
        
        document.querySelectorAll('.sidebar-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`tab-${tabName}`).classList.add('active');
        
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
                    this.endTest2('hick');
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

    shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // --- LOGIQUE SPÉCIFIQUE : LOI DE FITTS ---
    startTest1Fitts() {
        this.goToStep('fitts', 'test-1');
        this.startTimer('timer-1-fitts');
    }

    startTest2Fitts() {
        this.goToStep('fitts', 'test-2');
        this.startTimer('timer-2-fitts');
    }

    // --- LOGIQUE SPÉCIFIQUE : LOI DE MILLER ---
    startTest1Miller() {
        this.goToStep('miller', 'test-1');
        const container = document.getElementById('miller-container-bad');
        
        // Texte long compact pour le test
        const phrase = "Notre carte propose de nombreux plats typiquement italiens préparés chaque matin. Nous sélectionnons avec grand soin de la farine de blé fine et de l'huile d'olive de Sicile pour notre pâte à pain. De la traditionnelle et incontournable Pizza Margherita garnie de basilic frais à notre calzone bien bombée, toutes nos pizzas sont cuites au feu de bois pour une texture croustillante. Nous cuisinons également des pâtes fraîches au pesto basilic ou à la bolognaise mijotée pendant plusieurs heures, ainsi que des salades légères comme la César avec poulet grillé ou la Caprese à la mozzarella di bufala. Pour finir votre repas sur une touche sucrée, vous pouvez commander un Tiramisu crémeux ou une Panna Cotta vanillée.";
        
        // Découper en mots pour pouvoir cliquer dessus
        const words = phrase.split(" ");
        container.innerHTML = "";
        
        words.forEach(word => {
            const span = document.createElement("span");
            // Nettoyer la ponctuation pour la comparaison
            const cleanWord = word.replace(/[.,]/g, "");
            span.textContent = word + " ";
            
            if (cleanWord.toLowerCase() === "margherita") {
                span.className = "miller-target-word";
                span.onclick = () => this.endTest1('miller');
            } else {
                span.onclick = () => {
                    span.style.color = "var(--error)";
                    setTimeout(() => { span.style.color = ""; }, 500);
                };
            }
            container.appendChild(span);
        });
        
        this.startTimer('timer-1-miller');
    }

    startTest2Miller() {
        this.goToStep('miller', 'test-2');
        const container = document.getElementById('miller-container-good');
        
        // Même texte mais structuré proprement
        container.innerHTML = `
            <p>Notre carte propose de nombreux plats typiquement italiens préparés chaque matin avec de l'huile d'olive de Sicile.</p>
            <p><strong>Nos suggestions cuites au feu de bois :</strong></p>
            <ul>
                <li>🍕 La classique et traditionnelle <span class="miller-target-word" id="miller-target-good">Pizza Margherita</span> au basilic frais</li>
                <li>🍕 Notre Calzone garnie au jambon et champignons</li>
                <li>🍝 Pâtes fraîches (Carbonara, Pesto basilic ou Bolognaise)</li>
                <li>🥗 Salades fraîches (César au poulet ou Caprese mozzarella)</li>
            </ul>
            <p>Pour finir, commandez nos desserts faits maison : <strong>Tiramisu</strong> ou <strong>Panna Cotta</strong>.</p>
        `;
        
        document.getElementById('miller-target-good').onclick = () => this.endTest2('miller');
        
        this.startTimer('timer-2-miller');
    }

    // --- RESULTATS GRAPHIQUES ---
    showResults(law) {
        this.goToStep(law, 'results');
        
        const badTimeSec = parseFloat(this.times[law].bad);
        const goodTimeSec = parseFloat(this.times[law].good);
        
        document.getElementById(`result-time-bad-${law}`).textContent = `${badTimeSec.toFixed(1)} s`;
        document.getElementById(`result-time-good-${law}`).textContent = `${goodTimeSec.toFixed(1)} s`;
        
        const ratio = (badTimeSec / goodTimeSec).toFixed(1);
        const improvement = Math.round(((badTimeSec - goodTimeSec) / badTimeSec) * 100);
        
        setTimeout(() => {
            const barBad = document.getElementById(`bar-bad-${law}`);
            const barGood = document.getElementById(`bar-good-${law}`);
            
            barBad.style.width = '100%';
            const goodWidth = Math.max(10, Math.min(100, (goodTimeSec / badTimeSec) * 100));
            barGood.style.width = `${goodWidth}%`;
        }, 200);

        const summaryText = document.getElementById(`chart-summary-text-${law}`);
        if (goodTimeSec < badTimeSec) {
            summaryText.innerHTML = `🎉 Vous avez été <strong>${ratio} fois</strong> plus rapide (${improvement}% de gain de temps) avec l'interface optimisée !`;
        } else {
            summaryText.innerHTML = `🧐 Vos temps sont similaires, mais l'interface optimisée a considérablement réduit votre fatigue cognitive !`;
        }
    }
}

// Initialisation au chargement de la page
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new UXHubApp();
});
