

function preloader(){
    $(() => {
        setInterval(() => {
            var p = $('.preloader');

            p.css('opacity', 0);

            setInterval(
                () =>p.remove(),
                parseInt(p.css('--duration'))*1000
            );
        }, 1000);
    });
}

setInterval(() => preloader(), 2000);

$(document).ready(function(){
    $('.menu__list, .btn__link').on("click", "a", function(event){
        event.preventDefault();
        var clas = $(this).attr('href'),
            top = $(clas).offset().top;
        $('body, html').animate({scrollTop: top}, 1500);
    });
});

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#D2EDD4',
    progressColor: '#46B54D'
}); 

// load default track
wavesurfer.load('https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3');

// load M3U playlist
var myPlaylist = wavesurfer.Playlist;
$('body').on('click', '.loadM3U', function(){
  myPlaylist.init({
    wavesurfer: wavesurfer,
    playlistFile: 'https://cdn.rawgit.com/katspaugh/wavesurfer.js/gh-pages/example/playlist/sample.m3u',
    playlistType: 'm3u'
  });    
});

// on playlist parsed with event playlist-ready
var myList;
wavesurfer.on('playlist-ready', function () {
  myList = myPlaylist.getPlaylist();
  for (var i = 0; i < myList.length; i++) {
    if (myList[i]) {
      $('.playlistbox').append('<li class="playTrack" data-id="'+i+'">'+myList[i]+'</li>');
    }
  }
  console.log(myList); 
});  

// on waveform ready
wavesurfer.on('waveform-ready', function () {
  wavesurfer.play();
});

// on playlist track click
$('body').on('click', '.playTrack', function(){
  wavesurfer.load(myList[$(this).data('id')]);
});