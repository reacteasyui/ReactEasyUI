;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-shouji1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M665.348 14.659h-306.709c-50.078 0-84.487 33.75-84.487 82.902v828.879c0 49.096 34.409 82.902 84.487 82.902h306.709c50.078 0 84.515-33.806 84.515-82.902v-828.865c0-49.152-34.437-82.902-84.515-82.902zM465.036 88.345h90.771v18.404h-90.757v-18.404zM512 981.679c-21.911 0-37.551-15.332-37.551-36.822s15.641-36.822 37.551-36.822 37.565 15.332 37.565 36.822-15.655 36.822-37.565 36.822zM718.553 877.316h-409.993v-727.601h409.993v727.601z" fill="#333333" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-search" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M950.15 908.197L679.876 636.272c50.381-60.328 80.712-137.98 80.712-222.724 0-192.032-155.672-347.704-347.72-347.704-192.031 0-347.703 155.671-347.703 347.704 0 192.032 155.673 347.704 347.704 347.704 87.265 0 167.015-32.148 228.067-85.24L910.801 947.54c10.864 10.865 28.482 10.865 39.348 0 10.853-10.867 10.853-28.476 0-39.342zM412.87 706.079c-161.554 0-292.531-130.97-292.531-292.532 0-161.56 130.977-292.534 292.53-292.534 161.58 0 292.56 130.973 292.56 292.534 0 161.561-130.98 292.532-292.56 292.532z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-towards-up" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M137.841 981.378c-20.526 14.175-29.468 6.919-19.892-16.101l375.622-902.294c9.573-23.026 25.534-23.137 35.428-0.252l391.121 904.167c9.895 22.886 0.685 30.837-20.493 17.659l-364.561-226.89c-21.177-13.177-55.293-12.369-75.818 1.805l-321.41 221.905z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-point-left" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M684.252 116.96l-395.277 395.273 395.276 395.276 47.434-47.435-347.842-347.842 347.842-347.842z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-point-right" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M339.748 907.040l395.277-395.271-395.276-395.276-47.433 47.435 347.842 347.842-347.842 347.842z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-triangle-down" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M879.206 301.466l-379.153 455.339-379.221-455.339z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-checked" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M511.38 63.974c-247.396 0-447.952 200.555-447.952 447.952S263.984 959.88 511.38 959.88c247.398 0 447.953-200.555 447.953-447.953S758.778 63.974 511.38 63.974zM760.632 388.57L465.707 683.497c-6.656 6.655-15.382 9.984-24.107 9.984s-17.45-3.329-24.107-9.984L262.131 528.132c-13.317-13.31-13.317-34.9 0-48.21 13.314-13.318 34.9-13.318 48.214 0L441.6 611.177l270.817-270.818c13.315-13.318 34.9-13.318 48.215 0 13.314 13.31 13.314 34.9 0 48.21z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-triangle-up" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M144.794 722.534l379.153-455.339 379.221 455.339z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-unchecked" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M511.951 983.663c-260.058 0-471.611-211.58-471.611-471.659 0-260.086 211.556-471.664 471.611-471.664 260.111 0 471.711 211.578 471.711 471.664C983.663 772.082 772.062 983.663 511.951 983.663L511.951 983.663 511.951 983.663zM511.951 89.99C279.276 89.99 89.99 279.301 89.99 512.004c0 232.698 189.286 422.014 421.961 422.014 232.731 0 422.066-189.315 422.066-422.014C934.017 279.298 744.682 89.99 511.951 89.99L511.951 89.99z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-corner-checked" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M927.0784 15.6544 84.0448 15.6544c-23.7568 0-77.696 0-77.696 0l0 0 998.4 998.4 0 0c0 0 0-53.8752 0-75.1488L1004.7488 90.8032C1004.7488 49.2928 969.9712 15.6544 927.0784 15.6544zM678.4384 483.328l-0.3072-0.256-0.1792 0.256L492.7488 342.2336l50.8032-66.688 118.8224 90.5216 151.1168-214.3744 66.7008 50.8032L678.4384 483.328z"  ></path>' +
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