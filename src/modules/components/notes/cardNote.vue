<template>
  <q-card
    clickable
    v-ripple
    class="bg-positive text-white cursor-pointer q-ma-sm q-pa-none q-animate--scale"
  >
    <q-card-section class="row q-ma-none q-pa-sm">
      <div class="col-10 text-h6" @click="viewNote">{{ note.title }}</div>
      <div class="col-2" align="right"><q-btn flat round color="red" icon="delete" @click="deleteNote" /></div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "CardNote",
  props: {
    note: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions("notes", ['ActionDeleteNote']),
    viewNote() {
      this.$router.push({ name: "noteView", params: { id: this.note._id } });
    },
    deleteNote(){
      this.ActionDeleteNote(this.note._id)
    }
  },
};
</script>

<style></style>
