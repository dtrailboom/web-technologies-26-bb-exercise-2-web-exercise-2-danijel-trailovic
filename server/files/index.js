window.onload = function () {
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const bodyElement = document.querySelector("body");

    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);

      bodyElement.innerHTML = "";

      const heading = document.createElement("h1");
      heading.textContent = "My Top Movies";
      bodyElement.appendChild(heading);

      for (const movie of movies) {
        const movieArticle = document.createElement("article");
        movieArticle.id = movie.imdbID;

        const img = document.createElement("img");
        img.src = movie.Poster;
        img.alt = movie.Title + " poster";
        movieArticle.appendChild(img);

        const title = document.createElement("h2");
        title.textContent = movie.Title;
        movieArticle.appendChild(title);

        const movieInfo = document.createElement("p");
        movieInfo.innerHTML =
            `<strong>Runtime:</strong> ${movie.Runtime} min • <strong>Released on:</strong> ${movie.Released}`;
        movieArticle.appendChild(movieInfo);

        const genreContainer = document.createElement("p");
        for (const genre of movie.Genres) {
          const span = document.createElement("span");
          span.className = "genre";
          span.textContent = genre;
          genreContainer.appendChild(span);
        }
        movieArticle.appendChild(genreContainer);

        const plot = document.createElement("p");
        plot.textContent = movie.Plot;
        movieArticle.appendChild(plot);

        const createListSection = function (label, dataArray) {
          const header = document.createElement("h3");
          header.textContent = label;
          movieArticle.appendChild(header);

          const ul = document.createElement("ul");
          for (const item of dataArray) {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
          }
          movieArticle.appendChild(ul);
        };

        createListSection("Directors", movie.Directors);
        createListSection("Writers", movie.Writers);
        createListSection("Actors", movie.Actors);

        const rating = document.createElement("p");
        rating.className = "rating";
        rating.textContent = `IMDb: ${movie.imdbRating} / Metascore: ${movie.Metascore}`;
        movieArticle.appendChild(rating);

        if (movie.imdbRating >= 8.5) {
          rating.classList.add("rating-high");
        } else if (movie.imdbRating >= 7.5) {
          rating.classList.add("rating-medium");
        } else {
          rating.classList.add("rating-low");
        }

        const buttonElement = document.createElement("button");
        buttonElement.textContent = "Edit";
        buttonElement.onclick = function () {
          location.href = "edit.html?imdbID=" + movie.imdbID;
        };
        movieArticle.appendChild(buttonElement);

        bodyElement.appendChild(movieArticle);
      }
    } else {
      bodyElement.append(
          "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };

  xhr.open("GET", "/movies");
  xhr.send();
};