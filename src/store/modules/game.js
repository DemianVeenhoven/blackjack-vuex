import {SUITS} from "@/api/deckBuildArrays"
import {NAMES} from "@/api/deckBuildArrays"
import {VALUES} from "@/api/deckBuildArrays"

export default {
    namespaced: true,
    
    state: {
        deck: []
    },

    getters: {

    },

    actions: {
        createDeck({commit}){
            commit('buildDeck')
        },

        start() {            
            for (let i = 0; i < 2; i++) {
                this.dispatch("player/drawCardPlayer")
                this.dispatch("dealer/drawCardDealer")
            }
        },

        reset({commit}) {
            commit("buildDeck"),
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
        }
    } 
}