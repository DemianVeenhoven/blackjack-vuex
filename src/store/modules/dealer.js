export default {
    namespaced: true,

    state: {
        hand: []
    },

    getters: {
        score(state) {
            let cardValues = state.hand.map(card => card.value);

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
        drawCardDealer({commit, state, getters, rootState}) {
            if(state.hand.length < 2) {
                let randomNumber = Math.floor(Math.random() * rootState.game.deck.length);
                let drawnCard = rootState.game.deck[randomNumber];

                commit("game/removeCard", randomNumber, {root:true}),
                commit("drawCard", drawnCard)
            } else {
                while(getters.score < 17) {
                    let randomNumber = Math.floor(Math.random() * rootState.game.deck.length);
                    let drawnCard = rootState.game.deck[randomNumber];
    
                    commit("game/removeCard", randomNumber, {root:true}),
                    commit("drawCard", drawnCard)
                }

                this.dispatch("game/findWinner");
            }
        }
    },

    mutations: {
        drawCard(state, drawnCard) {

            state.hand.push(drawnCard);
        },

        resetDealer(state) {
            state.hand = [];
            state.hasPassed = false;
        }
    }  
}