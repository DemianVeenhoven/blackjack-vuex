export default {
    namespaced: true,

    state: {
        hand: [],
        visibleHand: [],
        hasPassed: false
    },

    getters: {

    },

    actions: {
        deal({commit, rootState}) {
            let randomNumber = Math.floor(Math.random() * rootState.game.deck.length);
            let drawnCard = rootState.game.deck[randomNumber];

            commit("game/removeCard", randomNumber, {root:true});

            return drawnCard;
        },

        async drawCardDealer({commit, state}) {
            let drawnCard = await this.dispatch("dealer/deal");

            commit("drawCard", drawnCard);

            if(state.hand.length === 1) {
                commit("firstCard", drawnCard)
            }

            if(state.hand.length === 2) {
                this.dispatch("game/checkBlackJack");
            }
        },

        async turnDealer({commit, rootGetters}) {
            while(rootGetters["game/dealerScore"] < 17) {
                await this.dispatch("dealer/drawCardDealer");
            }

            commit("pass");
        }
    },

    mutations: {
        drawCard(state, drawnCard) {
            state.hand.push(drawnCard);
        },

        firstCard(state, drawnCard) {
            state.visibleHand.push(drawnCard);
        },

        pass(state) {
            state.hasPassed = true;
        },

        resetDealer(state) {
            state.hand = [];
            state.visibleHand = [];
            state.hasPassed = false;
        }
    }  
}