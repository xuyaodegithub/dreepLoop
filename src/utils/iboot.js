/**暂时无用  横向破瀑流插件
 *  Jquery.Iboot.js V1.0.0
 *  Create on 2018年10月12日15:33:08
 *  Author: jon-millent
 *  Github: https://github.com/Jon-Millent/iboot
 *  Protocol: MIT
 */
(function ($, root) {

  function Iboot(ele, config) {
    this.ele = $(ele)
    this.eleWidth = this.ele.width()
    this.config = $.extend({
      baseHeight: 300, // 基准高度
      mediaBaseHeight: [ //响应式基准高度
      ],
      list: [
        {
          src: '',
          alt: 'xxx'
        }
      ],
      template: function (dom) {
        return dom
      },
      scrollBox: $(document.body),

      afterLoad: function () {

      },

      beforeLoad: function () {

      }
    }, config)

    this.innerData = {
      nowItemWidth: 0, //现在的增加长度
      appendDoms:[],
      scrollBoxData: {

      },
      saveDom: Array.from({length:config.list.length},v=>v=''),
      groupid: 0
    }
  }

  Iboot.prototype.init = function(){
    var _this = this

    this.beforeLoad()
    this.loader(this.config.list, function (cp, img,i) {
      _this.render(cp, img,i)
    }, function (cp, img, error) {

    }, function () {
      _this.afterLoad()
    })

    return this
  }

  Iboot.prototype.beforeLoad = function(){
    this.innerData.scrollBoxData.overflowY = this.config.scrollBox.css('overflow-y')
    this.config.scrollBox.css('overflow-y', 'scroll')
    this.config.beforeLoad()
  }

  Iboot.prototype.afterLoad = function(){
    this.config.scrollBox.css('overflow-y', this.innerData.scrollBoxData.overflowY)
    this.innerData.nowItemWidth = 0
    this.innerData.appendDoms = []
    this.innerData.groupid = 0

    // 隐藏没有group id 的
    // $.each(this.innerData.saveDom, function (k, v) {
    //   var data = $(v).attr('group')
    //   if(!data) {
    //     $(v).hide()
    //   }
    // })

    this.config.afterLoad()
  }

  Iboot.prototype.template = function(src, alt,id){
    var item = $('<div class="iboot-item" style="margin: 5px"></div>');
    item.append(
      $(`<a href="detail.html#/"><img src="${src}" alt="${alt}" style="width: 100%;height: auto;"></a>`)
    );
    return this.config.template(
      item
    )
  }

  Iboot.prototype.render = function(cp, img,k){

    var _this = this
    var dom = this.template(cp.src, cp.alt,cp.id)

    var scale = img.width / img.height

    dom.attr({
      'data-rew': img.width,
      'data-reh': img.height,
      'data-scale': scale
    })

    var comp = {//初始item宽高
      width: scale * this.config.baseHeight,
      height: this.config.baseHeight,
    }

    this.innerData.nowItemWidth += comp.width
    this.innerData.appendDoms.push(dom)
    this.innerData.saveDom[k]=dom

    dom.css({
      height: comp.height,
      width: comp.width
    })

    this.ele.append(dom)//容器元素
    // _this.ele.find('.iboot-item').eq(k).replaceWith(dom);
    var compW = this.innerData.nowItemWidth - this.ele.width()

    if(compW > 0) {
      // console.log(k,this.innerData.nowItemWidth,this.ele.width(),this.innerData.appendDoms)
      // 超出大小整体缩放
      var nowScale = this.innerData.nowItemWidth / this.getMediaHeight()

      var scaleHeight = (this.ele.width()-this.innerData.appendDoms.length*10) / nowScale

      // 整体缩放
      $.each(this.innerData.appendDoms, function (i, v) {
        var data = $(v).data()
        $(v).css({
          height: scaleHeight,
          width:  parseInt(data.scale * scaleHeight)
        })
        $(v).attr('group', _this.innerData.groupid)

      })

      this.innerData.nowItemWidth = 0
      this.innerData.appendDoms = []
      this.innerData.groupid++
    }

  }

  Iboot.prototype.loader = function(list, success, error, done){
    var now = 0;
    $.each(list, function (i, v) {
      (function (i, v) {
        var img = new Image()
        img.onload = function () {
          success(v, img,i)
          now++
          if(now === list.length) {
            done()
          }
        }
        img.onerror = function (err) {
          error(v, img, err)
          now++
          if(now === list.length) {
            done()
          }
        }
        img.src = v.src
        img.alt = v.alt
        img.id=v.id
      })(i, v);
    })
  }

  Iboot.prototype.getMediaHeight = function(){
    return this.config.baseHeight
  }

  Iboot.prototype.resize = function(){
    this.ele.empty()
    var baseHeight = this.getMediaHeight()
    var _this = this
    // console.log(this.innerData.saveDom)
    $.each(this.innerData.saveDom, function (i, v) {
      _this.ele.append($(v))
      // 首先删除所有的group id
      $.each(_this.innerData.appendDoms, function (i, v) {
        $(v).removeAttr('group')
        $(v).show()
      })

      var data = $(v).data()
      var cof = {
        height: baseHeight,
        width: baseHeight * data.scale
      }
      _this.innerData.appendDoms.push(v)
      _this.innerData.nowItemWidth += cof.width

      var compW = _this.innerData.nowItemWidth - _this.ele.width()

      if(compW > 0) {

        // 超出大小整体缩放
        var nowScale = _this.innerData.nowItemWidth / _this.getMediaHeight()

        var scaleHeight = (_this.ele.width()-_this.innerData.appendDoms.length*10) / nowScale

        $.each(_this.innerData.appendDoms, function (i, v) {
          var data = $(v).data()

          $(v).css({
            height: scaleHeight,
            width: parseInt(data.scale * scaleHeight)
          })

          $(v).attr('group', _this.innerData.groupid)

        })

        _this.innerData.nowItemWidth = 0
        _this.innerData.appendDoms = []
        _this.innerData.groupid++
      }


    })

    _this.innerData.nowItemWidth = 0
    _this.innerData.appendDoms = []
    _this.innerData.groupid = 0

    // // 隐藏没有group id 的
    // $.each(this.innerData.saveDom, function (k, v) {
    //   var data = $(v).attr('group')
    //   if(!data) {
    //     $(v).hide()
    //   }
    // })

  }

  Iboot.prototype.loadMore = function(list){
    var _this = this

    // 把上次隐藏的加进去
    var coc = []
    $.each(this.innerData.saveDom, function (i, v) {
      var data = $(v).attr('group')
      if(!data) {
        if(!v) {
          return
        }
        var img = $(v).find('img')
        coc.push({
          src: img.attr('src'),
          alt: img.attr('alt'),
        })
        _this.innerData.saveDom.splice(i, 1)
      }
    })

    list = coc.concat(list)

    this.beforeLoad()
    this.loader(list, function (cp, img) {
      _this.render(cp, img)
    }, function (cp, img, error) {

    }, function () {
      _this.afterLoad()
    })
  }

  root.Iboot = function(ele, config){
    return new Iboot(ele, config).init();
  }


})(jQuery, window);
