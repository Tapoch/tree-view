<template>
  <div class="container">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/admin">Crud</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  max-width: 400px;
  margin: 0 auto;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
}

nav a {
  text-align: center;
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.error {
  border: 1px solid red;
}
</style>
