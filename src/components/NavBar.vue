<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <router-link class="navbar-brand" :to="{name:'home'}">Novel translation supporter</router-link>
    <button
      class="navbar-toggler ml-auto"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :class="{active:$route.name=='work-space'}"
            :to="{name:'work-space'}"
          >Work Space</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :class="{active:$route.name=='about'}"
            :to="{name:'about'}"
          >About</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
