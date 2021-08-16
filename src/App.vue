<template>
  <div class="container">
    <nav>
      <router-link to="/">TreeView</router-link>
      <router-link to="/admin">CRUD</router-link>
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
  margin: 0;
  padding: 0;
  list-style: none;
}

body {
  background: #edeef0;
}

.container {
  background: white;
  max-width: 400px;
  padding: 0 10px;
  margin: 0 auto;
}

nav {
  padding: 10px;
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
