<template>
  <v-container>
    <v-sheet>
      <h2>My Applications</h2>
    </v-sheet>
    <v-data-table
      :headers="headers"
      :items="applications"
      item-key="id"
      disable-pagination
      class="elevation-1"
      single-expand
      hide-default-footer
    >
      <template v-slot:item="{ item }">
        <tr style="cursor:pointer;" >
          <td
          @click=$router.push(/project/+item.projectId)
          :style="highlight&&appId===item.id?border(true, false, false, true):''">
            <v-avatar size="36" color="primary">
              <v-img v-if="item.thumbnailLink !== undefined" :src="item.thumbnailLink" />
              <span v-else class="white--text headline">
                {{ item.projectId.substring(0, 1).toLowerCase() }}
              </span>
            </v-avatar>
          </td>
          <td
          @click=$router.push(/project/+item.projectId)
          :style="highlight&&appId===item.id?border(true, false, false, false):''"
          >
            {{ item.projectId }}
          </td>
          <td
          @click=$router.push(/project/+item.projectId)
          :style="highlight&&appId===item.id?border(true, false, false, false):''"
          >
            <v-chip
            label
            :color="item.status==='PENDING'?'warning'
            :item.status==='ACCEPTED'?'success':'error'"
            style="cursor:pointer;"
            >
              {{ item.status }}
            </v-chip>
          </td>
          <td
          @click=$router.push(/project/+item.projectId)
          :style="highlight&&appId===item.id?border(true, false, false, false):''"
          >
            {{ calendarTime(item.createdAt) }}
          </td>
          <td
          v-if="item.note !== null"
          :style="highlight&&appId===item.id?border(true, false, false, false):''"
          >
            <v-btn icon @click="toggleEditNote(false, ''); toggleExpanded(item.id)">
              <v-icon> mdi-chevron-down </v-icon>
            </v-btn>
          </td>
          <td
          v-else
          :style="highlight&&appId===item.id?border(true, false, false, false):''"
          >
            <v-tooltip top max-width="175">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon @click="toggleEditNote(false, ''); toggleExpanded(item.id)">
                  <v-icon>mdi-format-page-break</v-icon>
                </v-btn>
              </template>
              <span>You did not include a note on this application.</span>
            </v-tooltip>
          </td>
          <td :style="highlight&&appId===item.id?border(true, false, true, false):''">
            <v-btn @click="deleteApp=item.id" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-dialog v-if="item.id === deleteApp" v-model="deleteApp" max-width="500px">
              <v-card>
                <v-card-title class="break-word">
                  Delete Application to {{item.projectId}}?<br />
                  {{calendarTime(item.createdAt)}}
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-container class="text-left">
                      Note:<br />{{item.note}}
                    </v-container>
                  </v-container>
                  <v-btn @click="deleteApplication(item.id, item.projectId)">
                    <h2>Delete</h2>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>
          </td>
        </tr>

        <td
        v-if="expanded === item.id"
        :colspan="headers.length"
        class="elevation-1"
        :style="highlight&&appId===item.id?border(false, true, true, true):''">
          <v-container class="text-left" style="overflow-wrap: break-word;">
            <h4>
              Your Note:
              <v-btn v-if="!editNote" icon @click="toggleEditNote(true, item.note)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                v-if="editNote"
                icon
                @click="editApplication(item.id, item.projectId)"
                :disabled="newNoteInvalid"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
              <v-btn v-if="editNote" icon @click="toggleEditNote(false, '')">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </h4>
            <v-container v-if="!editNote" style="white-space: pre-line;">
              {{ item.note }}
            </v-container>
            <v-textarea
              v-else
              class="mx-1"
              rows="3"
              counter="256"
              no-resize
              outlined
              :placeholder="item.note"
              v-model="newNote"
              :rules="[rules.length(256)]"
            />
          </v-container>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import moment from 'moment';
import apiCall from '@/apiCall';

export default {
  props: {
    applications: Array,
  },
  data() {
    return {
      expanded: null,
      editNote: false,
      deleteApp: null,
      newNote: null,
      highlight: false,
      headers: [
        {
          text: ' ',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Project',
          align: 'center',
          value: 'name',
          sortable: false,
        },
        {
          text: 'Status',
          align: 'center',
          value: 'status',
          sortable: false,
        },
        {
          text: 'Created',
          align: 'center',
          value: 'createdAt',
          sortable: false,
        },
        {
          text: 'Note',
          align: 'center',
          width: '50px',
          sortable: false,
        },
        {
          text: 'Delete',
          align: 'center',
          width: '50px',
          sortable: false,
        },
      ],
      rules: {
        length: len => v => v === null || v.length <= len || `Invalid character length, must be less than ${len}`,
      },
    };
  },
  methods: {
    calendarTime(dateInput) {
      return moment(dateInput).calendar();
    },
    toggleEditNote(bool, note) {
      this.newNote = note;
      this.editNote = bool;
    },
    toggleExpanded(id) {
      if (this.expanded === id) this.expanded = null;
      else this.expanded = id;
    },
    border(top, bottom, right, left) {
      const border = '2mm solid #03A9F5';
      let out = '';
      out += top ? `border-top: ${border};` : '';
      out += bottom ? `border-bottom: ${border};` : '';
      out += right ? `border-right: ${border};` : '';
      out += left ? `border-left: ${border};` : '';
      return out;
    },
    highlightApp() {
      if (this.appId !== undefined) {
        this.expanded = this.appId;
        this.highlight = true;
        setTimeout(() => {
          this.highlight = false;
        }, 1000);
      }
    },
    async deleteApplication(applicationId, projectId) {
      apiCall.methods.delete(
        `/projects/${projectId}/applications/${applicationId}`,
        '',
        {},
        this.$route.fullPath,
      ).then((response) => {
        if (response.status === 200) {
          const index = this.$store.state.applications.map(app => app.id).indexOf(applicationId);
          this.$store.state.applications.splice(index, 1);
          this.deleteApp = null;
        }
      });
    },
    async editApplication(applicationId, projectId) {
      this.loading = true;
      await apiCall.methods
        .patch(
          `/projects/${projectId}/applications/${applicationId}`,
          '',
          this.newNote === null || this.newNote.length === 0
            ? { note: ' ' }
            : { note: this.newNote },
          this.$route.fullPath,
        )
        .then((response) => {
          if (response.status === 200) {
            const index = this.$store.state.applications.map(app => app.id).indexOf(applicationId);
            this.$store.state.applications[index].note = this.newNote;
            toggleEditNote(false, '');
          }
        });
    },
  },
  watch: {
    appId() {
      this.highlightApp();
    },
  },
  mounted() {
    this.highlightApp();
  },
  computed: {
    newNoteInvalid() {
      if (this.newNote === null) return false;
      return this.newNote.length > 256;
    },
    appId() {
      return this.$route.params.id;
    },
  },
};
</script>
