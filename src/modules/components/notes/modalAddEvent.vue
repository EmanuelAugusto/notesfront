<template>
  <q-dialog :value="modalDateEvent.modal" @before-hide="hide">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Informações do evento</div>
      </q-card-section>

      <q-card-section class="q-pt-none row">
        <div v-if="modalDateEvent.data" class="col-12 text-subtitle2">
          Data: {{ modalDateEvent.data.replace() }}
        </div>
        <q-input
          dense
          class="col-12"
          v-model="formNewEvent.eventName"
          autofocus
          outlined
          label="Nome do evento"
        />
        <q-input
          dense
          type="textarea"
          class="col-12 q-mt-sm"
          v-model="formNewEvent.eventDescription"
          outlined
          label="Descrição do evento"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn flat label="Adicionar" @click="create"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AddEvent",
  data() {
    return {
      formNewEvent: {
        eventDate: "",
        eventName: "",
        eventDescription: "",
      },
    };
  },
  computed: {
    ...mapState("notes", ["modalDateEvent"]),
  },
  methods: {
    ...mapActions("notes", ["ActionSetStateModal", "ActionCreateEvent"]),
    create(){
        this.formNewEvent.eventDate = this.modalDateEvent.data
        this.ActionCreateEvent(this.formNewEvent)
    },
    hide() {
        this.formNewEvent = {
        eventDate: "",
        eventName: "",
        eventDescription: "",
      },
      this.ActionSetStateModal({ modal: false, data: null });
    },
  },
};
</script>

<style>
</style>