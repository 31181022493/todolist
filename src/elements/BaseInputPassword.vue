<template>
  <div>
    <label class="label"><slot></slot></label>
    <div class="input">
      <input
        :type="passwordType"
        :value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
      <i class="fas fa-eye" v-if="showPassword" @click="switchVisibility"></i>
      <i
        class="fas fa-eye-slash"
        v-if="!showPassword"
        @click="switchVisibility"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
      showPassword: false,
      passwordType: 'password',
    }
  },
  methods: {
    switchVisibility() {
      this.showPassword = !this.showPassword
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
  },
}
</script>
<style lang="scss" scope>
@import '../styles/_colors.scss';
@import '../styles/_font.scss';
div {
  font-family: $font-family-Montserrat;
  display: flex;
  flex-direction: column;
  .label {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 600;
  }
  .input {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    input {
      font-size: 20px;
      height: 40px;
      border: 1px solid lightgrey;
      border-bottom-width: 2px;
      border-radius: 5px;
      outline: none;
      transition: all 0.5s ease;
      width: 100%;
      &:focus {
        border-color: #9443d3;
      }
    }
    .fas {
      position: absolute;
      align-items: center;
      margin: auto;
      font-size: 20px;
      cursor: pointer;
      right: 10px;
      top: 25%;
    }
  }
}
</style>
