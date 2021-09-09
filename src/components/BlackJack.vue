<template>
    <div>
        <h1>BlackJack</h1>
        
        <h2 v-if="BlackJack === true">{{winner}} has BlackJack</h2>
        <h2 v-if="winner != null">The winner is: {{winner}}</h2>
        <h2 v-if="Draw === true">Draw</h2>

        <ul>
            <p class="name">Player</p>
            <li v-for="card in PlayerHand" :key="card">{{ card.name }} - {{ card.value }}</li>
            <p>Total Score: {{playerScore}}</p>
        </ul>

            <hr>

        <ul v-if="gameHasEnded === false">
            <p class="name">Dealer</p>
            <li v-for="card in DealerVisibleHand" :key="card">{{ card.name }} - {{ card.value }}</li>
        </ul>

        <ul v-if="gameHasEnded === true">
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
            DealerVisibleHand: state => state.dealer.visibleHand,
            DealerHand: state => state.dealer.hand,
            BlackJack: state => state.game.blackJack,
            Draw: state => state.game.draw
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