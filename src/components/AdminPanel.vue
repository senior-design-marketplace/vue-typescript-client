<template>
  <div class="text-center">
    <v-bottom-sheet v-model="show" max-width="1185">
      <v-sheet :height="windowHeight">
        <v-row no-gutters :style="`height:${windowHeight}px`">
          <v-col class="secondary" cols="12" sm="3">
            <v-list dark class="secondary">
              <v-list-item-group v-model="view" mandatory>
                <v-list-item value="general">
                  <v-list-item-title>
                    General
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
            <v-container v-if="view === 'general'" class="mt-9">
              <p>
                Click to toggle whether the project is accepting applications:
                <v-tooltip top max-width="175">
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="toggleAcceptingApps()">
                      <v-icon
                        v-if="!editAcceptingApps"
                        v-bind:color="acceptingApps ? 'success' : 'error'"
                      >
                        {{
                          acceptingApps ? "mdi-sticker-check-outline" : "mdi-sticker-remove-outline"
                        }}
                      </v-icon>
                      <v-progress-circular v-else color="primary" indeterminate />
                    </v-btn>
                  </template>
                  <span v-if="acceptingApps">This project is accepting applications.</span>
                  <span v-else>This project is not accepting applications.</span>
                </v-tooltip>
              </p>
              <p>
                Delete Project:
                <v-btn icon @click="deleteDialog = true">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
                <BigDecision
                  v-model="deleteDialog"
                  title="Delete Project"
                  :body="
                    `Are you sure you want to delete ${title}? This permanent and irreversible.`
                  "
                  :stringToType="title"
                  @confirm="deleteProject"
                />
              </p>
            </v-container>
            <v-container v-else-if="view === 'members'" class="mt-9">
              <ContactInfo
                v-bind:contributors="contributors"
                v-bind:administrators="administrators"
              />
            </v-container>
            <v-container v-else-if="view === 'history'" class="mt-9">
              <v-card class="overflow-y-auto" flat :max-height="windowHeight * 0.75">
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
import apiCall from '@/apiCall';
import AuditLog from '@/components/AuditLog.vue';
import BigDecision from '@/components/BigDecision.vue';
import ContactInfo from '@/components/ContactInfo.vue';

export default {
  components: {
    AuditLog,
    BigDecision,
    ContactInfo,
  },
  props: {
    title: String,
    value: Boolean,
    history: Array,
    acceptingApps: Boolean,
    contributors: Array,
    administrators: Array,
  },
  data() {
    return {
      view: 'general',
      editAcceptingApps: false,
      deleteDialog: false,
    };
  },
  methods: {
    async toggleAcceptingApps() {
      this.editAcceptingApps = true;
      const response = await apiCall.methods.patch(
        `/projects/${this.$route.params.id}`,
        '',
        {
          acceptingApplications: !this.acceptingApps,
        },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.acceptingApps = !this.acceptingApps;
      }
      this.editAcceptingApps = false;
    },
    async deleteProject() {
      const response = await apiCall.methods.delete(
        `/projects/${this.$route.params.id}`,
        '',
        {},
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.$router.push('/');
      }
    },
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
