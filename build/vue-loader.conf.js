
module.exports = {
  transformAssetUrls: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: ['xlink:href', 'href'],
    use: ['xlink:href', 'href']
  }
}