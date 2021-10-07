<template>
     <ul>
        <p class="name">Player</p>
        <li v-for="card in playerHand" :key="card">{{ card.name }} - {{ card.value }}</li>
        <p>Total Score: {{playerScore}}</p>
    </ul>
</template>

<script>
import {mapState} from "vuex";

export default {
    props: [
        "playerScore"
    ],

    computed: {
        ...mapState ({
            playerHand: state => state.player.hand,
        })
    }
}
</script>

<style scoped>

</style>