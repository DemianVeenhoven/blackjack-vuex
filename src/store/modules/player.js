export default {
    namespaced: true,

    state: {
        hand: [],
        hasPassed: false
    },

    getters: {

    },

    actions: {
        async drawCardPlayer({commit, state}) {
            let drawnCard = await this.dispatch("dealer/deal");

            commit("drawCard", drawnCard);
            
            if(state.hand.length === 2) {
                this.dispatch("game/checkBlackJack");
            }
        },

        passPlayer({commit}) {
            commit("pass")
            this.dispatch("dealer/turnDealer");
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