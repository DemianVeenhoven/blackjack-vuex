<template>
    <div>
        <h1>BlackJack</h1>
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
        <button :disabled="playerScore != 0" @click="start()">Start</button>
        <button :disabled="playerScore < 1  || playerScore > 21" @click="drawCardPlayer()">Draw a card</button>
        <!-- <button :disabled="PlayerScore > 0 && PlayerScore < 22" @click="pass()">Pass</button> -->
        <button :disabled="playerScore < 22" @click="reset()">Reset</button>
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
            DealerHand: state => state.dealer.hand
        }),

        ...mapGetters ({
            playerScore: "player/score",
            dealerScore: "dealer/score"
        })
    },

    methods: {
        ...mapActions ({
            start: "game/start",
            drawCardPlayer: "player/drawCardPlayer",
            drawCardDealer: "dealer/drawCardDealer",
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