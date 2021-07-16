<template>
  <div>
    <div class="update-profile">
      <div class="update-profile-avatar">
        <input
          type="file"
          accept="image/*"
          class="input_img"
          ref="file"
          @change="changeFiles($event)"
        />
        <div class="avatar">
          <img
            class="avatar__img"
            alt="avatar"
            :src="
              newImage ||
                'https://www.namepros.com/attachments/empty-png.89209/'
            "
          />
          <div class="avatar__btns">
            <base-button class="btn" @click="browse()">
              {{ $t('profile.browse') }}
            </base-button>
            <base-button class="btn" @click="changeAvatar()">
              {{ $t('profile.submitAvatar') }}
            </base-button>
          </div>
        </div>
      </div>
      <div class="update-profile-infor">
        <form class="register" @submit.prevent="updateInforUser">
          <h1 class="register__title">{{ $t('profile.titleInfor') }}</h1>
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
                  {{ $t('validate.nameMaxLetters') }}.
                </div>
              </div>
            </div>

            <div class="register__form-group">
              <base-input-text v-model="email" :disabled="true">
                {{ $t('form.email') }}
              </base-input-text>
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

            <base-button type="submit">
              {{ $t('profile.changeInfor') }}
            </base-button>
          </div>
        </form>
      </div>
    </div>
    <loader class="loading" v-if="loading"></loader>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import {
  required,
  minLength,
  maxLength,
  minValue,
} from 'vuelidate/lib/validators'
export default {
  data: () => ({
    newImage: '',
    file: null,
    name: '',
    email: '',
    age: 0,
    submited: false,
  }),
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(128),
    },
    age: {
      required,
      minValue: minValue(10),
    },
  },
  computed: {
    ...mapState('auth', {
      userInfor: 'user',
      img: 'imgUrl',
      loader: 'loading',
    }),
    loading: function() {
      return this.loader
    },
  },
  methods: {
    ...mapActions('account/profile', {
      avatar: 'uploadAvatar',
      getImage: 'getAvatar',
      updateInfor: 'updateInformation',
    }),
    browse() {
      this.$refs.file.click()
    },
    changeFiles(event) {
      this.file = event.target.files[0]
      const theReader = new FileReader()
      theReader.onload = async () => {
        this.newImage = await theReader.result
      }
      theReader.readAsDataURL(this.file)
    },
    async changeAvatar() {
      const submitAvatar = await this.avatar(this.file)
      if (submitAvatar) {
        this.$notify({
          group: 'foo',
          type: 'success',
          title: this.$t('notification.changeAvatarSuccess'),
          duration: 3000,
        })
        this.$router.push({ name: 'dashboard' })
      } else {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: this.$t('notification.changeAvatarFail'),
          duration: 3000,
        })
      }
    },
    async updateInforUser() {
      this.$v.$touch()
      if (this.$v.$invalid) return (this.submited = true)

      const isSuccess = await this.updateInfor({
        name: this.name,
        age: this.age,
      })
      if (isSuccess) {
        this.$notify({
          group: 'notification',
          type: 'success',
          title: this.$t('notification.updateInformationSuccess'),
          duration: 3000,
        })
        this.$router.push({ name: 'dashboard' })
      } else {
        this.$notify({
          group: 'notification',
          type: 'error',
          title: this.$t('notification.updateInformationFail'),
          duration: 3000,
        })
      }
    },
  },
  async created() {
    this.id = this.userInfor._id
    this.email = this.userInfor.email
    this.name = this.userInfor.name
    this.age = this.userInfor.age
    await this.getImage(this.id)
    this.newImage = await `https://api-nodejs-todolist.herokuapp.com/${this.img}`
  },
}
</script>
<style lang="scss" scope>
@import '@/styles/_mixin.scss';
div {
  display: block;
  .update-profile {
    display: flex;
    flex-direction: row;
    @include mobile {
      display: block;
    }
    margin: 50px auto;
    align-items: center;
    .update-profile-avatar {
      .input_img {
        visibility: hidden;
      }
      .avatar {
        img {
          width: 250px;
          height: 250px;
          margin: auto;
          object-fit: cover;
          display: flex;
          justify-content: center;
          border-radius: 10px;
        }
        &__btns {
          padding: 10px;
          margin: auto;
          justify-content: center;
          .active {
            margin: 5px;
            padding: 10px;
          }
        }
      }
    }
    .update-profile-infor {
      width: 400px;
      .register {
        background: #fff;
        padding: 20px 30px;
        border-radius: 5px;
        box-shadow: 0px 20px 20px 20px rgba(0, 0, 0, 0.1);
        &__title {
          display: flex;
          width: 100%;
          margin: 5px auto 20px;
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
  }
}
</style>
