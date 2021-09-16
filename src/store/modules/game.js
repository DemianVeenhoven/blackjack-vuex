import {SUITS} from "@/api/deckBuildArrays"
import {NAMES} from "@/api/deckBuildArrays"
import {VALUES} from "@/api/deckBuildArrays"

export default {
    namespaced: true,
    
    state: {
        deck: [],
        blackJack: false,
        draw: false
    },

    getters: {
        findWinner(state, getters, rootState, rootGetters) {
            if(state.blackJack === true) {
                if(rootGetters["player/score"] === 21) {
                    return "Player"
                } else {
                    return "Dealer"
                } 
            } else if(rootGetters["player/isDead"] === true) {
                return "Dealer"
            } else if(rootState.dealer.hasPassed === true) {
                if(rootGetters["dealer/isDead"] === true) {
                    return "Player"
                } else if(rootGetters["player/score"] > rootGetters["dealer/score"]) {
                    return "Player"
                } else if(state.draw === false) {
                    return "Dealer"
                }
            } else {
                return null
            }
        },

        gameHasEnded(state, getters, rootState, rootGetters) {
            if (rootGetters["player/score"] === 0){
                return true
            } else if (state.blackJack === true) {
                return true
            } else if (getters.findWinner != null) {
                return true
            } else if (state.draw === true) {
                return true
            } else {
                return false
            }
        }
    },

    actions: {
        createDeck({commit}){
            commit('buildDeck')
        },

        start() {            
            for (let i = 0; i < 2; i++) {
                this.dispatch("player/drawCardPlayer");
                this.dispatch("dealer/drawCardDealer");
            }    
        },

        checkBlackJack({commit, rootGetters}) {
            if(rootGetters["player/score"] === 21 && rootGetters["dealer/score"] === 21) {
                commit("draw");
            } else if (rootGetters["player/score"] === 21 || rootGetters["dealer/score"] === 21) {
                commit("blackJack");
            } 
        },

        checkDraw({commit, rootGetters}) {
            if(rootGetters["player/score"] === rootGetters["dealer/score"]) {
                commit("draw");
            }
        },

        reset({commit}) {
            commit("buildDeck"),
            commit("resetGame"),
            commit("player/resetPlayer", null, {root: true}),
            commit("dealer/resetDealer", null, {root: true})
        }
    },

    mutations: {
        buildDeck(state){
            state.deck = [];
            let cards = [];
            
            for (let i = 0; i < SUITS.length; i++) {
                for (let j = 0; j < NAMES.length; j++) {
                    // todo: rechtstreeks naar deck pushen zonder tussenkomst van cards array
                    cards.push({name: [NAMES[j], SUITS[i]].join(" "), value: VALUES[j]});
                }
            }

            state.deck = cards;
        },

        removeCard(state, randomNumber) {
            state.deck.splice(randomNumber, 1);
        },

        blackJack(state) {
            state.blackJack = true;
        },

        draw(state) {
            state.draw = true;
        },

        resetGame(state) {
            state.blackJack = false;
            state.draw = false;
        }
    } 
}