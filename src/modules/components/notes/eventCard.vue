<template>
  <q-card dark bordered class="bg-light my-card q-mt-sm">
    <q-card-section>
      <div class="text-h6">{{event.eventName}}</div>
      <div class="text-subtitle2">{{event.eventDate}}</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      {{ event.eventDescription }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
    name: "EventCard",
    props: {
        event: {
            type: Object,
             default: () => ({}),
        }
    }
};
</script>

<style>
</style>