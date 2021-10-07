<template>
    <div>
        <ul v-if="gameHasEnded === false">
            <p class="name">Dealer</p>
            <li v-for="card in dealerVisibleHand" :key="card">{{ card.name }} - {{ card.value }}</li>
        </ul>

        <ul v-if="gameHasEnded === true">
            <p class="name">Dealer</p>
            <li v-for="card in dealerHand" :key="card">{{ card.name }} - {{ card.value }}</li>
            <p>Total Score: {{dealerScore}}</p>
        </ul>
    </div>
</template>

<script>
import { mapState, mapGetters} from "vuex";

export default {
    props: [
        "gameHasEnded"
    ],

    computed: {
        ...mapState ({
            dealerVisibleHand: state => state.dealer.visibleHand,
            dealerHand: state => state.dealer.hand
        }),

        ...mapGetters ({
            dealerScore: "game/dealerScore"
        })
    }
}
</script>

<style scoped>

</style>