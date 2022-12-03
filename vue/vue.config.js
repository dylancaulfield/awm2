module.exports = {
  devServer:{
    disableHostCheck: true,
    https: false,
    host: "localhost",
    proxy: "https://localhost"
  },
  transpileDependencies: [
    'vuetify'
  ]
}
