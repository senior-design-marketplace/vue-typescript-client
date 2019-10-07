<template :id="id">
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
            <v-btn icon>
                <v-icon v-on:click="toggle(id, starred)" v-bind:color="starred ? 'yellow accent-4' : 'gray'">mdi-star</v-icon>
            </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-img
            :src=img
            height="194"
        ></v-img>
        <v-divider></v-divider>
        <v-card-text>
            <div v-if="desc.length < maxChar" v-text="desc"></div>
            <div v-else v-text="desc.substring(0,maxChar)+'...'"></div>
            <v-chip-group column>
                <v-chip label v-for="tag in tags" :key="tag" class="noClick"> {{tag}} </v-chip>
            </v-chip-group>
        </v-card-text>
        <v-card-actions>
            <Project
                v-bind:title=title
            ></Project>
        </v-card-actions>
    </v-card>
</template>

<script>
import Project from '../components/Project.vue';

export default {
    components: {
        Project,
    },
    props: {
        id: String,
        title: String,
        avatar: String,
        img: String,
        advisors: Array,
        desc: String,
        starred: Boolean,
        tags: Array,
    },
    data: () => ({
        maxChar: 250,
    }),
    methods: {
        toggle(id, starred) {
            console.log(starred)
            starred = !starred
            console.log(starred)
            //backend code here to update starred given id
        }
    },
  }
</script>

<style>
.noClick {
    pointer-events: none;
}
</style>