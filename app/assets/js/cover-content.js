(function(Hiof, undefined) {


  Hiof.coverAddCoverContentToPage = function() {



    var pageType,
      windowWidth = $(window).width(),
      entry;


    if ($('#study-catalog-cover-id').length) {
      var facultyId = $('#study-catalog-cover-id').attr('data-study-catalog-cover-id');
      if (facultyId === '22440') {
        // HS
        pageType = 'hs';
      } else if (facultyId === '22450') {
        // IR
        pageType = 'ir';
      } else if (facultyId === '22455') {
        // IT
        pageType = 'it';
      } else if (facultyId === '22430') {
        // LU
        pageType = 'lu';
      } else if (facultyId === '22460') {
        // ØSS
        pageType = 'oss';
      } else if (facultyId === '22470') {
        // Scenekunst
        pageType = "as";
        //pageType = 'as';
      } else if (facultyId === '22480') {
        // HiØ Videre
        pageType = "page";
        //pageType = 'as';
      } else {
        pageType = "page";
      }
    } else {
      pageType = $("#main").data("page-category");
    }
    if (pageType === 'hs-index') {
      pageType = "index";
    } else if (pageType === 'ir-index') {
      pageType = "index";
    } else if (pageType === 'it-index') {
      pageType = "index";
    } else if (pageType === 'lu-index') {
      pageType = "index";
    } else if (pageType === 'oss-index') {
      pageType = "index";
    } else if (pageType === 'ask-index') {
      pageType = "index";
    } else if (pageType === 'ask') {
      pageType = "as";
    } else if (pageType === 'vid-index') {
      pageType = "index";
    } else if (pageType === 'vid') {
      pageType = "page";
    }

    if (typeof pageType === "undefined" || pageType === "") {
      //console.log('pageType was undefined, default to "page"');
      pageType = "page";
    }

    if ((windowWidth <= 770) && (pageType === "homepage")) {
      // Add HiØ logo as the cover photo on Index
      Hiof.coverGenerateMarkupBranding();
      if (windowWidth <= 420 && ((pageType === "hero") || (pageType === "bachelor") || (pageType === "master") || (pageType === "flexible"))) {
        Hiof.coverGenerateMarkupVideoMobile();
      }
    } else if ((windowWidth <= 420 && ((pageType === "homepage") || (pageType === "hero") || (pageType === "bachelor") || (pageType === "master") || (pageType === "flexible"))) ) {
      // Dont add a cover-photo on the smallest screens
      Hiof.coverGenerateMarkupVideoMobile(pageType);
    } else if ((pageType === "hero") || (pageType === "bachelor") || (pageType === "master") || (pageType === "flexible")) {
      Hiof.coverGetVideo(pageType);
    } else {
      // Add cover photo
      if (pageType === "homepage") {
        //console.log('pageType was homepage, default to "page"');
        pageType = "index";
      }

      Hiof.coverGetImage(pageType);
    }

  };
  Hiof.coverGetVideo = function(pageType) {
    //console.log("Cover video initiated");
    $.getJSON("/assets/js/data/cover-video.json", function(data) {
      // Get data from a random entry based on the pageType
      //console.log(data.cover[pageType]);
      //console.log(data);
      var entry = data.cover[pageType];

      // Set the entry to be the randomEntry data
      //entry = randomEntry;

      // Callback to generate the content
      Hiof.coverGenerateMarkupVideo(entry);
    });
    //Hiof.coverGenerateMarkupVideo();
  };
  Hiof.coverGetImage = function(pageType) {


    $.getJSON("/assets/js/data/cover-photo.json", function(data) {
      // Get data from a random entry based on the pageType
      //console.log(data.cover[pageType]);

      var entriesInCategory = data.cover[pageType],
        totalEntries = Object.keys(entriesInCategory).length,
        randomEntry = entriesInCategory[Math.floor(Math.random() * totalEntries)];

      // Set the entry to be the randomEntry data
      //entry = randomEntry;

      // Callback to generate the content
      Hiof.coverGenerateMarkupPicture(randomEntry);
    });


  };
  Hiof.coverGenerateMarkupVideoMobile = function(pageType){
    var vimeoElement = document.createElement('iframe');


    $(vimeoElement).attr({
      'width': '420',
      'height': '236',
      'frameborder': '0',
      'webkitallowfullscreen': '',
      'mozallowfullscreen': '',
      'allowfullscreen': ''
    });


    if ((pageType === "hero") || (pageType === "flexible")) {
      $(vimeoElement).attr({'src': '//player.vimeo.com/video/118909248?autoplay=1&loop=1&byline=0&portrait=0&title=0'});
    }else if (pageType === "bachelor") {
      $(vimeoElement).attr({'src': '//player.vimeo.com/video/118909247?autoplay=1&loop=1&byline=0&portrait=0&title=0'});
    }else if (pageType === "master") {
      $(vimeoElement).attr({'src': '//player.vimeo.com/video/118908762?autoplay=1&loop=1&byline=0&portrait=0&title=0'});
    }
    $('#study h1').hide();
    $('#main').prepend(vimeoElement);
  };
  Hiof.coverGenerateMarkupBranding = function() {
    var brandingWrapper = document.createElement('div'),
      lang = Hiof.languageCheck(),
      logo;
    if (lang === "eng") {
      logo = Hiof.getSvgIcon("logo-hiof-en");
    } else {
      logo = Hiof.getSvgIcon("logo-hiof");
    }
    $(brandingWrapper).addClass("branding").append(logo);
    $('#main').prepend(brandingWrapper);
  };


  Hiof.coverGenerateMarkupVideo = function(data) {
    //console.log("Cover video markup is comming..");
    //if (true) {};


    var coverWrapper = document.createElement('div'),
      imagebg = document.createElement('img'),
      videoWrapper = document.createElement('video'),
      videoSourceWebm = document.createElement('source'),
      videoSourceMp4 = document.createElement('source'),
      windowWidth = $(window).width();
      videoHeight = (windowWidth * (450/1040)) + 'px';

    if (windowWidth >1040) {
      videoHeight = '450px';
    }
    $(coverWrapper).attr({
      "class": "cover",
      "id": "cover",
      "style": 'height:' + videoHeight

    });
    $(imagebg).attr({
      "class": "cover-video-bg",
      "src": data[1040].bg,
      "style": 'height:450px;'
    });

    $(videoWrapper).attr({
      'id': 'cover-video',
      'class': 'cover-video',
      'preload': 'auto',
      'autoplay': 'true',
      'loop': 'loop',
      'muted': 'muted',
      'volume': '0',
      'height': videoHeight
    });
    $(videoSourceWebm).attr({
      'class': 'cover-video-source cover-video-source-webm',
      'type': 'video/webm'
    });
    $(videoSourceMp4).attr({
      'class': 'cover-video-source cover-video-source-mp4',
      'type': 'video/mp4'
    });

    //$('#cover').remove();



    if (windowWidth < 520) {
      $(coverWrapper).attr({
        "style": 'height:' + videoHeight

      });
      $(videoWrapper).attr({
        'poster': data[520].poster
        //'style': 'margin-left: -260px;',
        //'width': '100%',
        //'height': '225'
      });
      $(videoSourceWebm).attr('src', data[520].webm);
      $(videoSourceMp4).attr('src', data[520].mp4);
    } else if ((windowWidth > 520) && (windowWidth < 700)) {
      $(coverWrapper).attr({
        "style": 'height:' + videoHeight

      });
      $(videoWrapper).attr({
        'poster': data[750].poster
        //'style': 'margin-left: -350px;',
        //'width': '100%'
        //'height': '325'
      });
      $(videoSourceWebm).attr('src', data[750].webm);
      $(videoSourceMp4).attr('src', data[750].mp4);
    } else if ((windowWidth > 700)) {
      $(coverWrapper).attr({
        "style": 'height:' + videoHeight

      });
      $(videoWrapper).attr({
        'poster': data[1040].poster,
        //'style': 'margin-left: -520px;',
        //'width': '100%'
      });
      $(videoSourceWebm).attr('src', data[1040].webm);
      $(videoSourceMp4).attr('src', data[1040].mp4);
    } else {

    }


    if ($('html.touch').length) {
      $(videoWrapper).attr({
        'width': '100%'
      });
    }


    $(videoWrapper).append(videoSourceWebm);
    $(videoWrapper).append(videoSourceMp4);
    if (windowWidth >= 1040) {
      //$(coverWrapper).append(imagebg);
    }
    $(coverWrapper).append(videoWrapper);
    //console.log($(coverWrapper));
    $('#main').prepend(coverWrapper);





    //console.log($('.cover-video').height());
    //var video = '<video id="video_background" preload="auto" autoplay="true" loop="loop" muted="muted" volume="0">
    //                <source src="videos/splash.webm" type="video/webm">
    //                <source src="videos/splash.mp4" type="video/mp4">
    //                Video not supported </video>';


      $(document).on('click touchstart', '#cover-video, #study', function(e) {
        //debug("Click initiated");
        document.getElementById('cover-video').play();
      });




  };

  Hiof.coverGenerateMarkupPicture = function(data) {


    var coverWrapper = document.createElement('div'),
      photoWrapper = $(coverWrapper).clone(),
      blurWrapper = $(coverWrapper).clone(),
      windowWidth = $(window).width(),
      windowHeight = $(window).height();

    $(coverWrapper).addClass("cover").attr("id", "cover");
    $(photoWrapper).addClass("cover-photo cover-photo-normal");
    $(blurWrapper).addClass("cover-photo cover-photo-blur");

    //$.each(data, function(item){
    //  if (item === "400"){
    //    console.log(item.normal);
    //  }
    //});
    if (windowHeight <= 470) {
      // If the height of the viewport is less than 400px, return false
      return;
    }


    if (windowWidth < 400) {

      $(coverWrapper).addClass('height-' + data[400].imgHeight);
      $(photoWrapper).css('background-image', 'url(' + data[400].normal + ')').addClass('height-' + data[400].imgHeight);
      $(blurWrapper).css('background-image', 'url(' + data[400].blurred + ')').addClass('height-' + data[400].imgHeight);

    } else if ((windowWidth > 400) && (windowWidth < 500)) {
      $(coverWrapper).addClass('height-' + data[500].imgHeight);
      $(photoWrapper).css('background-image', 'url(' + data[500].normal + ')').addClass('height-' + data[500].imgHeight);
      $(blurWrapper).css('background-image', 'url(' + data[500].blurred + ')').addClass('height-' + data[500].imgHeight);
    } else if ((windowWidth > 500) && (windowWidth < 600)) {
      $(coverWrapper).addClass('height-' + data[600].imgHeight);
      $(photoWrapper).css('background-image', 'url(' + data[600].normal + ')').addClass('height-' + data[600].imgHeight);
      $(blurWrapper).css('background-image', 'url(' + data[600].blurred + ')').addClass('height-' + data[600].imgHeight);

    } else if ((windowWidth > 600) && (windowWidth < 800)) {
      $(coverWrapper).addClass('height-' + data[800].imgHeight);
      $(photoWrapper).css('background-image', 'url(' + data[800].normal + ')').addClass('height-' + data[800].imgHeight);
      $(blurWrapper).css('background-image', 'url(' + data[800].blurred + ')').addClass('height-' + data[800].imgHeight);

    } else if ((windowWidth > 800) && (windowWidth < 1000)) {
      $(coverWrapper).addClass('height-' + data[1000].imgHeight);
      $(photoWrapper).css('background-image', 'url(' + data[1000].normal + ')').addClass('height-' + data[1000].imgHeight);
      $(blurWrapper).css('background-image', 'url(' + data[1000].blurred + ')').addClass('height-' + data[1000].imgHeight);

    } else if ((windowWidth > 1000) && (windowWidth < 1200)) {
      $(coverWrapper).addClass('height-' + data[1200].imgHeight);
      $(photoWrapper).css('background-image', 'url(' + data[1200].normal + ')').addClass('height-' + data[1200].imgHeight);
      $(blurWrapper).css('background-image', 'url(' + data[1200].blurred + ')').addClass('height-' + data[1200].imgHeight);

    } else if ((windowWidth > 1200) && (windowWidth < 1600)) {
      $(coverWrapper).addClass('height-' + data[1600].imgHeight);
      $(photoWrapper).css('background-image', 'url(' + data[1600].normal + ')').addClass('height-' + data[1600].imgHeight);
      $(blurWrapper).css('background-image', 'url(' + data[1600].blurred + ')').addClass('height-' + data[1600].imgHeight);

    } else if (windowWidth > 1600) {
      $(coverWrapper).addClass('height-' + data[2000].imgHeight);
      $(photoWrapper).css('background-image', 'url(' + data[2000].normal + ')').addClass('height-' + data[2000].imgHeight);
      $(blurWrapper).css('background-image', 'url(' + data[2000].blurred + ')').addClass('height-' + data[2000].imgHeight);
    }

    $(coverWrapper).append(photoWrapper).append(blurWrapper);
    //console.log(data[1200]);
    //var imageUrl = data[1200] + "";

    $('#main').prepend(coverWrapper);


  };




  $(function() {
    Hiof.coverAddCoverContentToPage();


    $(window).resize(function() {
      $('#cover').css('height', $('.cover-photo-bg').height() + 'px');
    });





  });


})(window.Hiof = window.Hiof || {});
