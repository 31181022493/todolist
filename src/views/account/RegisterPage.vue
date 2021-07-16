<!--eslint-disable  -->
<template>
  <div class="fluid">
    <form class="register" @submit.prevent="submitFormRegister">
      <h1 class="register__title">{{ $t('form.register') }}</h1>
      <div class="register__form">
        <div class="register__form-group">
          <base-input-text v-model="name">
            {{ $t('form.name') }}
          </base-input-text>
          <div v-if="submited">
            <div class="error" v-if="!$v.name.required">
              {{ $t('validate.nameRequire') }}
            </div>
            <div class="error" v-if="!$v.name.minLength">
              {{ $t('validate.nameMinLetters') }}
            </div>
            <div class="error" v-if="!$v.name.maxLength">
              {{ $t('validate.nameMaxLetters') }}
            </div>
          </div>
        </div>

        <div class="register__form-group">
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

        <div class="register__form-group">
          <base-input-number v-model.number="age">
            {{ $t('form.age') }}
          </base-input-number>
          <div v-if="submited">
            <div class="error" v-if="!$v.age.required">
              {{ $t('validate.ageRequire') }}
            </div>
            <div class="error" v-if="!$v.age.minValue">
              {{ $t('validate.ageMin') }}
            </div>
          </div>
        </div>

        <div class="register__form-group">
          <base-input-password v-model="password.password">
            {{ $t('form.password') }}
          </base-input-password>
          <div v-if="submited">
            <div class="error" v-if="!$v.password.password.required">
              {{ $t('validate.passwordRequire') }}
            </div>
            <div class="error" v-if="!$v.password.password.minLength">
              {{ $t('validate.passwordMinLetters') }}
            </div>
          </div>
        </div>
        <div class="register__form-group">
          <base-input-password v-model="password.confirm">
            {{ $t('form.passwordConfirm') }}
          </base-input-password>
          <div v-if="submited">
            <div class="error" v-if="!$v.password.confirm.sameAs">
              {{ $t('validate.passwordConfirm') }}
            </div>
          </div>
        </div>

        <base-button type="submit">{{ $t('form.register') }}</base-button>
        <loader v-if="loading"></loader>
      </div>
    </form>
  </div>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  sameAs,
  minValue,
  email,
} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      name: '',
      email: '',
      age: 0,
      password: {
        password: '',
        confirm: '',
      },
      submited: false,
    }
  },
  computed: {
    loading: function() {
      return this.$store.state.auth.loading
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(128),
    },
    email: {
      required,
      email,
    },
    age: {
      required,
      minValue: minValue(10),
    },
    password: {
      password: {
        required,
        minLength: minLength(8),
      },
      confirm: {
        sameAs: sameAs('password'),
      },
    },
  },
  methods: {
    ...mapActions('account/register', {
      register: 'registerUser',
    }),
    async submitFormRegister() {
      this.$v.$touch()
      if (this.$v.$invalid) return (this.submited = true)

      const isSuccess = await this.register({
        name: this.name,
        email: this.email,
        age: this.age,
        password: this.password.password,
      })
      if (isSuccess) {
        this.$notify({
          group: 'notification',
          type: 'success',
          title: this.$t('notification.registerTitleSuccess'),
          text: 'Now you can login',
          duration: 3000,
        })
        this.$router.push({ name: 'dashboard' })
      } else {
        this.$notify({
          group: 'notification',
          type: 'error',
          title: this.$t('notification.registerTitleFail'),
          text: this.$store.state.auth.error,
          duration: 3000,
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.fluid {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  height: 100vh;
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
  .register {
    background: #fff;
    width: 27%;
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
        margin-bottom: 15px;
        width: 100%;
      }
    }
  }
}
.error {
  color: red;
}
</style>
