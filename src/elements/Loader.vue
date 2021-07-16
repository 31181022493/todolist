<template>
  <div class="lds-dual-ring"></div>
</template>
<script>
export default {}
</script>
<style lang="css" scope>
@import '../styles/_colors.scss';
@import '../styles/_font.scss';
.lds-dual-ring {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: auto;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 30px;
  height: 30px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: rgb(0, 0, 0) transparent rgb(0, 0, 0) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
