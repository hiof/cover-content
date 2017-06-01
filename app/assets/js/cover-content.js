class CoverContent {
  constructor() {
    this.view = new View();
    this.defaults = {
      gfx: '/assets/plugins/cover-content/images/gfx/grid.svg',
      video: '/assets/plugins/cover-content/js/data/cover-video.json',
      image: '/assets/plugins/cover-content/js/data/cover-photo.json'
    }
  }

  addCoverContentToPage() {
    var pageType,
    windowWidth = $(window).width(),
    entry;

    // If the page is in the study cataloge
    if ($('#study-catalog-cover-id').length) {
      pageType = "coursedescription";
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

    if((windowWidth <= 899) && (pageType === "homepage")){
      this.addGfx(pageType);
    } else if ((windowWidth <= 350 && ((pageType === "homepage") || (pageType === "hero") || (pageType === "bachelor") || (pageType === "master") || (pageType === "flexible")))) {
      // Dont add a cover-photo on the smallest screens
      this.generateMarkupVideoMobile(pageType);
    } else if ((pageType === "hero") || (pageType === "bachelor") || (pageType === "master") || (pageType === "flexible")) {
      this.getVideo(pageType);
    } else {
      // Add cover photo
      if (pageType === "homepage") {
        pageType = "index";
      }
      if ((pageType === "admission") || (pageType === "about") || (pageType === "studyprogram") || (pageType === "coursedescription") || (pageType === "study")) {
        this.addGfx(pageType);
      } else {
        this.getImage(pageType);
      }
    }

  }
  addGfx(pageType) {
    // Setup variables
    var coverWrapper = document.createElement('div'),
    gfxWrapper = $(coverWrapper).clone(),
    windowWidth = $(window).width(),
    windowHeight = $(window).height(),
    gfxClass = 'cover-gfx-' + pageType;

    // Add attributes to created elements
    $(coverWrapper).addClass("cover height-100 margin-bottom-30").attr("id", "cover");
    $(gfxWrapper).addClass('cover-gfx height-100').addClass(gfxClass);

    // Get the grid graphics
    $.get("/assets/plugins/cover-content/images/gfx/grid.svg", function(svgDoc) {
      // Get the <svg> node
      var importedSVGRootElement = document.importNode(svgDoc.documentElement, true);
      // Append the <svg> node to the gfxWrapper
      $(gfxWrapper).prepend(importedSVGRootElement);
    });
    if((windowWidth <= 955) && (pageType === "homepage")){
      $(coverWrapper).css({'height':'16rem','margin-bottom': '0'});
      $(gfxWrapper).append('<a href="http://hiof.no/studier" class="btn btn-primary">Se våre studier</a>');
    }
    // Append the graphic wrapper into the wrapper
    $(coverWrapper).append(gfxWrapper);

    // Append the wrapper to the #main element on the page
    $('#main').prepend(coverWrapper);

  };

  getVideo(pageType) {
    let that = this;
    let options = {};
    options.url = '/assets/plugins/cover-content/js/data/cover-video.json';
    options.pageType = pageType;
    this.view.getData(options, that).success(function(data){
      // Get data from a random entry based on the pageType
      var entry = data.cover[options.pageType];

      // Callback to generate the content
      that.generateMarkupVideo(entry);
    });

  }

  getImage(pageType) {
    let that = this;
    let options = {};
    options.url = "/assets/plugins/cover-content/js/data/cover-photo.json";
    options.pageType = pageType;
    this.view.getData(options, that).success(function(data){
      var entriesInCategory = data.cover[options.pageType],
      totalEntries = Object.keys(entriesInCategory).length,
      randomEntry = entriesInCategory[Math.floor(Math.random() * totalEntries)];

      // Callback to generate the content
      that.generateMarkupPicture(randomEntry);
    });

  }

  generateMarkupVideoMobile(pageType) {
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
      $(vimeoElement).attr({
        'src': '//player.vimeo.com/video/118909248?autoplay=1&loop=1&byline=0&portrait=0&title=0'
      });
    } else if (pageType === "bachelor") {
      $(vimeoElement).attr({
        'src': '//player.vimeo.com/video/118909247?autoplay=1&loop=1&byline=0&portrait=0&title=0'
      });
    } else if (pageType === "master") {
      $(vimeoElement).attr({
        'src': '//player.vimeo.com/video/118908762?autoplay=1&loop=1&byline=0&portrait=0&title=0'
      });
    }
    $('#study h1').hide();
    $('#main').prepend(vimeoElement);
  }

  generateMarkupBgcolor() {
    var coverWrapper = document.createElement('div'),
    colorWrapper = $(coverWrapper).clone(),
    windowWidth = $(window).width(),
    windowHeight = $(window).height();

    $(coverWrapper).addClass("cover height-600").attr("id", "cover");
    $(colorWrapper).addClass("cover-photo cover-photo-normal height-600 c-bg-purple");

    $(coverWrapper).append(colorWrapper);

    $('#main').prepend(coverWrapper);
  }

  generateMarkupBranding() {
    var brandingWrapper = document.createElement('div'),
    lang = Hiof.view.languageCheck(),
    logo;
    if (lang === "eng") {
      logo = Hiof.view.getSvgIcon("logo-hiof-en");
    } else {
      logo = Hiof.view.getSvgIcon("logo-hiof");
    }
    $(brandingWrapper).addClass("branding").append(logo);
    $('#main').prepend(brandingWrapper);
  }

  generateMarkupVideo(data) {
    var coverWrapper = document.createElement('div'),
    imagebg = document.createElement('img'),
    videoWrapper = document.createElement('video'),
    videoSourceWebm = document.createElement('source'),
    videoSourceMp4 = document.createElement('source'),
    windowWidth = $(window).width(),
    videoHeight = (windowWidth * (450 / 1040)) + 'px';

    if (windowWidth > 1040) {
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

    if (windowWidth < 520) {
      $(coverWrapper).attr({
        "style": 'height:' + videoHeight

      });
      $(videoWrapper).attr({
        'poster': data[520].poster
      });
      $(videoSourceWebm).attr('src', data[520].webm);
      $(videoSourceMp4).attr('src', data[520].mp4);
    } else if ((windowWidth > 520) && (windowWidth < 700)) {
      $(coverWrapper).attr({
        "style": 'height:' + videoHeight

      });
      $(videoWrapper).attr({
        'poster': data[750].poster
      });
      $(videoSourceWebm).attr('src', data[750].webm);
      $(videoSourceMp4).attr('src', data[750].mp4);
    } else if ((windowWidth > 700)) {
      $(coverWrapper).attr({
        "style": 'height:' + videoHeight

      });
      $(videoWrapper).attr({
        'poster': data[1040].poster,
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

    $(document).on('click touchstart', '#cover-video, #study', function(e) {
      //debug("Click initiated");
      document.getElementById('cover-video').play();
    });

  }

  generateMarkupPicture(data) {

    var coverWrapper = document.createElement('div'),
        photoWrapper = $(coverWrapper).clone(),
        blurWrapper = $(coverWrapper).clone(),
        windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        size;

    $(coverWrapper).addClass("cover").attr("id", "cover");
    $(photoWrapper).addClass("cover-photo cover-photo-normal");
    $(blurWrapper).addClass("cover-photo cover-photo-blur");

    if (windowHeight <= 470) {
      // If the height of the viewport is less than 400px, return false
      return;
    }


    if (windowWidth < 400) {
      size=400;

    } else if ((windowWidth > 400) && (windowWidth < 500)) {
      size=500;
    } else if ((windowWidth > 500) && (windowWidth < 600)) {
      size=600;
    } else if ((windowWidth > 600) && (windowWidth < 800)) {
      size=800;
    } else if ((windowWidth > 800) && (windowWidth < 1000)) {
      size=1000;
    } else if ((windowWidth > 1000) && (windowWidth < 1200)) {
      size=1200;
    } else if ((windowWidth > 1200) && (windowWidth < 1600)) {
      size=1600;
    } else if (windowWidth > 1600) {
      size=2000;
    }

    $(coverWrapper).addClass('height-' + data[size].imgHeight);
    $(photoWrapper).css('background-image', 'url(' + data[size].normal + ')').addClass('height-' + data[size].imgHeight);
    $(blurWrapper).css('background-image', 'url(' + data[size].blurred + ')').addClass('height-' + data[size].imgHeight);

    // # Add sitewide banner to the pages
    //var forskningsdagene = '';
    //if (!$('#main[data-page-category="homepage"]').length) {
    //  forskningsdagene = '<a id="banner-forskningsdagene" href="http://hiof.no/forskning/forskningsdagene"><img src="/assets/plugins/cover-content/images/gfx/forskningsdagene-logo.svg"/></a>';
    //}

    $(coverWrapper).append(photoWrapper).append(blurWrapper);

    $('#main').prepend(coverWrapper);


  }

  //quotes(quoteId) {
  //
  //  $.getJSON("/assets/js/data/quotes.json", function(data) {
  //    var randomEntry = data.quotes[Math.floor(Math.random() * data.quotes.length)];
  //
  //    if (randomEntry.id == quoteId) {
  //      randomEntry.id--;
  //      if (randomEntry.id == "0") {
  //        randomEntry.id = "3";
  //      }
  //    }
  //    var quote = '<blockquote class="cover-quote" data-id="' + randomEntry.id + '""><a href="' + randomEntry.url + '"><p>&ldquo;' + randomEntry.text + '&rdquo;</p><footer><cite>- ' + randomEntry.cite + '</cite></footer></a></blockquote>';
  //    $('#content').append(quote);
  //    $('.cover-quote').fadeIn("slow");
  //  });
  //}

  getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }




};


(function(Hiof, undefined) {

  // On load
  $(function() {

    let coverContent = new CoverContent();

    // Expose functions to the window
    //window.Hiof.catalogQuotes = coverContent.quotes;

    var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);

    // Cover content initiater
    coverContent.addCoverContentToPage();


    $(window).resize(function() {
      $('#cover').css('height', $('.cover-photo-bg').height() + 'px');
    });
    // Cover quote initiater
    //if ($('#studie').length) {
    //  $("html").addClass("quote");
    //}
    //// Check if the page should use quotes
    //if ($('html.quote').length) {
    //  // Add Quotes
    //  coverContent.quotes();
    //  // Refresh Quotes
    //  window.setInterval(function() {
    //    $(".cover-quote").fadeOut(500, function() {
    //      var quoteId = $(this).data("id");
    //      //console.log(quoteId);
    //      $(this).remove();
    //      coverContent.quotes(quoteId);
    //    });
    //  }, 100000);
    //}
    $(window).scroll(function() {
      if ((Hiof.Options.distanceToTop === 0) || (Hiof.Options.distanceToTop < 0)) {
        $(".cover-quote").css("opacity", 100);
      } else {
        $(".cover-quote").css("opacity", (100 / (Hiof.Options.distanceToTop * 2)));
      }
    });
  });

})(window.Hiof = window.Hiof || {});
