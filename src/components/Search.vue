<template>
  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-7">
          <vue-instant class="input-search" :suggestion-attribute="suggestionAttribute" v-model="search" :disabled="false" @input="changed" :show-autocomplete="false" :autofocus="false" :suggestions="suggestions" name="Lobu Search"placeholder="Busca el mejor precio..." type="custom" @click-button="getResult">
          </vue-instant>
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
    <div class="container space" v-if="products.length && !pagination.hasEnd">
      <div class="row justify-content-center">
        <div class="col-8 text-center">
          <button type="button" class="btn btn-primary" @click="loadNextPage" :class="{ 'is-loading': pagination.isLoading }" :disabled="pagination.isLoading">Cargar más productos</button>
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
      suggestionAttribute: 'title',
      products: [],
      suggestions: [],
      total: [],
      isLoading: false,
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
