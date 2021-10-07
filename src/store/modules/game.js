import {SUITS} from "@/api/deckBuildArrays"
import {NAMES} from "@/api/deckBuildArrays"
import {VALUES} from "@/api/deckBuildArrays"

export default {
    namespaced: true,
    
    state: {
        deck: [],
        blackJack: false,
    },

    getters: {
        findWinner(state, getters, rootState) {
            if(state.blackJack === true) {
                if(getters.playerScore === 21) {
                    return "Player"
                } else {
                    return "Dealer"
                }
            } else if(getters.playerIsDead === true) {
                return "Dealer"
            } else if(rootState.dealer.hasPassed === true) {
                if(getters.playerIsDead === true) {
                    return "Player"
                } else if(getters.playerScore > getters.dealerScore) {
                    return "Player"
                } else if(getters.playerScore === getters.dealerScore) {
                    return "Draw"
                } else {
                    return "Dealer"
                }
            } else {
                return null
            }
        },

        gameHasEnded(state, getters) {
            if (getters.playerScore === 0){
                return true
            } else if (state.blackJack === true) {
                return true
            } else if (getters.findWinner != null) {
                return true
            } else {
                return false
            }
        },

        score() {
             return function (argument) {
                let score = 0;
                let hasAces = argument.hand.filter(e => e.value === 11).length > 0;
                let cardValues = argument.hand.map(card => card.value);
                
                score = cardValues.reduce((accumulator, currentScore) => accumulator + currentScore, 0);
    
                if(score > 21) {
                    if(hasAces === true) {
                        while(score > 21) {
                            argument.hand.forEach(function(obj) {
                                if (obj.value === 11) {
                                    obj.value = 1
                                }
                            })
    
                            cardValues = argument.hand.map(card => card.value);
                            score = cardValues.reduce((accumulator, currentScore) => accumulator + currentScore, 0);
                        }
                    }
                }
    
                return score
            };       
        },

        playerScore(state, getters, rootState) {
            return getters.score(rootState.player);
        },

        dealerScore(state, getters, rootState) {
            return getters.score(rootState.dealer);
        },

        isDead(state, getters) {
            return function (argument) {
                if(getters.score(argument) > 21) {
                    return true
                } else {
                    return false
                }
            };
        },

        playerIsDead(state, getters, rootState) {
            return getters.isDead(rootState.player)
        },

        dealerIsDead(state, getters, rootState) {
            return getters.isDead(rootState.dealer)
        },
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

        checkBlackJack({commit, getters}) {
            if(getters.playerScore === 21 && getters.dealerScore === 21) {
                commit("draw");
            } else if (getters.playerScore === 21 || getters.dealerScore === 21) {
                commit("blackJack");
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
            
            for (let i = 0; i < SUITS.length; i++) {
                for (let j = 0; j < NAMES.length; j++) {
                    state.deck.push({name: [NAMES[j], SUITS[i]].join(" "), value: VALUES[j]});
                }
            }
        },

        removeCard(state, randomNumber) {
            state.deck.splice(randomNumber, 1);
        },

        blackJack(state) {
            state.blackJack = true;
        },

        resetGame(state) {
            state.blackJack = false;
        }
    } 
}