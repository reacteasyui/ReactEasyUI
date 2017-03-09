;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="re-site-icon-pc" viewBox="0 0 1000 1000">' +
    '' +
    '<path d="M893.305 207.849h-787.5c-23.316 0-42.188 18.872-42.188 42.188v562.5c0 23.287 18.872 42.188 42.188 42.188h267.188v70.313l-56.25 56.25v14.063h365.625v-14.063l-56.25-56.25v-70.313h267.188c23.287 0 42.188-18.9 42.188-42.188v-562.5c0-23.316-18.9-42.188-42.188-42.188zM879.243 742.224h-759.375v-478.125h759.375v478.125z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="re-site-icon-mobile" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M665.348 19.993h-306.709c-50.078 0-84.487 33.75-84.487 82.902v828.879c0 49.095 34.409 82.902 84.487 82.902h306.709c50.078 0 84.515-33.806 84.515-82.902v-828.865c0-49.152-34.437-82.902-84.515-82.902zM465.036 93.679h90.771v18.404h-90.757v-18.404zM512 987.013c-21.911 0-37.551-15.332-37.551-36.822s15.643-36.822 37.551-36.822 37.566 15.332 37.566 36.822-15.655 36.822-37.566 36.822zM718.553 882.65h-409.993v-727.601h409.993v727.601z" fill="#333333" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="re-site-icon-towards-up" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M137.841 976.045c-20.526 14.175-29.468 6.918-19.892-16.101l375.622-902.294c9.573-23.026 25.534-23.137 35.428-0.252l391.121 904.167c9.895 22.886 0.684 30.837-20.493 17.659l-364.561-226.89c-21.177-13.177-55.293-12.369-75.818 1.805l-321.41 221.905z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="re-site-icon-point-right" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M337.366 929.963l421.629-421.622-421.628-421.628-50.595 50.597 371.031 371.031-371.031 371.031z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)