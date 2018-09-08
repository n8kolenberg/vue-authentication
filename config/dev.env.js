'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DB_API_KEY: '"AIzaSyCijIt-M7FMOwuWVM8moKJPCqJoCOwWuZc"',
  DB_URL: '"https://vue-authentication-69008.firebaseio.com/"'
})
