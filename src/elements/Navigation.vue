<template>
  <div>
    <nav class="navbar">
      <div class="navbar__link">
        <router-link :to="{ name: 'todos' }">
          {{ $t('navigation.home') }}
        </router-link>
      </div>
      <ul class="navbar__nav">
        <li class="navbar__nav-items" v-if="!IsLoggedIn">
          <router-link :to="{ name: 'login' }">
            {{ $t('navigation.login') }}
          </router-link>
        </li>
        <li class="navbar__nav-items" v-if="!IsLoggedIn">
          <router-link :to="{ name: 'register' }">
            {{ $t('navigation.register') }}
          </router-link>
        </li>
        <li class="navbar__nav-items" v-if="IsLoggedIn">
          <router-link :to="{ name: 'profile' }">
            {{ $t('navigation.profile') }}
          </router-link>
        </li>
        <li class="navbar__nav-items" v-if="IsLoggedIn">
          <a @click="logoutUser">{{ $t('navigation.logout') }}</a>
        </li>
        <li>
          <select
            v-model="language"
            class="navbar__nav-languages"
            @change="changeLanguage()"
          >
            <option value="en">English</option>
            <option value="vi">Tiếng việt</option>
          </select>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      language: null,
    }
  },
  computed: {
    IsLoggedIn: function() {
      return this.$store.getters['auth/isLoggedIn']
    },
    ...mapState('auth', {
      languages: 'lang',
    }),
  },
  methods: {
    ...mapActions('account/logout', {
      logout: 'logOutUser',
    }),
    ...mapActions('account/languages', {
      changeLang: 'changeLanguage',
    }),
    changeLanguage() {
      this.changeLang({ lang: this.language, i18n: this.$i18n })
    },
    logoutUser() {
      this.$confirm('Are you sure ?')
        .then(async () => {
          await this.logout()
          this.$router.push({ name: 'login' })
        })
        .catch(() => {
          return
        })
    },
  },
}
</script>
<style lang="scss">
@import '../styles/_colors.scss';
@import '../styles/_font.scss';
div {
  .swal2-actions {
    display: flex;
    flex-direction: row;
    .swal2-styled.swal2-confirm {
      color: #fff;
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
    }
  }
  .navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px 0px;
    font-family: $font-family-Montserrat;
    width: 100%;
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
    &__link a {
      text-decoration: none;
      font-size: 30px;
      font-weight: bold;
      color: #330f86;
      margin-bottom: 5px;
    }
    &__nav {
      display: flex;
      list-style-type: none;
      &-items a {
        text-decoration: none;
        padding: 5px 15px;
        font-size: 25px;
        font-weight: 500;
        color: #330f86;
        margin: auto 5px;
        cursor: pointer;
        &:hover {
          background: #7c9ddd;
          border-radius: 5px;
        }
      }
      &-languages {
        font-size: 25px;
        border: none;
        background: none;
        color: #330f86;
        font-weight: 500;
        option {
          font-size: 20px;
          border: none;
        }
      }
    }
  }
}
</style>
