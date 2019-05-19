Vue.component('my-component', {
    props: ['msg'],
    template: '<h1>{{ msg }}</h1>'
  })


new Vue({
    el: '#app'
  });

new Vue({
    el: '#blush',
    data() {
      return { 
        myImage: "MASCOT.png",
        otherImage: "MASCOT_blush.png",
        originalImage: "MASCOT.png"
      }
    }
  });