export default {
    namespaced: true,

    state: {
        hand: []
    },

    getters: {

    },

    actions: {

    },

    mutations: {
        drawCard(state, rootState) {
            let drawnCard = rootState["game/deck"][Math.random()];
            
            state.hand.push(drawnCard);
        }
    } 
}