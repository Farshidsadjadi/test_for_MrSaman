<template>
  <q-page class="container">
    <div class="row q-pa-md">
      <div class="col-12">
        <q-input
          v-model="text"
          outlined
          label="Your Typing..."
          type="textarea"
          @update:model-value="checking()"
        />
      </div>
      <div class="col-12">
        <q-card bordered class="q-mt-md">
          <q-card-section>
            <div class="row">
              <div class="col-sm-6 col-12">
                Characters: {{characters}}
              </div>
              <div class="col-sm-6 col-12">
                Words: {{words}}
              </div>
              <div class="col-sm-6 col-12">
                Sentences: {{sentences}}
              </div>
              <div class="col-sm-6 col-12">
                Paragraphs: {{paragraphs}}
              </div>
            </div>
          </q-card-section>
          <q-separator inset />
          <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="100">
            <q-card-section v-show="Object.keys(words_density).length">
              <div class="text-h6">Word density</div>
              <div class="q-gutter-md q-mt-md">
                <q-btn no-caps color="primary" v-for="(value, name) in words_density" :label="name" :key="name">
                  <q-badge color="grey-9" text-color="primary" floating :label="value"/>
                </q-btn>
              </div>
            </q-card-section>
          </transition>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Counter',
  data() {
    return {
      text: '',
      words_density: {}
    }
  },
  computed: {
    characters() {
      return this.text.length
    },
    words() {
      let count = 0
      let split = this.text.replace(/[\t\n\r\.\?\!]/gm, " ").split(' ')
      split.forEach(item => {
        if (item != '') {
          count += 1
        }
      })
      return count
    },
    sentences() {
      if (this.text.split(/[.|!|?]\s/gi)[0].trim() == '') {
        return 0
      }
      else {
        return this.text.split(/[.|!|?]\s/gi).length
      }
    },
    paragraphs() {
      let count = 0
      let split = this.text.split(/\r|\r\n|\n/)
      split.forEach(item => {
        if (item.trim() != '') {
          count += 1
        }
      })
      return count
    }
  },
  methods: {
    checking() {
      let split = this.text.replace(/[\t\n\r\.\?\!]/gm, " ").split(' ')
      let words_densitys = {}
      split.forEach(item => {
        if (item != '') {
          if (words_densitys.hasOwnProperty(item)) {
            words_densitys[item]++
          }
          else {
            words_densitys[item] = 1
          }
        }
      })
      this.words_density = words_densitys
    },
  }
}
</script>

<style>

</style>
