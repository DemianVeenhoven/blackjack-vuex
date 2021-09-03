<template>
    <div>
        <h1>BlackJack</h1>
        <p>{{gameHasEnded}}</p>
        <h2 v-if="BlackJack === true">{{Winner}} has BlackJack</h2>
        <h2 v-if="Winner != ''">The winner is: {{Winner}}</h2>
        <h2 v-if="Draw === true">Draw</h2>

        <ul>
            <p class="name">Player</p>
            <li v-for="card in PlayerHand" :key="card">{{ card.name }} - {{ card.value }}</li>
            <p>Total Score: {{playerScore}}</p>

            <hr>

            <p class="name">Dealer</p>
            <li v-for="card in DealerHand" :key="card">{{ card.name }} - {{ card.value }}</li>
            <p>Total Score: {{dealerScore}}</p>
        </ul>

        <hr>

        <button :disabled="!(playerScore === 0)" @click="start()">Start</button>
        <button :disabled="!(gameHasEnded === false)" @click="drawCardPlayer()">Draw a card</button>
        <button :disabled="!(gameHasEnded === false)" @click="pass()">Pass</button>
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
            PlayerHand: state => state.player.hand,
            PlayerHasPassed: state => state.player.hasPassed,
            DealerHand: state => state.dealer.hand,
            BlackJack: state => state.game.blackJack,
            Winner: state => state.game.winner,
            Draw: state => state.game.draw
        }),

        ...mapGetters ({
            playerScore: "player/score",
            dealerScore: "dealer/score",
            playerIsDead: "player/isDead",
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