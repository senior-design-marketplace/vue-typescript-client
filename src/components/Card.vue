<template>
    <v-card
    min-width="350"
    max-width="350"
    min-height="200"
    class="mx-auto"
    >
        <v-list-item>
            <v-list-item-avatar tile>
                <v-img :src=avatar></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="headline" v-text=title></v-list-item-title>
                <v-list-item-subtitle v-text=advisors.toString()></v-list-item-subtitle>
            </v-list-item-content>
            <v-btn v-if=starred icon>
                <v-icon>mdi-star</v-icon>
            </v-btn >
            <v-btn v-else icon>
                <v-icon>mdi-star-outline</v-icon>
            </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-card-text>
            <div v-if="desc.length < maxChar" v-text="desc"></div>
            <div v-else v-text="desc.substring(0,maxChar)+'...'"></div>
            <v-chip-group column>
                <v-chip label v-for="tag in tags" :key="tag" class="noClick"> {{tag}} </v-chip>
            </v-chip-group>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>Read More</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        id: String,
        title: String,
        avatar: String,
        advisors: Array,
        desc: String,
        starred: Boolean,
        tags: Array,
    },
    data: () => ({
        maxChar: 250,
    }),
  }
</script>

<style>
.noClick {
    pointer-events: none;
}
</style>