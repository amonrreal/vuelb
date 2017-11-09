<template>
  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-7">
          <form v-on:submit.prevent="getResult">
            <input type="text" class="form-control" placeholder="Busca algo..." v-model="search" @keyup.enter="search" />
          </form>
          <p id="total" v-show="isTotal">{{ searchMessage }}</p>
        </div>
      </div>
    </div>
    <loader v-show="isLoading"></loader>
    <notification class="space" v-show="showNotification">
      <h3 slot="body">No encontramos este producto</h3>
      <h4 slot="body">Intenta con otro</h4>
    </notification>
    <div class="container space" v-show="!isLoading">
      <div class="row">
        <div class="col-4" v-for="p in products">
          <product :prod="p"></product>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import product from '@/components/Product'
import loader from '@/components/shared/Loader'
import notification from '@/components/shared/Notification'
import api from '@/services/api'

export default {
  components: {
    product,
    loader,
    notification
  },
  data () {
    return {
      search: '',
      products: [],
      total: [],
      isLoading: false,
      showNotification: false,
      isTotal: false
    }
  },
  computed: {
    searchMessage () {
      return `Encontramos ${this.total.count} productos`
    }
  },
  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
          this.isTotal = false
        }, 3000)
      }
    }
  },
  methods: {
    getResult () {
      if (!this.search) { return }
      this.isLoading = true
      var search = this.search
      api.get('/api/products/', {
        params: {
          search
        }
      }).then(response => {
        console.log(response.data)
        this.showNotification = response.data.count === 0
        this.total = response.data
        this.products = response.data.results
        this.isLoading = false
        this.isTotal = true
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .lobu-search {
    margin-top: 20px;
    width: 100%;
    background-color: #fff;
  }
  .space {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  #total {
    font-size: 13px;
    padding-top: 7px;
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
</style>
