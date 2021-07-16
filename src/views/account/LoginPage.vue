<template>
  <div>
    <div class="fluid">
      <form class="login" @submit.prevent="submitFormLogin">
        <h1 class="login__title">{{ $t('form.login') }}</h1>
        <div class="login__form">
          <div class="login__form-group">
            <base-input-text v-model="email">
              {{ $t('form.email') }}
            </base-input-text>
            <div v-if="submited">
              <div class="error" v-if="!$v.email.required">
                {{ $t('validate.emailRequire') }}
              </div>
              <div class="error" v-if="!$v.email.email">
                {{ $t('validate.emailAddress') }}
              </div>
            </div>
          </div>

          <div class="login__form-group">
            <base-input-password v-model="password">
              {{ $t('form.password') }}
            </base-input-password>
            <div v-if="submited">
              <div class="error" v-if="!$v.password.required">
                {{ $t('validate.passwordRequire') }}
              </div>
            </div>
          </div>
          <base-button type="submit">
            {{ $t('form.login') }}
          </base-button>
          <loader v-if="loading"></loader>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      submited: false,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  computed: {
    loading: function() {
      return this.$store.state.auth.loading
    },
  },
  methods: {
    ...mapActions('account/login', {
      login: 'loginUser',
    }),
    async submitFormLogin() {
      this.$v.$touch()
      if (this.$v.$invalid) return (this.submited = true)

      const isLoginSuccess = await this.login({
        email: this.email,
        password: this.password,
      })
      if (isLoginSuccess) {
        this.$notify({
          group: 'notification',
          type: 'success',
          title: this.$t('notification.loginTitleSuccess'),
          duration: 3000,
        })
        this.$router.push({ name: 'dashboard' })
      } else {
        this.$notify({
          group: 'notification',
          type: 'error',
          title: this.$t('notification.loginTitleFail'),
          text: this.$store.state.auth.notification,
          duration: 3000,
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.fluid {
  display: flex;
  flex-direction: column;
  height: 91vh;
  justify-content: center;
  align-items: center;
  background: #b993d6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #8ca6db,
    #b993d6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #8ca6db,
    #b993d6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  .login {
    background: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
    &__title {
      display: flex;
      width: 100%;
      margin: 10px auto 30px;
      justify-content: center;
    }
    &__form {
      display: flex;
      flex-direction: column;
      width: 100%;
      &-group {
        display: flex;
        margin-bottom: 20px;
        width: 100%;
      }
      &-button {
        button {
          display: flex;
        }
      }
    }
  }
}
.error {
  color: red;
}
</style>
