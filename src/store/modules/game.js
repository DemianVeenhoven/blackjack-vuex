import {SUITS} from "@/api/deckBuildArrays"
import {NAMES} from "@/api/deckBuildArrays"
import {VALUES} from "@/api/deckBuildArrays"

export default {
    namespaced: true,
    
    state: {
        deck: [],
        blackJack: false,
        winner: "",
        draw: false
    },

    getters: {
        gameHasEnded({rootGetters}, state) {
            if (state.blackJack === true) {
                return true
            } else if (state.winner != "" && rootGetters["player.score"] > 0) {
                return true
            } else if (state.draw === true) {
                return true
            } else if (rootGetters["player/score"] > 21) {
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

            this.dispatch("checkBlackJack");    
        },

        checkBlackJack({commit, rootGetters}) {
            if(rootGetters["player/score"] === 21 && rootGetters["dealer/score"] === 21) {
                commit("draw");
            } else if (rootGetters["player/score"] === 21) {
                commit("blackJack");
                commit("winner", "Player");
            } else if(rootGetters["dealer/score"] === 21) {
                commit("blackJack");
                commit("winner", "Dealer");
            }
        },

        findWinner({commit, rootGetters}) {
            console.log(rootGetters);
            if(rootGetters["dealer/isDead"] === true) {
                commit("winner", "Player");
            } else if(rootGetters["player/score"] > rootGetters["dealer/score"]) {
                commit("winner", "player");
            } else if(rootGetters["player/score"] === rootGetters["dealer/score"]) {
                commit("draw");
            } else {
                commit("winner", "dealer");
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

        winner(state, winnerName) {
            state.winner = winnerName;
        },

        draw(state) {
            state.draw = true;
        },

        resetGame(state) {
            state.winner = "";
            state.blackJack = false;
            state.draw = false;
        }
    } 
}