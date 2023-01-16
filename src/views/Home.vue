<template>
  <div class="Vue">
    <img alt="Vue logo" src="@/assets/logo.png">
  </div>
  <div class="local">
    <label>{{ $t('message.Language') }}</label>
    <select v-model="$i18n.locale" @change="updateLang($i18n.locale)">
      <option value="en">English</option>
      <option value="km">Khmer</option>
    </select>
  </div>
</template>
<script setup lang="ts">

const updateLang = (lang: string) => {
  localStorage.setItem("currentLang", lang)
}

</script>
<style>
.local {
  padding: 7px;
  margin-top: -200px;
  width: 90px;
  float: right;
}
</style>
