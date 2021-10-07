<template>
    <div>
        <h1>BlackJack</h1>
        
        <h2 v-if="blackJack === true">{{winner}} has BlackJack</h2>
        <h2 v-if="winner != null && winner != 'Draw'">The winner is: {{winner}}</h2>
        <h2 v-if="winner === 'Draw'">Draw</h2>

        <Player :playerScore="playerScore"/>

        <hr>

        <Dealer :gameHasEnded="gameHasEnded"/>

        <hr>

        <button :disabled="!(playerScore === 0)" @click="start()">Start</button>
        <button :disabled="!(gameHasEnded === false)" @click="drawCardPlayer()">Hit</button>
        <button :disabled="!(gameHasEnded === false)" @click="pass()">Stand</button>
        <button :disabled="!(gameHasEnded === true)" @click="reset()">Reset</button>
    </div>
</template>

<script>
import Player from './Player.vue';
import Dealer from './Dealer.vue';
import {mapActions, mapState, mapGetters} from "vuex";

export default {
    components: {
        Player,
        Dealer
    },

    mounted(){
        this.$store.dispatch('game/createDeck');
    },

    computed: {
        ...mapState ({
            blackJack: state => state.game.blackJack,
        }),

        ...mapGetters ({
            playerScore: "game/playerScore",
            winner: "game/findWinner",
            gameHasEnded: "game/gameHasEnded"
        })
    },

    methods: {
        ...mapActions ({
            start: "game/start",
            drawCardPlayer: "player/drawCardPlayer",
            pass: "player/passPlayer",
            reset: "game/reset"
        })
    }
}
</script>

<style scoped>
    p.name {
        font-weight: bold;
    }
</style>