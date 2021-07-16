<template>
  <div>
    <button
      type="submit"
      :disabled="disable"
      :class="btn"
      @click="$emit('click', $event)"
    >
      <slot></slot>
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btn: {
        active: true,
        'text-danger': true,
      },
    }
  },
  computed: {
    disable: function() {
      return this.$store.state.auth.loading
    },
  },
}
</script>
<style lang="scss" scope>
@import '../styles/_colors.scss';
@import '../styles/_font.scss';
.active {
  font-family: $font-family-Montserrat;
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

  font-size: 20px;
  font-weight: 600;
  border: none;
  padding-left: 0px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  height: 50px;
}
.active:hover {
  background: #b993d6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #6a8cd1,
    #ab79d1
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #6a8cd1,
    #ab79d1
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
