<template>
  <div class="error">
    <h3 class="error__title">Error</h3>
    <p class="error__message">
      <slot></slot>
    </p>
  </div>
</template>

<style>
.error {
  width: 100%;
  height: 100%;
  background-color: #e1b0b2;
}

.error__title {
  font-size: 2rem;
  color: red;
}
</style>
