// Находим элементы на странице
const genresBox = document.getElementById("genres");
const moviesBox = document.getElementById("movies");
const searchInput = document.getElementById("search");
const emptyText = document.getElementById("empty");

// Здесь хранится выбранный жанр и текст поиска
let currentGenre = "все";
let searchText = "";

// Собираем список жанров из массива фильмов (без повторов)
const genres = ["все"];
for (let i = 0; i < movies.length; i++) {
  if (!genres.includes(movies[i].genre)) {
    genres.push(movies[i].genre);
  }
}

// Рисуем кнопки жанров
function showGenres() {
  genresBox.innerHTML = "";

  genres.forEach(function (genre) {
    const btn = document.createElement("button");
    btn.textContent = genre;

    if (genre === currentGenre) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", function () {
      currentGenre = genre;
      showGenres();
      showMovies();
    });

    genresBox.appendChild(btn);
  });
}

// карточки фильмов
function showMovies() {
  moviesBox.innerHTML = "";

  // Фильтруем по жанру и по поиску
  const filtered = movies.filter(function (movie) {
    const genreOk = currentGenre === "все" || movie.genre === currentGenre;
    const searchOk = movie.title.toLowerCase().includes(searchText);
    return genreOk && searchOk;
  });

  // если ничего нет - показываем надпись
  emptyText.hidden = filtered.length > 0;

  filtered.forEach(function (movie) {
    // Ссылка ведёт на страницу фильма, id передаём в адресе
    moviesBox.innerHTML += `
      <a href="movie.html?id=${movie.id}" class="card">
        <div class="poster" style="background: ${movie.color}">${movie.title}</div>
        <div class="card-info">
          <h3>${movie.title}</h3>
          <p>${movie.year}, ${movie.genre}</p>
          <p class="rating">★ ${movie.rating}</p>
        </div>
      </a>
    `;
  });
}

// Поиск: срабатывает при каждом вводе буквы
searchInput.addEventListener("input", function () {
  searchText = searchInput.value.toLowerCase();
  showMovies();
});

showGenres();
showMovies();
