<template>
    <div>
        <h1>BlackJack</h1>
        
        <h2 v-if="blackJack === true">{{winner}} has BlackJack</h2>
        <h2 v-if="winner != null && winner != 'Draw'">The winner is: {{winner}}</h2>
        <h2 v-if="winner === 'Draw'">Draw</h2>

        <!-- todo: voeg twee componenten toe: player en dealer component. Beide componenten laten eigen hand zien -->

        <ul>
            <p class="name">Player</p>
            <li v-for="card in playerHand" :key="card">{{ card.name }} - {{ card.value }}</li>
            <p>Total Score: {{playerScore}}</p>
        </ul>

            <hr>

        <ul v-if="gameHasEnded === false">
            <p class="name">Dealer</p>
            <li v-for="card in dealerVisibleHand" :key="card">{{ card.name }} - {{ card.value }}</li>
        </ul>

        <ul v-if="gameHasEnded === true">
            <p class="name">Dealer</p>
            <li v-for="card in dealerHand" :key="card">{{ card.name }} - {{ card.value }}</li>
            <p>Total Score: {{dealerScore}}</p>
        </ul>

        <hr>

        <button :disabled="!(playerScore === 0)" @click="start()">Start</button>
        <button :disabled="!(gameHasEnded === false)" @click="drawCardPlayer()">Hit</button> <!-- "hit" -->
        <button :disabled="!(gameHasEnded === false)" @click="pass()">Stand</button>                  <!-- "stand" -->
        <button :disabled="!(gameHasEnded === true)" @click="reset()">Reset</button>
    </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from "vuex";

export default {
    mounted(){
        this.$store.dispatch('game/createDeck');
    },

    computed: {
        ...mapState ({
            playerHand: state => state.player.hand,
            dealerVisibleHand: state => state.dealer.visibleHand,
            dealerHand: state => state.dealer.hand,
            blackJack: state => state.game.blackJack,
        }),

        ...mapGetters ({
            playerScore: "player/score",
            dealerScore: "dealer/score",
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