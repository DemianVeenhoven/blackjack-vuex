import Vuex from "vuex"
import Vue from "vue"
import game from "./modules/game"
import player from "./modules/player"
import dealer from "./modules/dealer"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        game,
        player,
        dealer
    },
    
    state: {

    },

    getters: {
        
    },

    actions: {

    },

    mutations: {
        
    }
})