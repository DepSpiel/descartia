(function(){
  var w_width = window.innerWidth;
  var w_height = window.innerHeight;
  var offset;
  var y_max;
  var timestamp;
  var amplitude;
  var target;
  var timeConstant;
  var l_table_height;
  var debounceTimer;

  const l_table = document.getElementsByClassName('l-table')[0];
  const dummy_scroll = document.getElementsByClassName('dummy-scroll')[0];
  const scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';

  var Descartia = {
    start(){
      window.addEventListener('scroll',scrollfunction,{ passive: false });
      window.addEventListener('resize', resize_function_timer,false);
    },
    stop(){
      window.removeEventListener('scroll',scrollfunction);
    }
  };

  window.onbeforeunload = function(){
    //window.scrollTo(0,0);
  };
  window.onload = function(){
    //window.scrollTo(0,0);
    descartia_init();
    setTimeout(function(){
      l_scroll(window.pageYOffset);
      Descartia.start();
    },100);
  };

  function resize_function_timer(){
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
        descartia_resize();
    }, 100);
  }

  function scrollfunction(e){
    //e.preventDefault();
    var scrolled = window.pageYOffset;
    document.getElementById('scroll-value').innerHTML = scrolled;
    wheelScroll(e);
    //l_table.style.transform = 'translateY(-'+scrolled+'px)';
  }

  function descartia_init(){
    l_table_height = l_table.clientHeight;
    y_max = l_table_height - w_height;
    offset = 0;
    console.log('descartia.js executed');
    console.log(y_max);
    dummy_scroll.style.height = l_table_height+'px';
  }

  function descartia_resize(){
    w_width = window.innerWidth;
    w_height = window.innerHeight;
    l_table_height = l_table.clientHeight;
    dummy_scroll.style.height = l_table_height+'px';
    y_max = l_table_height - w_height;
    l_scroll(window.pageYOffset);
  }

  function l_scroll(y){
    offset = y;
    l_table.style.transform = 'translateY(-'+y+'px)';
  }

  function autoScroll() {
    var elapsed;

    if (amplitude) {
      elapsed = Date.now() - timestamp;
      var delta = -amplitude * Math.exp(-elapsed / timeConstant);
      if (delta > 1 || delta < -1) {
        l_scroll(target + delta);
        window.requestAnimationFrame(autoScroll);
      } else {
        l_scroll(target);

      }
    }
  };

  function wheelScroll(e) {
    timestamp = Date.now();
    timeConstant = 120;
    target = window.pageYOffset;
    if(target < 0){
      target = 0;
    }
    amplitude = target - offset;
    window.requestAnimationFrame(autoScroll);
  };


}());
