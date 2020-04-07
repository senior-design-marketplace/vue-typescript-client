<template>
  <div class="text-center">
    <v-bottom-sheet v-model="show" max-width="1185">
      <v-sheet :height="windowHeight">
        <v-row no-gutters :style="`height:${windowHeight}px`">
          <v-col class="secondary" cols="12" sm="3">
            <v-list dark class="secondary">
              <v-list-item-group v-model="view" mandatory>
                <v-list-item value="main">
                  <v-list-item-title>
                    Main
                  </v-list-item-title>
                </v-list-item>
                <v-list-item value="members">
                  <v-list-item-title>
                    Member Management
                  </v-list-item-title>
                </v-list-item>
                <v-list-item value="history">
                  <v-list-item-title>
                    History
                  </v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="12" sm="9">
            <v-btn class="ma-3" style="float: right;" icon @click="show = !show">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-container v-if="view === 'main'">
              Main
            </v-container>
            <v-container v-else-if="view === 'members'">
              Member Management
            </v-container>
            <v-container v-else-if="view === 'history'" class="mt-9 ">
              <v-card class="overflow-y-auto" flat :max-height="windowHeight*0.75">
                <AuditLog v-bind:history="history" />
              </v-card>
            </v-container>
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import AuditLog from '@/components/AuditLog.vue';

export default {
  components: {
    AuditLog,
  },
  props: {
    value: Boolean,
    history: Array,
  },
  data() {
    return {
      view: 'main',
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    windowHeight() {
      return document.documentElement.scrollHeight;
    },
  },
};
</script>
