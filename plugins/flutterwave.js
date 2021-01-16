import Flutterwave from 'flutterwave-vue-v3'
import Vue from 'vue'

Vue.use(Flutterwave, { publicKey: process.env.fwKey })
