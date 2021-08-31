<template>
    <div>
        <h1>Deck</h1>
        <ul>
            <li v-for="card in PlayerHand" :key="card">{{ card.name }} - {{ card.value }}</li>
            <hr>
            <li v-for="card in DealerHand" :key="card">{{ card.name }} - {{ card.value }}</li>
        </ul>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    mounted(){
        this.$store.dispatch('createDeck'),
        this.$store.dispatch('start')
    },

    computed: {
        ...mapState ({
            PlayerHand : state => state.player.hand,
            DealerHand : state => state.dealer.hand
        })
    }
}
</script>

<style scoped>

</style>