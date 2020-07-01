<template>
    <div id="app">
        <in-container>
            <router-view />
        </in-container>
    </div>
</template>

<script>
  import InContainer from '@/InContainer';

  export default {
    components: {InContainer},
  };
</script>
