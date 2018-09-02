<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112"
          height="28">
      </a>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="https://bulma.io/" target="_blank">
          Bulma.io
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <router-link to="/login" tag="a" class="button is-info" activeClass="inactive">
                <span class="icon">
                  <i class="fas fa-sign-in-alt"></i>
                </span>
                <span>
                  Login
                </span>
              </router-link>
            </p>
            <p class="control">
              <router-link to="/signup" tag="a" class="button is-primary" activeClass="active">
                <span class="icon">
                  <i class="fas fa-user-plus"></i>
                </span>
                <span>Sign Up</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {

  }

</script>

<style>

</style>
