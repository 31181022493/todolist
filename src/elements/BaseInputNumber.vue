<template>
  <div>
    <label class="label"><slot></slot></label>
    <input
      type="text"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  props: ['value'],
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
  input {
    font-size: 20px;
    height: 40px;
    border: 1px solid lightgrey;
    border-bottom-width: 2px;
    border-radius: 5px;
    outline: none;
    transition: all 0.5s ease;
    &:focus {
      border-color: #9443d3;
    }
  }
}
</style>
