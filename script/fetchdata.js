$(document).ready(function () {
  const apiUrl = "https://warlock03.github.io/Fnovels/api/collection.json";
  //const apiUrl = "../api/collection.json";

  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {
      // Display background image
      $(".main-container").css(
        "background-image",
        `url(${data[0].currentVolume.cover})`
      );
      
      $("#searchBtn").click(function () {
          const input = $('#searchItem').val();
          if (input === "") {
            alert('Empty');
          } else {
            const searchResult = getSearchResult(data, 
            input);
            getResultData(searchResult);
          }
        });

      data.forEach((items) => {
        const item = `
          <li data-src='${items.id}'>
            <img src='${items.currentVolume.cover}' alt='Cover'/>
            <p>${items.title_english}</p>
          </li>
        `;
        $("#newList").append(item);
      });
    },
    error: function (xhs, status, error) {
      console.log(error);
    }
  });

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data!");
      }
      return response.json();
    })
    .then((data) => {
      $("#newList").on("click", "li", function () {
        const id = $(this).data("src");
        const getAnimeDetails = data.find((item) => item.id === id);
        getAnimeData(getAnimeDetails);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  function getSearchResult(data, term) {
    return data.filter(function (item) {
      // Check if the search term exists in any property of the item
      for (let key in item) {
        if (
          item.hasOwnProperty(key) &&
          String(item[key]).toLowerCase().includes(term)
        ) {
          return true;
        }
      }
      return false;
    });
  }
  
  function getResultData(data){
    $('#searchList').empty();
    if(data.length > 0){
      $('#searchResultText').text('Results for \`'+$('#searchItem').val()+'\`');
      data.forEach((items) => {
          const item = `
            <li data-src='${items.id}'>
              <img src='${items.currentVolume.cover}' alt='Cover'/>
              <p>${items.title_english}</p>
            </li>
          `;
          $("#searchList").append(item);
     });
     $("#searchList").on("click", "li", function () {
        const id = $(this).data("src");
        const getAnimeDetails = data.find((item) => item.id === id);
        getAnimeData(getAnimeDetails);
        $('.search-result-container').hide(500);
     });
    }else{
      $('#searchResultText').text('No results found!');
    }
    $('.search-result-container').show(500);
  }
  
  $('#closeSearchContainer').click(function(){
    $('.search-result-container').hide(500);
  });
  $('#closeItemContainer').click(function(){
    $('.item-content').hide(500);
  });

  function getAnimeData(data) {
    $("#item-cover").attr("src", data.volumes[0].cover);
    $("#item-title").text(data.title);
    $("#item-sub-title").text(data.title_english);
    $("#synopsis").html(data.synopsis);

    const details = `
        <li>${data.status}</li>
        <li>${data.type}</li>
        <li>${data.translationGroup}</li>
        <li>${data.translationType}</li>
        <li>${data.release.start}</li>
        <li>${data.author}</li>
        <li>${data.artist}</li>
      `;
    $(".sub-details").append(details);

    const genres = data.genres;
    for (let i = 0; i < genres.length; i++) {
      const item = `
          <li>${genres[i]}</li>
        `;
      $("#genreList").append(item);
    }

    const volumes = data.volumes;
    $("#volumeList").empty();
    volumes.forEach((items) => {
      const item = `
          <li>
            <a href='${items.link}' target='_blank'>
             <img src='${items.cover}' alt='Cover'/>
             <p>${items.volume}</p>
            </a>
          </li>
        `;
      $("#volumeList").append(item);
    });

    $(".item-content").show(500);
  }
  
});
