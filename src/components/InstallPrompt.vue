<template>
  <div class="install-prompt">
    <md-dialog-confirm
      :md-active.sync="deferredPrompt"
      :md-click-outside-to-close="false"
      md-title="Install this app?"
      md-content="<strong>Pharm-cy</strong> works best when installed on your device."
      md-confirm-text="Install"
      md-cancel-text="Dismiss"
      @md-cancel="dismiss"
      @md-confirm="install"
    />
  </div>
</template>
<script>
export default {
  name: "InstallPrompt",
  data() {
    return {
      deferredPrompt: null,
    };
  },
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },
  methods: {
    async dismiss() {
      this.deferredPrompt = null;
    },
    async install() {
      this.deferredPrompt.prompt();
    },
  },
};
</script>