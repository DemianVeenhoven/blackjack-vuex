export default {
    namespaced: true,

    state: {
        hand: [],
        hasPassed: false
    },

    getters: {
        score(state) {
            let cardValues = state.hand.map(card => card.value);

            // todo: je kunt een default startwaarde van 0 meegeven aan de reduce functie zodat je de if / else niet nodig hebt
            if(cardValues.length > 0) {
                return cardValues.reduce((accumulator, currentScore) => accumulator + currentScore);
            } else {
                return 0;
            }
        },

        isDead(state, getters) {
            let hasAces = state.hand.filter(e => e.value === 11).length > 0;
            
            if(getters.score < 22) {
                return false
            } else if(hasAces === true) {
                while(getters.score > 21) {
                    state.hand.forEach(function(obj) {
                        if (obj.value === 11) {
                            obj.value = 1
                        }
                    })
                }
                return false
            } else {
                return true
            }
        }
    },

    actions: {
        drawCardPlayer({commit, state, rootState}) {
            let randomNumber = Math.floor(Math.random() * rootState.game.deck.length);
            let drawnCard = rootState.game.deck[randomNumber];

            commit("game/removeCard", randomNumber, {root:true}),
            commit("drawCard", drawnCard)
            if(state.hand.length === 2) {
                this.dispatch("game/checkBlackJack");
            }
        },

        passPlayer({commit}) {
            commit("pass")
            this.dispatch("dealer/drawCardDealer");
        }
    },

    mutations: {
        drawCard(state, drawnCard) {

            state.hand.push(drawnCard);
        },

        pass(state) {
            state.hasPassed = true;
        },

        resetPlayer(state) {
            state.hand = [];
            state.hasPassed = false;
        }
    } 
}