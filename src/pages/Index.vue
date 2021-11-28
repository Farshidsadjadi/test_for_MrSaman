<template>
  <q-page class="container">

    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Weather Condition</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset">
          <q-input
            outlined
            v-model="city"
            label="City *"
            hint="Please Type Your City Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <div class="q-gutter-md q-mt-md">
            <q-btn label="Submit" type="submit" color="primary" :loading="loading_btn_submit"/>
            <q-btn label="Reset" type="reset" color="primary" outline />
            <q-btn label="Go To Counter" type="a" color="primary" href="/counter" v-if="result_show"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <transition appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" :duration="1000">
      <q-card bordered class="q-ma-md"  v-show="result_show">
        <q-card-section>
          <div class="row">
            <div class="col-sm-6 col-12">
              Country: {{location.country}}
            </div>
            <div class="col-sm-6 col-12">
              City: {{location.name}}
            </div>
            <div class="col-sm-6 col-12">
              CO: {{current.air_quality.co}}
            </div>
            <div class="col-sm-6 col-12">
              No2: {{current.air_quality.no2}}
            </div>
            <div class="col-sm-6 col-12">
              humidity: {{current.humidity}}
            </div>
            <div class="col-sm-6 col-12">
              Temperature: {{current.temp_c}}
            </div>
            <div class="col-sm-6 col-12">
              Gust: {{current.gust_kph}} KM
            </div>
            <div class="col-sm-6 col-12">
              Vis: {{current.vis_km}} KM
            </div>
          </div>
        </q-card-section>
      </q-card>
    </transition>
  </q-page>
</template>

<script>

export default ({
  name: 'Home',
  data() {
    return {
      city: null,
      loading_btn_submit: false,
      result_show: false,
      location: {},
      current: {
        air_quality: {}
      }
    }
  },
  computed: {
    result_show : {
      get() {
        return this.$store.state.user.result_show
      },
      set(val) {
        this.$store.commit('user/change_result_show', val)
      }
    }
  },
  methods: {
    async test_api() {
      this.loading_btn_submit = true
      this.$q.loading.show()
      await this.$axios.get(`https://api.weatherapi.com/v1/current.json?key=b736bd98a216465a8e3141318212711&q=${this.city}&aqi=yes`)
      .then(response => {
        console.log(response.data)
        this.location = response.data.location
        this.current = response.data.current
        this.result_show = true
      })
      .catch(error => {
        this.$q.notify({
          message: error.response.data.error.message ? error.response.data.error.message : 'We Have Unknown Error',
          color: 'negative',
          position: 'top'
        })
        this.resetData()
      })
      this.loading_btn_submit = false
      this.$q.loading.hide()
    },
    resetData() {
      this.current = {
        air_quality: {}
      }
      this.location = {}
      this.result_show = false
    },
    onSubmit() {
      this.test_api()
    },
    onReset() {
      this.city = null
      this.resetData()
    }
  },
  created() {
    this.result_show = false
  }
})
</script>
