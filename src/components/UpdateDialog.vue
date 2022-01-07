<template>
  <div class="update-dialog">
    <md-dialog-confirm
      :md-active.sync="prompt"
      :md-click-outside-to-close="false"
      md-title="Update found!"
      md-content="A new version is found. Refresh to load it?"
      md-confirm-text="Update"
      md-cancel-text="Cancel"
      @md-cancel="prompt = false"
      @md-confirm="update"
    />
  </div>
</template>
<script>
export default {
  name: "UpdateDialog",
  data() {
    return {
      prompt: false,
    };
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
    }
  },
  methods: {
    async update() {
      this.prompt = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
  },
};
</script>