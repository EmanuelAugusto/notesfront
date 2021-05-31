<template>
  <div>
    <div v-if="!loadingNotes" class="q-ma-sm">
      <q-input
        v-model="formEditor.title"
        bg-color="white"
        label="Título"
        outlined
        class="q-mb-sm"
        dense
      ></q-input>
      <q-editor
        v-model="formEditor.noteHtml"
         :dense="$q.screen.lt.md"
        :toolbar="[
          [
            {
              label: 'Alinhamento',
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify'],
            },
          ],
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'custom_btn'],
          [
            {
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
            },
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7',
              ],
            },
            {
              label: $q.lang.editor.defaultFont,
              icon: $q.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana',
              ],
            },
            'removeFormat',
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

          ['undo', 'redo'],
          ['viewsource'],
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana',
        }"
        content-class="bg-amber-3"
        min-height="18rem"
      />

      <q-btn
        label="Salvar"
        color="red"
        class="q-mt-sm"
        @click="saveNote"
      ></q-btn>
    </div>
    <div v-else class="flex flex-center">
      <Loading />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Loading from "../helpers/loading";
export default {
  name: "NoteForm",
  components: {
    Loading,
  },
  data() {
    return {
      formEditor: {
        _id: null,
        title: "",
        noteHtml: "",
      },
    };
  },
  computed: {
    ...mapState("notes", ["loadingNotes"]),
  },
  mounted() {
    if (this.$route.params.id !== "new") {
      this.ActionGetNoteById(this.$route.params.id).then((note) => {
        this.formEditor.noteHtml = note.noteHtml;
        this.formEditor._id = note._id;
        this.formEditor.title = note.title;
        this.ActionSetStateLoadingNotes(false);
      });
    } else {
      this.ActionSetStateLoadingNotes(false);
    }
  },
  beforeDestroy() {
    this.ActionSetStateLoadingNotes(true);
  },
  methods: {
    ...mapActions("notes", [
      "ActionGetNoteById",
      "ActionSetStateLoadingNotes",
      "ActionCreateNote",
      "ActionUpdateNote",
    ]),
    saveNote() {
      if (this.$route.params.id === "new") {
        this.ActionCreateNote(this.formEditor);
      } else {
        this.ActionUpdateNote(this.formEditor);
      }
    },
  },
};
</script>