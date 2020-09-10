<template>
  <div>
    <b-navbar toggleable="lg">
      <b-navbar-brand href="/">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="routes in linksL"
            v-bind:key="routes.id"
            :to="`${routes.page}`"
            class="yellow"
            router-link-active
          >{{routes.text}}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            right
            v-for="routes in linksR"
            v-bind:key="routes.id"
            :to="`${routes.page}`"
            router-link-active
            class="yellow"
          >{{routes.text}}</b-nav-item>
        </b-navbar-nav>
        <b-avatar></b-avatar>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      linksL: [
        {
          id: 0,
          text: "Home",
          page: "/home"
        },
        {
          id: 1,
          text: "News",
          page: "/news"
        },
        {
          id: 2,
          text: "Contact",
          page: "/contact"
        }
      ],

      linksR: [
        {
          id: 0,
          text: "Login",
          page: "/login"
        },
        {
          id: 1,
          text: "Register",
          page: "/register"
        }
      ]
    };
  }
};
</script>

<style>
.navbar {
  background-color: rgb(0, 0, 0);
}

.img {
  width: 100px;
  margin: 10px 50px 10px 10px;
  background-color: black;
}

a.nav-link {
  font-family: "Lekton";
  font-weight: bold;
  font-size: large;
  color: white !important;
  padding: 0px 2px !important;
}
.nav-item {
  margin-right: 40px;
  margin-top: 10px;
}
.nav-item:hover {
  background: linear-gradient(0deg, #ffe300 50%, #fff0 50%);
}
.router-link-active {
  background: linear-gradient(0deg, #ffe300 50%, #fff0 50%);
}
</style>