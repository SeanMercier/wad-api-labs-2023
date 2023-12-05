export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=fbfcd17fd29948eff8cc6822d1d9b1a6&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };