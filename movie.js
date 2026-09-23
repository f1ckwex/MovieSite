const movieBox = document.getElementById("movie");
const similarBox = document.getElementById("similar");
const similarTitle = document.getElementById("similar-title");

// Берём id из адреса: movie.html?id=3  ->  3
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

// Ищем фильм с таким id в массиве
const movie = movies.find(function (m) {
  return m.id === id;
});

if (movie) {
  // Меняем заголовок вкладки
  document.title = movie.title + " — КиноСайт";

  movieBox.innerHTML = `
    <div class="poster" style="background: ${movie.color}">${movie.title}</div>
    <div class="movie-info">
      <h1>${movie.title}</h1>
      <span class="genre-tag">${movie.genre}</span>
      <p class="big-rating">★ ${movie.rating}</p>
      <p><b>Год:</b> ${movie.year}</p>
      <p><b>Режиссёр:</b> ${movie.director}</p>
      <p><b>Длительность:</b> ${movie.duration} мин</p>
      <p>${movie.description}</p>
    </div>
  `;

  // Похожие фильмы - тот же жанр, но не этот же фильм
  const similar = movies.filter(function (m) {
    return m.genre === movie.genre && m.id !== movie.id;
  });

  if (similar.length > 0) {
    similarTitle.hidden = false;

    similar.forEach(function (m) {
      similarBox.innerHTML += `
        <a href="movie.html?id=${m.id}" class="card">
          <div class="poster" style="background: ${m.color}">${m.title}</div>
          <div class="card-info">
            <h3>${m.title}</h3>
            <p>${m.year}, ${m.genre}</p>
            <p class="rating">★ ${m.rating}</p>
          </div>
        </a>
      `;
    });
  }
} else {
  movieBox.innerHTML = "<p>Такого фильма нет :(</p>";
}
