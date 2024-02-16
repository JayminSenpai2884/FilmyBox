const apiConfig = {
    baseUrl: 'http://api.themoviedb.org/3/',
    apiKey:'f0b5c1d3307aae122961663d10864986',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,

}

export default apiConfig;