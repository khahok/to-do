<template>
  <nav>
    <router-link :to="{ name: 'home' }">{{ $t('message.Home') }}</router-link>
    <router-link :to="{ name: 'userlist' }">{{ $t('message.Userlist') }}</router-link>
    <router-link :to="{ name: 'user' }">{{ $t('message.User') }}</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-color: #2c3e50; */
}

nav {
  padding: 32px;
  background: #718fbb;
}

nav a {
  font-weight: bold;
  color: #cec54d;
  float: left;
  text-decoration: none;
  font-size: 18px;
  width: 150px;
  margin: -10px;
}

/* nav a.router-link-exact-active {

} */
</style>
