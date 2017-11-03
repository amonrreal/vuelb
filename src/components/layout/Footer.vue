<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-5 fot">
          <ul id="fot-menu">
            <li>
              <router-link to="/contacto">Contacto</router-link>
            </li>
            <li>
              <router-link to="/nosotros">Acerca de Lobu</router-link>
            </li>
            <li>
              <router-link to="/terminosycondiciones">Terminos y condiciones</router-link>
            </li>
          </ul>
        </div>
        <div class="col-3">
          <h3><span>Lo bu</span>eno<br> al mejor precio<br><span>lobu lo bu</span>sca</h3>
        </div>
        <div class="col-4 fot">
          <ul id="redes">
            <li>
              <a href="https://www.facebook.com/" target="_blank">
                <img src="../../assets/social/facebook.png" alt="facebook">
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/l/es/" target="_blank">
                <img src="../../assets/social/instagram.png" alt="instagram">
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/" target="_blank">
                <img id="ico-y" src="../../assets/social/youtube.png" alt="youtube">
              </a>
            </li>
            <li>
              <a href="https://www.snapchat.com/" target="_blank">
                <img src="../../assets/social/snapchat.png" alt="snapchat">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style scoped>
.fot {
    display:block;
}
#redes {
  display:table-cell;
  vertical-align:middle;
  height: 120px;
  width: auto;
}
#fot-menu {
  display:table-cell;
  vertical-align:middle;
  height: 120px;
  width: auto;
}
#fot-menu a {
  text-decoration: none;
  color:#333333;
}
#ico-y {
  padding-top:5px;
}
li {
  list-style: none;
  float:left;
  font-weight: 700;
  font-size:15px;
  margin-right:10px;
}
#redes img {
  width: 40px;
  height: auto;
  margin: 0 auto;
}
h3 {
  font-weight: 700;
}
span {
  background: -webkit-linear-gradient(right, #0599e2, #f205f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
