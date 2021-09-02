export default {
    namespaced: true,

    state: {
        hand: [],
        hasPassed: false
    },

    getters: {
        score(state) {
            let cardValues = state.hand.map(card => card.value);

            if(cardValues.length > 0) {
                return cardValues.reduce((accumulator, currentScore) => accumulator + currentScore);
            } else {
                return 0;
            }
        }
    },

    actions: {
        drawCardPlayer({commit, rootState}) {
            let randomNumber = Math.floor(Math.random() * rootState.game.deck.length);
            let drawnCard = rootState.game.deck[randomNumber];

            commit("game/removeCard", randomNumber, {root:true}),
            commit("drawCard", drawnCard)
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