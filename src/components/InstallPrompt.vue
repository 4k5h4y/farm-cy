<template>
  <div class="install-prompt" v-if="deferredPrompt">
    <div class="install-prompt__content">
      Install our free app on your device?
    </div>
    <div class="install-prompt__actions">
      <button
        class="install-prompt__button install-prompt__button--confirm"
        @click="install"
      >
        Install
      </button>
      <button
        class="install-prompt__button install-prompt__button--cancel"
        @click="dismiss"
      >
        Cancel
      </button>
    </div>
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
<style scoped>
.install-prompt {
  position: fixed;
  bottom: 0px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 30px;
  width: 90%;
  max-width: 700px;
  color: white;
  background-color: #2c3e50;
  text-align: left;
}
.install-prompt__actions {
  display: flex;
  margin-top: 8px;
}
.install-prompt__button {
  margin-right: 8px;
}
.install-prompt__button--confirm {
  margin-left: auto;
}
.install-prompt__button--cancel {
  background-color: #f64f59;
}
</style>