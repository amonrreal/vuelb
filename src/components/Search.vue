<template>
  <section>
    <sticky>
      <div class="container lobu-search">
        <div class="row justify-content-center">
          <div class="col-12 col-md-2 sticky-logo">
            <a href="">
              <img src="../assets/lobu.jpg" alt="">
            </a>
          </div> 
          <div class="col-12 col-md-7 c_input-search">
            <vue-instant class="input-search" :suggestion-attribute="suggestionAttribute" v-model="search" :disabled="false" @input="changed" :show-autocomplete="false" :autofocus="false" :suggestions="suggestions" name="Lobu Search" placeholder="Busca el mejor precio..." type="custom" @click-button="getResult">
            </vue-instant>
            <p id="total" v-show="isTotal">{{ searchMessage }}</p>
          </div>
        </div>
      </div>
    </sticky>
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
    <div class="container space" v-if="products.length && !pagination.hasEnd">
      <div class="row justify-content-center">
        <div class="col-8 text-center">
          <button type="button" class="btn btn-primary" @click="loadNextPage" :class="{ 'is-loading': pagination.isLoading }" :disabled="pagination.isLoading">Cargar más productos</button>
        </div>
      </div>
    </div>
    <div class="container" v-show="isInfo">
      <info></info>
    </div>
  </section>
</template>

<script>
import product from '@/components/Product'
import info from '@/components/Info'
import loader from '@/components/shared/Loader'
import notification from '@/components/shared/Notification'
import sticky from '@/components/shared/Sticky'
import api from '@/services/api'

export default {
  components: {
    product,
    info,
    loader,
    notification,
    sticky
  },
  data () {
    return {
      search: '',
      suggestionAttribute: 'title',
      products: [],
      suggestions: [],
      total: [],
      isLoading: false,
      isInfo: true,
      showNotification: false,
      isTotal: false,
      pagination: {
        offset: 0,
        limit: 21,
        hasEnd: false,
        isLoading: false
      }
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
          this.isInfo = true
          this.isTotal = false
        }, 3000)
      }
    },
    search () {
      this.pagination.offset = 0
      this.pagination.hasEnd = false
      this.pagination.isLoading = false
    }
  },
  methods: {
    changed () {
      var search = this.search
      var that = this
      this.suggestions = []

      api.get('/api/products/', {
        params: {
          search
        }
      }).then(response => {
        console.log(response.data)
        response.data.results.forEach(function (a) {
          that.suggestions.push(a)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    getResult () {
      if (!this.search) { return }
      this.isLoading = true
      this.isInfo = false
      var search = this.search
      var offset = 0

      api.get('/api/products/', {
        params: {
          search,
          offset
        }
      }).then(response => {
        console.log(response.data)
        this.pagination.offset += this.pagination.limit

        this.showNotification = response.data.count === 0
        this.total = response.data
        this.products = response.data.results
        this.isLoading = false
        this.isTotal = true
        this.isInfo = false
      }).catch(error => {
        console.log(error)
      })
    },
    loadNextPage () {
      this.pagination.isLoading = true
      var search = this.search
      var offset = this.pagination.offset
      api.get('/api/products/', {
        params: {
          search,
          offset
        }
      }).then(response => {
        console.log(response.data)
        this.pagination.offset += this.pagination.limit
        this.pagination.hasEnd = response.data.next === null

        this.products = [...this.products, ...response.data.results]
        this.pagination.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .sticky-container>.container {
    -webkit-box-shadow: 0px 4px 21px -2px rgba(99,99,99,0.69);
    -moz-box-shadow: 0px 4px 21px -2px rgba(99,99,99,0.69);
    box-shadow: 0px 4px 21px -2px rgba(99,99,99,0.69);
  }
  .sticky-container>.container>.row>.sticky-logo {
    display: block;
  }
  .sticky-container>.lobu-search {
    margin-top:0;
    padding-top: 20px;
  }
  .sticky-logo {
    display: none;
  }
  .sticky-logo img {
    margin-top: -15px;
    height: 75px;
    width: auto;
  }
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
