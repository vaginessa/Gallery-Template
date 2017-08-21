function loadVideosPage(videos){
  var currentPage = loadVideos(videos,1);
  var maxPages = Math.ceil(videos.length/10);
  var changeContent = "";
  if(maxPages > 1){
    changeContent += "<div id='prev'></div>";
  }
  changeContent += '<div class="type-switch">' 
    + '<input type="radio" name="type" value="video" id="video" class="type-switch-input" checked/>'
    + '<label for="video" class="type-switch-label">Video</label>'
    + '<input type="radio" name="type" value="photo" id="photo" class="type-switch-input" />' 
    + '<label for="photo" class="type-switch-label">Photo</label>' 
    + '</div>';
  if(maxPages > 1){
    changeContent += "<div id='next'></div>";
  }
  document.getElementById("change-content").innerHTML = changeContent;
  if(maxPages > 1){
    document.getElementById("prev").onclick = function(){
      if(currentPage != 1){
        currentPage = loadVideos(videos, currentPage-1);
      }
    };
    document.getElementById("next").onclick = function(){
      if(currentPage != maxPages){
        currentPage = loadVideos(videos, currentPage+1);
      }
    };
  }
  if(maxPages < 2){
    document.getElementById("change-content").style.backgroundColor = 'transparent';
    document.getElementById("change-content").style.padding = '0';
  }
  var type = document.changeContent.type;
  type[1].onclick = function() { window.location.href = 'photos.html'; };
}

function loadOnlyVideosPage(videos){
  var currentPage = loadVideos(videos,1);
  var maxPages = Math.ceil(videos.length/10);
  if(maxPages > 1){
    var changeContent = "<div id='prev'></div>" + "<div id='next'></div>";
    document.getElementById("change-content").innerHTML = changeContent;
    document.getElementById("prev").onclick = function(){
      if(currentPage != 1){
        currentPage = loadVideos(videos, currentPage-1);
      }
    };
    document.getElementById("next").onclick = function(){
      if(currentPage != maxPages){
        currentPage = loadVideos(videos, currentPage+1);
      }
    };
    document.getElementById("change-content").style = 'width: 150px; margin-left: auto; margin-right: auto;';
  } else {
    document.getElementById("change-content").style.display = 'none';
  }
}

function loadPhotosPage(photos){
  loadPhotos(photos);
  var changeContent = '<div class="type-switch">'
    + '<input type="radio" name="type" value="video" id="video" class="type-switch-input" />'
    + '<label for="video" class="type-switch-label">Video</label>' 
    + '<input type="radio" name="type" value="photo" id="photo" class="type-switch-input" checked/>'
    + '<label for="photo" class="type-switch-label">Photo</label>'
    + '</div>';
  document.getElementById("change-content").innerHTML = changeContent;
  document.getElementById("change-content").style.backgroundColor = 'transparent';
  document.getElementById("change-content").style.padding = '0';
  var type = document.changeContent.type;
  type[0].onclick = function() { window.location.href = 'videos.html'; }; 
}

function loadVideos(videos, page=1) {
  document.getElementById("videos").innerHTML = "";
  var lastElement = page*10;
  if(lastElement > videos.length) 
    lastElement = videos.length;
  for(var i  = page*10-10; i < lastElement; i++){
    var video = "<li> <span class='video' style='background:transparent no-repeat url(" + videos[i].img + ");background-size: cover;background-position:center;background-repeat: no-repeat;'>";
    if(videos[i].type === "iframe"){
      video += "<iframe src='" + videos[i].link + "' frameborder=0 scrolling=no allowfullscreen></iframe>";
    } else if(videos[i].type === "link"){
      video += "<a href='" + videos[i].link + "' target='_blank' class='link'></a>";
    } else {
      video += "<video controls preload='none'><source src=" 
        + "'" + videos[i].link + "'" 
        + "type='video/mp4'></video>";
    }
    video += "<span class='title'>" + videos[i].name + "</span>"
      + "</span> </li>";
    document.getElementById("videos").innerHTML += video;
  }
  return page;
}

function loadPhotos(photos) {
  for(var i  = 0; i < photos.length; i++){
    var photo = "<div class='photo'>";
    if(photos[i].img_full) 
      photo += "<a href='" + photos[i].img_full + "' class='download-image' target='_blank'></a>";
    else photo += "<a href='" + photos[i].img + "' class='download-image' target='_blank'></a>";
    photo += "<img src='" + photos[i].img + "' data-full='" + photos[i].img 
       +"' class='m-p-g__thumbs-img'/>";
    if(photos[i].name && photos[i].link) {
      photo += "<a class='title' href='"+ photos[i].link 
        + "' target='_blank' style='color: #6897bb;'>" + photos[i].name + "</a>";
    } else if(photos[i].name) {
      photo += "<span class='title'>" + photos[i].name + "</span>";
    }
    photo += "</div>";
    document.getElementById("photos").innerHTML += photo;
  }
}

window.onscroll = function() {
  var home = document.getElementById('home');
  if ( window.pageYOffset > 400) {
      home.classList.add("go-home-fixed");
  } else {
      home.classList.remove("go-home-fixed");
  }
  var nav = document.getElementById('change-content');
  if ( window.pageYOffset > 400 && document.getElementById("change-content").style.display != 'none'){
      nav.classList.add("change-content-fixed");
  } else {
      nav.classList.remove("change-content-fixed");
  }
}