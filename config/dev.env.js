'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const env = process.env.NODE_ENV;

module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify(env)
})
