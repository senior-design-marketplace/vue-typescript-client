<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card
            max-width="350"
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
                    <v-icon v-if=starred>mdi-star</v-icon>
                    <v-icon v-else>mdi-star-outline</v-icon>
                </v-list-item>
                <v-divider></v-divider>
                <v-card-text>
                    <div v-if="desc.length < maxChar" v-text="desc"></div>
                    <div v-else v-text="desc.substring(0,maxChar)+'...'"></div>
                    <v-chip v-for="(tag, i) in tags" :key="i"> {{tag}} </v-chip>
                </v-card-text>
                <v-fade-transition>
                    <v-overlay
                    v-if="hover"
                    absolute
                    color="#000000"
                    >
                        <v-btn>See more info</v-btn>
                    </v-overlay>
                </v-fade-transition>
            </v-card>
        </template>
    </v-hover>
</template>

<script>
export default {
    props: {
        title: String,
        avatar: String,
        advisors: Array,
        desc: String,
        starred: Boolean,
        tags: Array,
    },
    data: () => ({
        maxChar: 250,
        overlay: false,
    }),
  }
</script>

<style>
</style>