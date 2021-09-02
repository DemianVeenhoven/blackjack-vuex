export default {
    namespaced: true,

    state: {
        hand: [],
        score: 0
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
        drawCardDealer({commit, rootState}) {
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

        resetDealer(state) {
            state.hand = [];
            state.score = 0;
        }
    }  
}