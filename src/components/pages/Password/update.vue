<template>
  <app-password-form
    :loading="loading"
    heading-text="パスワードの更新"
    :button-text="buttonText"
    :error-message="errorMessage"
    :done-message="doneMessage"
    @handle-submit="setPassword"
  />
</template>

<script>
import { PasswordForm } from '@Components/molecules';

export default {
  components: { appPasswordForm: PasswordForm },
  computed: {
    loading() {
      return this.$store.state.auth.loading;
    },
    buttonText() {
      return this.loading ? '更新中です...' : '更新';
    },
    errorMessage() {
      return this.$store.state.auth.errorMessage;
    },
    doneMessage() {
      return this.$store.state.auth.doneMessage;
    },
  },
  methods: {
    setPassword(data) {
      if (this.loading) return;
      this.$store.dispatch('auth/changePassword', data).then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>
