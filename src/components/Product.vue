<template>
  <div class="card product">
    <div class="card-header">
      <img :src="prod.thumbnail" class="img-fluid" />
    </div>
    <div class="card-block">
      <div class="row">
        <div class="col-12" id="title">
          <a :href="prod.url" target="_blank">
            <p>
              <b>{{ prod.title }}</b>
            </p>
          </a>
        </div>
        <div class="col-6">
          <p>$ {{ prod.price }}</p>
          <p>
            <b>
              {{ prod.category }} {{ prod.brand }}
            </b>
          </p>
          <div id="share">
            <a href="https://www.facebook.com/" target="_blank">
              <img src="../assets/social/facebook.png" alt="facebook">
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img src="../assets/social/instagram.png" alt="instagram">
            </a>
          </div>
        </div>
        <div class="col-6 text-center">
          <p><b>{{ prod.website }}</b></p>
          <a :href="prod.url" target="_blank">
            <button class="btn btn-primary">
              Ver oferta
            </button>     
          </a> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
	  props: {
	    prod: { type: Object, required: true }
	  }
	}
</script>

<style scoped>
  .card-header {
    border:none;
    background: none;
  }
  .card-header img {
    max-height: 400px;
    display: block;
    margin: 0 auto;
  }
  .card {
    border: none;
    margin-bottom:35px;
  }
  .card a {
    text-decoration: none;
    color:#2c3e50;
  }
  button {
    background: #f205f6;
    background: -moz-linear-gradient(45deg, #f205f6 0%, #f12cf4 34%, #f12cf4 34%, #0599e2 100%);
    background: -webkit-linear-gradient(45deg, #f205f6 0%,#f12cf4 34%,#f12cf4 34%,#0599e2 100%);
    background: linear-gradient(45deg, #f205f6 0%,#f12cf4 34%,#f12cf4 34%,#0599e2 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f205f6', endColorstr='#0599e2',GradientType=1 );
    color:#fff;
    border:none;
    font-weight: 700;
    cursor:pointer;
  }
  button:hover, button:active, button:focus, button:visited {
    color:#fff;
    background: #f205f6;
    background: -moz-linear-gradient(45deg, #f205f6 0%, #f12cf4 34%, #f12cf4 34%, #0599e2 100%);
    background: -webkit-linear-gradient(45deg, #f205f6 0%,#f12cf4 34%,#f12cf4 34%,#0599e2 100%);
    background: linear-gradient(45deg, #f205f6 0%,#f12cf4 34%,#f12cf4 34%,#0599e2 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f205f6', endColorstr='#0599e2',GradientType=1 );
  }
  #share img {
    width: 40px;
    height: auto;
    float: left!important;
    margin-right:20px;
  }
</style>
