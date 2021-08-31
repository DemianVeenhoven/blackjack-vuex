import {SUITS} from "@/api/deckBuildArrays"
import {NAMES} from "@/api/deckBuildArrays"
import {VALUES} from "@/api/deckBuildArrays"

export default {
    nameSpaced: true,
    
    state: {
        deck: []
    },

    getters: {

    },

    actions: {
        createDeck({commit}){
            commit('buildDeck')
        },

        start({commit}) {
            for (let i = 0; i < 2; i++) {
                commit("player/drawCard", null, {root: true}),
                commit("dealer/drawCard", null, {root: true})
            }
        }
    },

    mutations: {
        buildDeck(state){
            let cards = [];
            
            for (let i = 0; i < SUITS.length; i++) {
                for (let j = 0; j < NAMES.length; j++) {
                    cards.push({name: [NAMES[j], SUITS[i]].join(" "), value: VALUES[j]});
                }
            }

            state.deck = cards;
        }
    } 
}