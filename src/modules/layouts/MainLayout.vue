<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="flex justify-between">
         <q-toolbar-title
          v-show="!['noteView'].includes($route.name)"
          class="text-subtitle2"
        >
          DenguinhosNotes
        </q-toolbar-title>
        <div v-show="['noteView'].includes($route.name)">
          <q-btn
            rounded
            dense
            flat
            size="lg"
            color="red"
            icon="keyboard_arrow_left"
            to="/"
            aria-label="Menu"
          />
        </div>
        <div>
          <q-btn flat dense :label="user.nickname" to="/profile" aria-label="Menu" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer v-if="session" elevated class="bg-white flex flex-center">
      <q-tabs v-model="tab" class="text-blue-grey-8 justify-between" active-color="primary">
        <q-route-tab default name="login" icon="s_home" :to="'/'" />
         <q-route-tab name="calendar" icon="s_today" :to="'/calendar'" />
        <q-route-tab name="register" icon="s_person" :to="'/profile'" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "MainLayout",
  data() {
    return {
      tab: "mails",
      leftDrawerOpen: false,
    };
  },
  computed: {
    ...mapGetters("auth", { session: "GetterHasSession" }),
    ...mapState("auth", ["user"])
  },
};
</script>
