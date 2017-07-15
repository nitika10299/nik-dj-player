 var drumset = false;
 
 
 var currenttrack = 0;
 var song = document.querySelector('audio[data-key="${currenttrack}"]');
 var playlist = [
     "Aur_Ho", "Birthday_Bash", "Haawa_Haawa",  "Jo_Bhi_Main", "Katiya_Karun",
     "Naadaan_Parindey", "O_Re_Khuda", "One_Dream", "Phir_Se_Ud_Chala", "Saadda_Haq",
     "Saadi_Galli_Aaja", "Sheher_Mein", "The_Meeting_Place", "Tum_Ho"
 ];

 function playsong(id) {
     resetactivesong();
     $("#sng" + id).addClass("Active");     
     currenttrack = id;
     if (song != null) {
         song.src="";
     }
     setTimeout(function(){
     song = document.querySelector('audio[data-key="' + currenttrack + '"]');
     song.play();
     },100);
     progressbar();
     $('.play-icon').removeClass('fa-play').addClass('fa-pause');
     $('.article').html(playlist[currenttrack]);
 }
 $('.log-btn').on('click', function () {
     var name = $('input').val();
     if (name.length > 2) {
         var message = "Hey, " + name + " Enjoy NIKDJ";
         $('.user-name').text(message);
         $('.background').addClass('hidden');
         $('.main').removeClass('hidden');
         playsong(0);
     } else {
         $('.errormsg').addClass("show");
     }

 });

 function toggleSong() {

     // var song = document.querySelector('audio');
     if (song.paused == true) {
         console.log('Playing');
         $('.play-icon').removeClass('fa-play').addClass('fa-pause');
         song.play();
     } else {
         console.log('Pausing');
         $('.play-icon').removeClass('fa-pause').addClass('fa-play');
         song.pause();
     }
 }
 $('.play-icon').on('click', function () {
     toggleSong();
 });
 $('#prev').on('click', function () {
     
     if (song != null) {
          song.src="";
     }
     currenttrack = currenttrack - 1;
      resetactivesong();
     $("#sng" + currenttrack).addClass("Active"); 
     setTimeout(function(){
     song = document.querySelector('audio[data-key="' + currenttrack + '"]');
     song.play();
     },100);
     $('.article').html(playlist[currenttrack]);
 });
 $('#next').on('click', function () {
     if (song != null) {
          song.src="";
     }
     
     currenttrack = currenttrack + 1;
     resetactivesong();
     $("#sng" + currenttrack).addClass("Active");
    setTimeout(function(){
     song = document.querySelector('audio[data-key="' + currenttrack + '"]');
     song.play();
     },100);
     $('.article').html(playlist[currenttrack]);
 });

 $('body').on('keypress', function (event) {
     if (event.keyCode == 32) {
         toggleSong();
     }
 });

 function fancyTimeFormat(time) {
     // Hours, minutes and seconds
     var hrs = ~~(time / 3600);
     var mins = ~~((time % 3600) / 60);
     var secs = time % 60;

     // Output like "1:01" or "4:03:59" or "123:03:59"
     var ret = "";

     if (hrs > 0) {
         ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
     }

     ret += "" + mins + ":" + (secs < 10 ? "0" : "");
     ret += "" + secs;
     return ret;
 }

 function updateCurrentTime() {
     //var song = document.querySelector('audio');
     var currentTime = Math.floor(song.currentTime);
     currentTime = fancyTimeFormat(currentTime);
     var duration = Math.floor(song.duration);
     duration = fancyTimeFormat(duration)
     $('.time-elapsed').text(currentTime);
     $('.song-duration').text(duration);
     if (currentTime == duration) {
         $('#next').click();
         resetactivesong();
         $("#sng" + id).addClass("Active");
     }
 }

 function updateProgress() {
     // var song = document.querySelector('audio');
     var progress = document.querySelector('#progress');
     var value = 0;
     if (song.currentTime > 0) {
         value = Math.floor((100 / song.duration) * song.currentTime);
         console.log(progress);
     }
     progress.style.width = value + "%";
     progress.style.backgroundColor = "BLACK";

 }



 function progressbar() {
     updateCurrentTime();
     setInterval(function () {
         updateCurrentTime();
     }, 1000);
     updateProgress();
     setInterval(function () {
         updateProgress();
     }, 1000);
 }
 $('.main .vir').on('click', function () {
     drumset = true;
     $('.music').addClass('hidden');
     $('.piano').removeClass('hidden');
     $(".vir a").css('color','yellow');
      $(".sir a").css('color','white');
 });
 $('.main .sir').on('click', function () {
     drumset = false;
     $('.piano').addClass('hidden');
     $('.music').removeClass('hidden');
     $(".sir a").css('color','yellow');
     $(".vir a").css('color','white');
 });

 function removeTransition(e) {
     if (e.propertyName !== 'transform') return;
     e.target.classList.remove('playing');
 }

 function playSound(e) {
     if (drumset) {
         const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
         const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
         if (!audio) return;
         key.classList.add('playing');
         audio.currentTime = 0;
         audio.play();
     }
 }

 const keys = Array.from(document.querySelectorAll('.key'));
 keys.forEach(key => key.addEventListener('transitionend', removeTransition));
 window.addEventListener('keydown', playSound);

 function resetactivesong() {
     $('.current-song').each(function () {
         $(this).removeClass('Active');
     });
 }