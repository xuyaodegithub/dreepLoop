function RadialGradient() {//渐变方法
    this.Colors = ['#fff', '#333'];
    this.can = document.createElement( 'canvas' );
    this.canTxt = this.can.getContext( '2d' );
    this.downtype = 'image/png'
    this.init = function (data, callback) {//canvas  渐变颜色 图片对象 cans宽 cans高 画图起点 画图宽高 导出图片类型
        var colors = data.colorStr ? data.colorStr.split( ',' ) : this.Colors,
            downType = data.downtype || this.downtype;
        this.can.width = data.w;
        this.can.height = data.h;
        var gradient = this.canTxt.createRadialGradient( data.w / 2, data.h / 2, 0, data.w / 2, data.h / 2, data.h / 2 );
        gradient.addColorStop( 0, colors[0] );
        gradient.addColorStop( 1, colors[1] );
        this.canTxt.fillStyle = gradient;
        this.canTxt.fillRect( 0, 0, data.w, data.h )
        this.canTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih )
        if (callback) callback( this.can );
        else return this.can.toDataURL( downType )
    }
}

function ThreeShow() {//分影效果
    this.Colors = "#000";
    this.can = document.createElement( 'canvas' );
    this.canTxt = this.can.getContext( '2d' );
    this.downtype = 'image/png';
    this.init = function (data, callback) {//canvas  背景色  渐变颜色 图片对象 cans宽 cans高 画图起点 画图宽高 头部大小 导出图片类型
        var colors = data.color || this.Colors, downType = data.downtype || this.downtype;
        this.can.width = data.w;
        this.can.height = data.h;
        // for (var a = 0; a < ih; a++) {
        //     for (var b = 0; b < iw; b++) {
        //         var pixel = (a * iw + b) * 4;
        //         if (imgData.data[pixel + 3] != 0) {
        //             // imgData.data[pixel] = 0;
        //             // imgData.data[pixel + 1] = 0;
        //             // imgData.data[pixel + 2] = 0;
        //             imgData.data[pixel + 3] = (1 - 0.9)  * imgData.data[pixel + 3];
        //         }
        //     }
        // }
        this.canTxt.fillStyle = colors;
        this.canTxt.fillRect( 0, 0, data.w, data.h );
        this.canTxt.globalAlpha = 0.4;//设置透明度
        this.canTxt.drawImage( data.imgObj, data.x - data.headw, data.y, data.iw, data.ih );
        this.canTxt.drawImage( data.imgObj, data.x + data.headw, data.y, data.iw, data.ih );
        this.canTxt.globalAlpha = 1;
        this.canTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        if (callback) callback( this.can );
        else return this.can.toDataURL( downType )
    }
}

function AddPhotoFrame() {//加相框效果
    this.Colors = "#fff";
    this.backcolor = "#fff";
    this.size = 10;
    this.can = document.createElement( 'canvas' );
    this.canTxt = this.can.getContext( '2d' );
    this.downtype = 'image/png';
    this.init = function (data, callback) {//canvas  背景色  渐变颜色 图片对象 cans宽 cans高 画图起点 画图宽高 相框粗细 背景颜色 相框颜色 导出图片类型
        var colors = data.color || this.Colors, downType = data.downtype || this.downtype,
            bcolor = data.bColor || this.backcolor,
            sizes = data.size || this.size;
        this.can.width = data.w;
        this.can.height = data.h;
        this.canTxt.fillStyle = bcolor;
        this.canTxt.fillRect( 0, 0, data.w, data.h );
        this.canTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        this.canTxt.strokeStyle = colors;
        this.canTxt.lineWidth = sizes;
        this.canTxt.beginPath();
        this.canTxt.moveTo( 1 / 7 * data.w, data.iheight + sizes * 1.5 );
        this.canTxt.lineTo( 6 / 7 * data.w, data.iheight + sizes * 1.5 );
        this.canTxt.lineTo( 6 / 7 * data.w, data.iheight + sizes * 1.5 + 0.76 * data.h );
        this.canTxt.lineTo( 1 / 7 * data.w, data.iheight + sizes * 1.5 + 0.76 * data.h );
        this.canTxt.closePath();
        this.canTxt.stroke();
        this.canTxt.save();
        this.canTxt.lineWidth = 1;
        this.canTxt.beginPath();
        this.canTxt.moveTo( 0, 0 );
        this.canTxt.lineTo( data.w, 0 );
        this.canTxt.lineTo( data.w, data.iheight + sizes * 1.5 * 1.5 );
        this.canTxt.lineTo( 0, data.iheight + sizes * 1.5 * 1.5 );
        this.canTxt.closePath();
        this.canTxt.clip()
        this.canTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        this.canTxt.restore();
        if (callback) callback( this.can );
        else return this.can.toDataURL( downType )
    }

}

function AddBuddhaLight() {//加佛光
    this.upColor = "#fff";
    this.can = document.createElement( 'canvas' );
    this.canTxt = this.can.getContext( '2d' );
    this.downtype = 'image/png';
    this.init = function (data, callback) {//canvas  背景色  渐变颜色 图片对象 cans宽 cans高 画图起点 画图宽高 头部大小 导出图片类型
        var icolor = data.upColor || this.upColor, colors = colorRgb( icolor ),
            downType = data.downtype || this.downtype,
            can2 = document.createElement( 'canvas' ), can2Txt = can2.getContext( '2d' ), oImg = new Image(),
            _self = this;
        this.can.width = data.w;
        this.can.height = data.h;
        can2.width = data.w;
        can2.height = data.h;
        this.canTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        var imgData = this.canTxt.getImageData( 0, 0, data.w, data.h )
        for (var a = 0; a < data.h; a++) {
            for (var b = 0; b < data.w; b++) {
                var pixel = (a * data.w + b) * 4;
                if (imgData.data[pixel + 3] != 0) {
                    imgData.data[pixel] = colors[0];
                    imgData.data[pixel + 1] = colors[1];
                    imgData.data[pixel + 2] = colors[2];
                    imgData.data[pixel + 3] = 0.3 * imgData.data[pixel + 3];
                }
            }
        }
        // this.canTxt.clearRect(0,0,w,h);
        can2Txt.putImageData( imgData, 0, 0 );
        oImg.crossOrigin = '';
        oImg.onload = function () {
            initBgimg( oImg, _self.can, _self.canTxt );
            _self.canTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
            _self.canTxt.drawImage( can2, 0, 0 );
            if (callback) callback( _self.can );
            else return _self.can.toDataURL( downType )
        };
        oImg.src = addUrlQuery( data.backUrl );
    }
}

function AddArc() {//圈内出人
    this.color = "#fff";
    this.bcolor = "#000";
    this.can = document.createElement( 'canvas' );
    this.canTxt = this.can.getContext( '2d' );
    this.downtype = 'image/png';
    this.init = function (data, callback) {//canvas  背景色  渐变颜色 图片对象 cans宽 cans高 画图起点 画图宽高 头部大小 导出图片类型
        var colors = data.colors ? data.colors.split( ',' ) : [this.color], downType = data.downtype || this.downtype,
            gradient2,
            bcolor = data.bcolor || this.bcolor;
        this.can.width = data.w;
        this.can.height = data.h;
        this.canTxt.fillStyle = bcolor;
        this.canTxt.fillRect( 0, 0, data.w, data.h )
        this.canTxt.save();
        this.canTxt.beginPath();
        this.canTxt.arc( data.w / 2, 2 / 3 * data.h, 6.5 / 15 * data.w, 0, Math.PI * 2 );
        this.canTxt.clip();
        if (colors.length > 1) {
            gradient2 = this.canTxt.createLinearGradient( 0, 2 / 3 * data.h - 6.5 / 15 * data.w, data.w, 2 / 3 * data.h + 6.5 / 15 * data.w );
            gradient2.addColorStop( 0, colors[0] );
            gradient2.addColorStop( 1, colors[1] );
        } else gradient2 = colors[0]
        this.canTxt.fillStyle = gradient2;
        this.canTxt.fillRect( 0, 0, data.w, data.h );
        this.canTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        this.canTxt.restore();
        this.canTxt.save();
        this.canTxt.beginPath();
        this.canTxt.rect( 0, 0, data.w, 2 / 3 * data.h );
        this.canTxt.clip()
        this.canTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        this.canTxt.restore()
        if (callback) callback( this.can );
        else return this.can.toDataURL( downType )
    }
}

function AddBackgroundImage() {//加背景图
    this.can = document.createElement( 'canvas' );
    this.canTxt = this.can.getContext( '2d' );
    this.downtype = 'image/png';
    this.init = function (data, callback, k) {//canvas  渐变颜色 图片对象 cans宽 cans高 画图起点 画图宽高 导出图片类型
        var backs = (data.backStr).split( ',' ), downType = data.downtype || this.downtype, oImg = new Image(),
            one = false, two = false, oImg2 = new Image(), _self = this;
        oImg.crossOrigin = '';
        oImg2.crossOrigin = '';
        this.can.width = data.w;
        this.can.height = data.h;
        oImg.onload = function () {
            one = true;
            initBgimg( oImg, _self.can, _self.canTxt );
            _self.canTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
            if (backs.length > 1 && two) {
                initBgimg( oImg2, _self.can, _self.canTxt )
                if (callback) callback( _self.can );
                else return _self.can.toDataURL( downType )
            } else if (backs.length < 2) {
                if (callback) callback( _self.can );
                else return _self.can.toDataURL( downType )
            }
        }
        oImg.src = addUrlQuery( backs[0] );
        if (backs.length > 1) {
            oImg2.onload = function () {
                two = true;
                if (one) {
                    initBgimg( oImg2, _self.can, _self.canTxt )
                    if (callback) callback( _self.can );
                    else return _self.can.toDataURL( downType )
                }
            }
            oImg2.src = addUrlQuery( backs[1] );
        }
    }
}

function InvertedImage() {//倒影
    this.aph = 0.5;
    this.can = document.createElement( 'canvas' );
    this.canTxt = this.can.getContext( '2d' );
    this.downtype = 'image/png';
    this.init = function (data, k) {
        var downType = data.downtype || this.downtype, aph = data.aph || this.aph;
        console.log(aph)
        this.can.width = data.w;
        this.can.height = data.h;
        this.canTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        // this.canTxt.globalAlpha=aph;
        this.canTxt.save();
        this.canTxt.scale( 1, -1 );
        // this.canTxt.translate( data.w / 2 - data.x, data.h / 2 - data.y );
        // this.canTxt.rotate( 180 * Math.PI / 180 );
        // this.canTxt.translate( -(data.w - (data.w / 2 - data.x)), -(data.h - (data.h / 2 - data.y)) );
        this.canTxt.drawImage( data.imgObj, data.x, -(data.h / 2 + data.afterP.h / 2 - (data.ih - data.afterP.y - data.afterP.h)), data.iw, -data.ih );//y轴翻转  需要计算一下
        // this.canTxt.setTransform( 1, 0, 0, 1, 0, 0 );
        this.canTxt.restore();
        var dataImag = this.canTxt.getImageData( 0, 0, data.w, data.h ), t = parseInt( data.afterP.h / 2 + data.h / 2 );
        for (var a = t - t % 4; a < data.h; a++) {
            for (var b = 0; b < data.w; b++) {
                var pixel = (a * data.w + b) * 4;
                if (dataImag.data[pixel + 3] != 0) {
                    // imgData.data[pixel] = colors[0];
                    // imgData.data[pixel + 1] = colors[1];
                    // imgData.data[pixel + 2] = colors[2];
                    aph = (data.h - a) / (data.h - (t + (4 - t % 4))) * data.aph;
                    dataImag.data[pixel + 3] = aph * dataImag.data[pixel + 3];
                }
            }
        }
        this.canTxt.putImageData( dataImag, 0, 0 )
        return k ? this.can : this.can.toDataURL( downType );
    }
}

function ContactShadow() {//接触阴影
    this.aph = 0.5;
    this.shadow = 50;
    this.can = document.createElement( 'canvas' );
    this.canTxt = this.can.getContext( '2d' );
    this.downtype = 'image/png';
    this.init = function (data,k) {
        var downType = data.downtype || this.downtype, aph = data.aph || this.aph, shadow = data.shadow || this.shadow;
        this.can.width = data.w;
        this.can.height = data.h;
        this.canTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        this.canTxt.save();
        this.canTxt.scale( 1, -1 );
        this.canTxt.drawImage( data.imgObj, data.x, -(data.h / 2 + data.afterP.h / 2 - (data.ih - data.afterP.y - data.afterP.h)), data.iw, -data.ih );//y轴翻转  需要计算一下
        this.canTxt.restore();
        var dataImag = this.canTxt.getImageData( 0, 0, data.w, data.h ), t = parseInt( data.afterP.h / 2 + data.h / 2 );
        for (var a = t - t % 4; a < data.h; a++) {
            for (var b = 0; b < data.w; b++) {
                var pixel = (a * data.w + b) * 4;
                if (dataImag.data[pixel + 3] != 0) {
                    dataImag.data[pixel] = 0;
                    dataImag.data[pixel + 1] = 0;
                    dataImag.data[pixel + 2] = 0;
                    aph = (data.h - a) / (data.h - (t + (4 - t % 4))) * data.aph;
                    dataImag.data[pixel + 3] = aph * dataImag.data[pixel + 3];
                }
            }
        }
        // if (shadow > 0) StackBlur.imageDataRGBA( dataImag, 0, t - t % 4, dataImag.width, dataImag.height, shadow );
        this.canTxt.putImageData( dataImag, 0, 0 )
        return k ? this.can : this.can.toDataURL( downType );
    }
}

function ResliderVal() {//悬浮投影
    this.oCan = document.createElement( 'canvas' );
    this.oCanTxt = this.oCan.getContext( '2d' );
    this.ydistance = 0;//距离
    this.xdistance = 0;//距离
    this.aph = 1;//透明度  0-1
    this.shadow = 0;//模糊度 0-100
    this.color = [0, 0, 0];
    this.downtype = 'image/png';
    this.init = function (data,k) {
        var aph = data.aph || this.aph, ydistance = data.ydistance || this.ydistance,
            xdistance = data.xdistance || this.xdistance, shadow = data.shadow || this.shadow,
            downType = data.downtype || this.downtype, color = data.color ? colorRgb( data.color ) : this.color;
        this.oCan.width = data.w;
        this.oCan.height = data.h;
        this.oCanTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        var imgData = this.oCanTxt.getImageData( 0, 0, this.oCan.width, this.oCan.height );
        for (var y = 0; y < data.h; y++) {
            for (var x = 0; x < data.w; x++) {
                var pixel = (y * data.w + x) * 4;
                if (imgData.data[pixel + 3] != 0) {
                    imgData.data[pixel] = color[0];
                    imgData.data[pixel + 1] = color[1];
                    imgData.data[pixel + 2] = color[2];
                    if (aph < 1) imgData.data[pixel + 3] = (1 - aph) * imgData.data[pixel + 3];
                }
            }
        }
        if (shadow > 0) StackBlur.imageDataRGBA( imgData, 0, 0, imgData.width, imgData.height, shadow );
        this.oCanTxt.clearRect( 0, 0, data.w, data.h );
        this.oCanTxt.putImageData( imgData, xdistance, ydistance );
        this.oCanTxt.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        return k ? this.oCan : this.oCan.toDataURL( downType );
    }
}

function setBorder() {//描边效果
    this.canvas = document.createElement( 'canvas' );
    this.ctx = this.canvas.getContext( '2d' )
    this.tempCanvas = document.createElement( 'canvas' );
    this.downtype = 'image/png';
    this.removeTransparency = (canvas) => {
        var ctx = canvas.getContext( '2d' );
        var imageData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
        var nPixels = imageData.data.length;
        for (var i = 3; i < nPixels; i += 4) {
            if (imageData.data[i] > 0) {
                imageData.data[i] = 255;
            }
        }
        ctx.clearRect( 0, 0, canvas.width, canvas.height );
        ctx.putImageData( imageData, 0, 0 );
        return canvas;
    }

    this.init = (data,k) => {
        // var size = this.getAttr('borderSize') || 0;
        // - first set correct dimensions for canvases
        this.canvas.width = data.w;
        this.canvas.height = data.h;
        this.ctx.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        var imageData = this.ctx.getImageData( 0, 0, data.w, data.h ), nPixels = imageData.data.length,downType = data.downtype || this.downtype;
        this.tempCanvas.width = imageData.width;
        this.tempCanvas.height = imageData.height;
        // - the draw original shape into temp canvas
        this.tempCanvas.getContext( '2d' ).putImageData( imageData, 0, 0 );
        // - then we need to remove alpha chanel, because it will affect shadow (transparent shapes has smaller shadow)
        this.removeTransparency( this.tempCanvas );
        // var color = this.getAttr('borderColor') || 'black';
        // 3. we will use shadow as border
        // so we just need apply shadow on the original image
        this.ctx.save();
        this.ctx.shadowColor = data.color;
        this.ctx.shadowBlur = data.size;
        this.ctx.drawImage( this.tempCanvas, 0, 0 );
        this.ctx.restore();
        // - Then we will dive in into image data of [original image + shadow]
        // and remove transparency from shadow
        var tempImageData = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height );
        var SMOOTH_MIN_THRESHOLD = 3;
        var SMOOTH_MAX_THRESHOLD = 10;
        let val, hasValue;
        var offset = 3;
        for (var i = 3; i < nPixels; i += 4) {
            // skip opaque pixels
            if (imageData.data[i] === 255) {
                continue;
            }
            val = tempImageData.data[i];
            hasValue = val !== 0;
            if (!hasValue) {
                continue;
            }
            if (val > SMOOTH_MAX_THRESHOLD) {
                val = 255;
            } else if (val < SMOOTH_MIN_THRESHOLD) {
                val = 0;
            } else {
                val =
                    ((val - SMOOTH_MIN_THRESHOLD) /
                        (SMOOTH_MAX_THRESHOLD - SMOOTH_MIN_THRESHOLD)) *
                    255;
            }
            tempImageData.data[i] = val;
        }
        // draw resulted image (original + shadow without opacity) into canvas
        this.ctx.putImageData( tempImageData, 0, 0 );
        // then fill whole image with color (after that shadow is colored)
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'source-in';
        this.ctx.fillStyle = data.color;
        this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );
        this.ctx.restore();
        // then we need to copy colored shadow into original imageData
        var newImageData = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height );
        var indexesToProcess = [];
        for (var i = 3; i < nPixels; i += 4) {
            var hasTransparentOnTop =
                imageData.data[i - imageData.width * 4 * offset] === 0;
            var hasTransparentOnTopRight =
                imageData.data[i - (imageData.width * 4 + 4) * offset] === 0;
            var hasTransparentOnTopLeft =
                imageData.data[i - (imageData.width * 4 - 4) * offset] === 0;
            var hasTransparentOnRight = imageData.data[i + 4 * offset] === 0;
            var hasTransparentOnLeft = imageData.data[i - 4 * offset] === 0;
            var hasTransparentOnBottom =
                imageData.data[i + imageData.width * 4 * offset] === 0;
            var hasTransparentOnBottomRight =
                imageData.data[i + (imageData.width * 4 + 4) * offset] === 0;
            var hasTransparentOnBottomLeft =
                imageData.data[i + (imageData.width * 4 - 4) * offset] === 0;
            var hasTransparentAround =
                hasTransparentOnTop ||
                hasTransparentOnRight ||
                hasTransparentOnLeft ||
                hasTransparentOnBottom ||
                hasTransparentOnTopRight ||
                hasTransparentOnTopLeft ||
                hasTransparentOnBottomRight ||
                hasTransparentOnBottomLeft;
            // if pixel presented in original image - skip it
            // because we need to change only shadow area
            if (
                imageData.data[i] === 255 ||
                (imageData.data[i] && !hasTransparentAround)
            ) {
                continue;
            }
            if (!newImageData.data[i]) {
                // skip transparent pixels
                continue;
            }
            indexesToProcess.push( i );
        }
        for (var index = 0; index < indexesToProcess.length; index += 1) {
            var i = indexesToProcess[index];

            var alpha = imageData.data[i] / 255;

            if (alpha > 0 && alpha < 1) {
                var aa = 1 + 1;
            }
            imageData.data[i] = newImageData.data[i];
            imageData.data[i - 1] =
                newImageData.data[i - 1] * (1 - alpha) +
                imageData.data[i - 1] * alpha;
            imageData.data[i - 2] =
                newImageData.data[i - 2] * (1 - alpha) +
                imageData.data[i - 2] * alpha;
            imageData.data[i - 3] =
                newImageData.data[i - 3] * (1 - alpha) +
                imageData.data[i - 3] * alpha;

            if (newImageData.data[i] < 255 && alpha > 0) {
                var bb = 1 + 1;
            }
        }
        this.ctx.drawImage( data.imgObj, data.x, data.y, data.iw, data.ih );
        return k ? this.canvas : this.canvas.toDataURL( downType );
    }
}


function colorRgb(colors) {//16进制转rgb
    // 16进制颜色值的正则
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    var color = colors.toLowerCase();
    if (reg.test( color )) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
            var colorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                colorNew += color.slice( i, i + 1 ).concat( color.slice( i, i + 1 ) );
            }
            color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (var i = 1; i < 7; i += 2) {
            colorChange.push( parseInt( "0x" + color.slice( i, i + 2 ) ) );
        }
        return colorChange;
    } else {
        return color;
    }
}

function initBgimg(bg_img, cans, ctx) {//生成背景通用方法
    var oBg = bg_img, can = cans;
    var h = can.width * oBg.height / oBg.width;
    var w = can.height * oBg.width / oBg.height;
    // console.log( h, can.width, can.height, oBg.width, oBg.height );
    if (h > can.height) {
        var bh = ((h - can.height) / 2) * oBg.height / h;
        ctx.drawImage( oBg, 0, bh, oBg.width, oBg.height - 2 * bh, 0, 0, can.width, can.height );
    } else {
        var bw = ((w - can.width) / 2) * oBg.width / w;
        ctx.drawImage( oBg, bw, 0, oBg.width - 2 * bw, oBg.height, 0, 0, can.width, can.height );
    }
}

function upbymobile(k) {
    token = localStorage.getItem( 'user_Token' )
    if (!token) {
        showloginDialog();
        return;
    }
    uptype = 2;//记录上传方式
    $.ajax( {
        url: baseUrl + '/oss/newUploadTask',
        type: 'get',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        headers: {token: token},
        data: {},
        success: function (res) {
            if (!res.code) {
                taskFlag = res.data;
                qrcode.makeCode( urlhref + "/uploadBymobile.html?taskFlag=" + res.data );
                setDiog( 1 );
                lunxun()
            } else Notification( res.msg )
        }
    } )
}

function lunxun() {
    $.ajax( {
        url: baseUrl + '/oss/getUploadTask',
        type: 'get',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        headers: {token: token},
        data: {taskFlag: taskFlag},
        success: function (res) {
            if (!res.code) {
                if (res.data.status === 2) {
                    setDiog()
                    noBeautyResult = {};
                    BeautyResult = {};
                    dreepByurl( res.data.url );
                } else timer = setTimeout( lunxun, 2000 )
            } else Notification( res.msg )
        }
    } )
}

function setDiog(k) {
    clearTimeout( timer )
    if (k) {
        $( '.diglog' ).css( 'display', 'block' );
        $( '.zhezhao' ).css( 'display', 'block' );
    } else {
        $( '.diglog' ).css( 'display', 'none' );
        $( '.diglog2' ).css( 'display', 'none' );
        $( '.zhezhao' ).css( 'display', 'none' );
    }
}

function setLoading(k) {
    if (k) {
        $( '.loading' ).text( '处理中...' );
        $( '.loading' ).show();
        $( '.zhezhao' ).show();
    } else {
        $( '.loading' ).hide();
        $( '.zhezhao' ).hide();
    }
}

function loading(str) {
    $( '.loading' ).text( str );
    $( '.loading' ).show();
    setTimeout( function () {
        $( '.loading' ).text( '处理中...' );
        $( '.loading' ).hide();
        $( '.zhezhao' ).hide();
    }, 2000 )

}


function upLoadimg() {
    token = localStorage.getItem( 'user_Token' );
    if (!token) {
        showloginDialog();
        return;
    }
    uptype = 1;//记录上传方式
    $( '#upImg' ).val( '' );
    $( '#upImg' ).click();
}

function changeImg(e) {
    var file = e.target.files[0], formData = new FormData;
    formData.append( 'file', file );
    token = localStorage.getItem( 'user_Token' )
    $.ajax( {
        url: baseUrl + '/oss/upload',
        type: 'post',
        dataType: 'json',
        processData: false,
        contentType: false,
        xhrFields: {
            withCredentials: true
        },
        headers: {token: token},
        data: formData,
        success: function (res) {
            if (!res.code) {
                noBeautyResult = {};
                BeautyResult = {};
                dreepByurl( res.data );
            } else Notification( res.msg )
        }
    } )
}

function dreepByurl(url, id) {//抠图
    setLoading( 1 )
    token = localStorage.getItem( 'user_Token' );
    var data = {url: url, mattingType: mattingType}, cancal = $( '.swith' ).hasClass( 'cancal' );
    if (id) data.fileId = id;
    if (!cancal) data.faceBeauty = 1;
    $.ajax( {
        url: baseUrl + '/webMatting/mattingByUrl2',
        type: 'post',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        headers: {token: token},
        data: data,
        success: function (res) {
            if (!res.code) {
                mattingMsg.fileId = res.data.fileId;
                if (res.data.status === 'success') {
                    $( '.cList .its img' ).attr( 'src', 'http://www.picup.shop/img-static/img/loading.gif' );
                    mattingMsg = res.data;
                    mattingMsg.filename = [];
                    initDiv();
                    setTimeout( setLoading, 1000 );
                    $( 'body,html' ).animate( {scrollTop: 490}, 500 );
                } else {
                    $( '.loading' ).text( '当前排队位置' + res.data.queueNumber );
                    setTimeout( pollingImg, 2000 );
                }
            } else if (res.code === 4003) {
                showloginDialog();
                setLoading();
            } else if (res.code === 7002) {
                setLoading();
                $( '.zhezhao' ).show();
                $( '.diglog2' ).show();
            } else {
                setLoading();
                Notification( res.msg )
            }
        }
    } )
}

function pollingImg() {//轮训
    var data = {fileId: mattingMsg.fileId};
    $.ajax( {
        url: baseUrl + '/webMatting/getMattingInfo',
        type: 'get',
        dataType: 'json',
        headers: {token: token},
        data: data,
        success: function (res) {
            if (!res.code) {
                if (res.data.status === 'success') {
                    $( '.cList .its img' ).attr( 'src', res.data.bgRemovedPreview );
                    mattingMsg = res.data;
                    mattingMsg.filename = [];
                    initDiv();
                    setTimeout( setLoading, 1000 );
                    $( 'body,html' ).animate( {scrollTop: 490}, 500 );
                } else {
                    $( '.loading' ).text( '当前排队位置' + res.data.queueNumber )
                    setTimeout( pollingImg, 2000 )
                }
            } else Notification( res.msg )
        }
    } )
}

function reupload() {
    $( '.zhezhao' ).hide();
    $( '.diglog2' ).hide();
    if (uptype === 1) upLoadimg();
    else upbymobile()
}

function inithisList(k) {//初始化历史记录/webMatting/mattingHistory
    if (k) {
        page = 1;
        openScroll = true;
        $( '.hisList .list' ).html( '' );
    }
    var data = {page: page, pageSize: pageSize, mattingType:mattingType}, oDiv = $( '.hisList .list' );
    $.ajax( {
        url: baseUrl + '/webMatting/mattingHistory',
        type: 'get',
        dataType: 'json',
        headers: {token: token},
        data: data,
        success: function (res) {
            if (!res.code) {
                var resultList = Object.keys( res.data ), resultObj = res.data;
                if (resultList.length < 1 && page === 1) $( '.hisList h5' ).css( 'display', 'block' )
                else if (resultList.length > 0) {
                    resultList.map( function (it) {
                        var str = " <div class='hisItems'><h3>" + it + "</h3><div class='flex a-i f-w'>";
                        resultObj[it].map( function (itson) {
                            str += "<div class='itmes' oriUrl=" + itson.originalImage + " fileId='" + itson.id + "' onclick='showhisItem(this)'><img src='" + itson.originalImage + "' alt=''></div>";
                        } );
                        str += "</div></div>";
                        oDiv.append( $( str ) );
                    } )
                }
                if (resultList.reduce( function (pre, item, idx) {
                    return pre + resultObj[item].length
                }, 0 ) < 20) {
                    console.log( 1222 )
                    oDiv.append( $( '<p style="font-size: 12px;line-height: 36px;color: #9c9c9c;text-align: center;">已经到底啦！</p>' ) );
                    openScroll = false;
                }
            } else loading( res.msg )
        }
    } )
}

function scrollHis(e) {
    if (!openScroll) return;
    var scrollTop = e.target.scrollTop, h = document.querySelector( '.hisList .list' ).offsetHeight,
        sh = document.querySelector( '.hisList .list' ).scrollHeight;
    if (scrollTop + h > sh - 30) {
        page += 1;
        inithisList()
    }
}

function showHisList(k) {
    if (k) {
        $( '.hisList' ).css( 'display', 'block' )
        inithisList( 1 )
    } else $( '.hisList' ).css( 'display', 'none' )
}

function showhisItem(t) {
    var url = $( t ).attr( 'oriUrl' )
    var fileId = $( t ).attr( 'fileId' )
    dreepByurl( url, fileId )
}

document.addEventListener( 'click', function (e) {
    var ev = e || window.event;
    ev.stopPropagation();
    $( '.saveJpg' ).hide()
} )

function stopPrevent() {//拖拽上传方法
    var _self = this
    document.addEventListener( "drop", function (e) {  //拖离
        e.preventDefault();
    } );
    document.addEventListener( "dragleave", function (e) {  //拖后放
        e.preventDefault();
    } );
    document.addEventListener( "dragenter", function (e) {  //拖进
        e.preventDefault();
    } );
    document.addEventListener( "dragover", function (e) {  //拖来拖去
        e.preventDefault();
    } );
    var oDrops = document.getElementsByClassName( 'helloFirst' )[0];
    oDrops.addEventListener( "drop", function (e) {
        e.preventDefault();
        e.stopPropagation();
        // e.cancelable=true
        var files = e.dataTransfer.files;
        // console.log(files)
        if (!files.length) return;
        if (files.length > 1) {
            Notification( '请上传单张图片' )
            return
        }
        changeImg( {target: {files: [files[0]]}} )
    } )
}

function pasteTomatting() {//复制粘贴抠图
    document.addEventListener( 'paste', function (e) {
        var clipboardData = e.clipboardData,//谷歌
            i = 0,
            items, item, types;
        if (clipboardData) {
            items = clipboardData.items;
            if (!items) {
                return;
            }
            item = items[0];
            types = clipboardData.types || [];
            for (; i < types.length; i++) {
                if (types[i] === 'Files') {
                    item = items[i];
                    break;
                }
            }
            if (item && item.kind === 'string' && item.type.match( /^text\//i )) {
                dreepByurl( clipboardData.getData( "Text" ) )
            }
            if (item && item.kind === 'file' && item.type.match( /^image\//i )) {
                changeImg( {target: {files: [item.getAsFile()]}} )
            }
        }
    } )
}

function downLoad(item, e) {
    setLoading( 1 );
    var ev = e || window.event, oImg = new Image(),
        idx = $( item ).parents( '.its' ).parents( '.cu' ).index();
    ev.stopPropagation();
    oImg.crossOrigin = '';
    ev.stopPropagation();
    // downType = k ? 'image/jpeg' : 'image/png';
    token = localStorage.getItem( 'user_Token' );
    if (mattingMsg.fileId && !mattingMsg.oriMattingUrl) {
        $.ajax( {
            url: baseUrl + '/webMatting/getMattedImage',///poster/download
            type: 'get',
            dataType: 'json',
            headers: {token: token},
            data: {fileId: mattingMsg.fileId},
            success: function (res) {
                if (!res.code) {
                    initSmallTag( e, '次数 -1' );
                    mattingMsg.oriMattingUrl = res.data;
                    mattingMsg.filename.push( idx );
                    oImg.onload = function () {
                        classTypeDwon( oImg, item )
                    };
                    oImg.src = addUrlQuery( res.data );
                } else if (res.code === 1100) {
                    showloginDialog();
                    setLoading();
                } else if (res.code === 4001) {
                    confirm( res.msg + ', 是否前往充值?', '提示', {
                        confirmButtonText: '前往充值',
                        cancelButtonText: '取消',
                        type: 'warning'
                    } ).then( function () {
                        window.location.href = 'userVip.html'
                    } ).catch( function () {
                        setLoading();
                    } );
                } else Notification( res.msg )
            }
        } )
    } else if (!mattingMsg.fileId || mattingMsg.filename.indexOf( idx ) > -1) {
        initSmallTag( e, '免费' )
        oImg.onload = function () {
            classTypeDwon( oImg, item )
        };
        oImg.src = mattingMsg.oriMattingUrl ? addUrlQuery( mattingMsg.oriMattingUrl ) : addUrlQuery( mattingMsg.bgRemovedPreview );
    } else {
        $.ajax( {
            url: baseUrl + '/poster/download',
            type: 'get',
            dataType: 'json',
            headers: {token: token},
            data: {templateId: 1},
            success: function (res) {
                if (!res.code) {
                    initSmallTag( e, '次数 -1' );
                    mattingMsg.filename.push( idx );
                    oImg.onload = function () {
                        classTypeDwon( oImg, item )
                    };
                    oImg.src = addUrlQuery( mattingMsg.oriMattingUrl );
                } else if (res.code === 4001) {
                    confirm( res.msg + ', 是否前往充值?', '提示', {
                        confirmButtonText: '前往充值',
                        cancelButtonText: '取消',
                        type: 'warning'
                    } ).then( function () {
                        window.location.href = 'userVip.html'
                    } ).catch( function () {

                    } );
                } else Notification( res.msg )
            }
        } )
    }
}

function classTypeDwon(oImg, item) {
    var oItem = $( item ).parents( '.its' ), w = 900, h = 1275,
        name = $( oItem ).parents( '.cu' ).find( 'p' ).text(), type = $( oItem ).attr( 'type' ), data = {};
    var point = mattingMsg.maskRect, ow = mattingMsg.originalWidth, oh = mattingMsg.originalHeight;
    var downTop = h * 0.08, ih = (h - downTop) * oh / point.height, iw = ow * ih / oh, left = w / 2 - iw / 2;//
    var afterPoint = {x: iw * point.x / ow, y: ih * point.y / oh, w: iw * point.width / ow, h: ih * point.height / oh};
    downTop = downTop - afterPoint.y;
    if (afterPoint.w > w) {
        iw = (w * ow / point.width);
        ih = iw * oh / ow;
        left = 0;
        downTop = h - ih;
        afterPoint = {
            x: iw * point.x / ow,
            y: ih * point.y / oh,
            w: iw * point.width / ow,
            h: ih * point.height / oh
        };
    }
    left = w / 2 - iw / 2 - (afterPoint.x + afterPoint.w / 2 - iw / 2);
    if (type == 1) {//径向渐变
        var colorStr = $( oItem ).attr( 'color' );
        data = {colorStr: colorStr, imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, downtype: ''};
        specialEffectsList.RadialGradient.init( data, downImgFro );
    } else if (type == 2) {//前后背景
        var backStr = ($( oItem ).attr( 'imgSrc' ));
        data = {backStr: backStr, imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, downtype: ''};
        specialEffectsList.AddBackgroundImage.init( data, downImgFro );
    } else if (type == 3) {//三个影子
        // var headw = (mattingMsg.headData.right - mattingMsg.headData.left) * iw / mattingMsg.originalWidth;
        var headw = iw / 3;
        data = {imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, headw: headw, downtype: ''};
        specialEffectsList.ThreeShow.init( data, downImgFro );
    } else if (type == 4) {//加相框
        var bColor = $( oItem ).attr( 'bColor' )
        data = {
            bColor: bColor,
            imgObj: oImg,
            w: w,
            h: h,
            x: left,
            y: downTop,
            iw: iw,
            ih: ih,
            downtype: '',
            size: 40,
            iheight: downTop + afterPoint.y
        };
        specialEffectsList.AddPhotoFrame.init( data, downImgFro );
    } else if (type == 5) {//加佛光
        var upColor = $( oItem ).attr( 'upColor' ), backUrl = $( oItem ).attr( 'backUrl' );
        data = {
            imgObj: oImg,
            w: w,
            h: h,
            x: left,
            y: downTop,
            iw: iw,
            ih: ih,
            downtype: '',
            upColor: upColor,
            backUrl: backUrl
        };
        // $( oItem ).css( {backgroundImage: 'url(' + backUrl + ')',} );
        specialEffectsList.AddBuddhaLight.init( data, downImgFro );
    } else if (type == 6) {//加圆圈
        var colors = $( oItem ).attr( 'colors' );
        data = {
            imgObj: oImg,
            w: w,
            h: h,
            x: left,
            y: downTop,
            iw: iw,
            ih: ih,
            downtype: '',
            colors: colors,
            bcolor: '#000'
        };
        specialEffectsList.AddArc.init( data, downImgFro )
    }
}

function downImgFro(cans) {
    var nametype = downType === 'image/png' ? '.png' : '.jpg',
        name =downName || 'tets' + (Math.random()).toString().split( '.' )[1];
    if (window.navigator.msSaveOrOpenBlob) {
        var imgData = cans.msToBlob( function () {
        }, downType );
        var blobObj = new Blob( [imgData] );
        window.navigator.msSaveOrOpenBlob( blobObj, name + nametype );
        // window.navigator.msSaveOrOpenBlob( blobObj );
    } else {
        var oA = document.createElement( 'a' );
        oA.href = cans.toDataURL( downType );
        oA.download = name + nametype;
        oA.click();
    }
    setLoading();
    // $( '.zhezhao' ).hide();
    $( '.saveJpg' ).hide();
}

$( '.photoHisList.flex .itmes' ).click( function () {
    var url = $( this ).find( 'img' ).attr( 'src' );
    noBeautyResult = {};
    BeautyResult = {};
    dreepByurl( url )
} )

function changeType(item) {
    var cancal = $( item ).hasClass( 'cancal' );
    if (cancal) noBeautyResult = JSON.parse( JSON.stringify( mattingMsg ) );
    else BeautyResult = JSON.parse( JSON.stringify( mattingMsg ) );
    // console.log(BeautyResult,noBeautyResult)
    if (cancal) {
        $( item ).removeClass( 'cancal' );
        if (BeautyResult.bgRemovedPreview) {
            mattingMsg = JSON.parse( JSON.stringify( BeautyResult ) );
            initDiv();
        } else dreepByurl( mattingMsg.original )
    } else {
        $( item ).addClass( 'cancal' );
        if (noBeautyResult.bgRemovedPreview) {
            mattingMsg = JSON.parse( JSON.stringify( noBeautyResult ) );
            initDiv();
        } else dreepByurl( mattingMsg.original )
    }
}

var specialEffectsList = {//type 1 为径向渐变
    RadialGradient: new RadialGradient(),
    ThreeShow: new ThreeShow(),
    AddPhotoFrame: new AddPhotoFrame(),
    AddBuddhaLight: new AddBuddhaLight(),
    AddArc: new AddArc(),
    AddBackgroundImage: new AddBackgroundImage(),
    InvertedImage: new InvertedImage(),
    ContactShadow: new ContactShadow(),
    ResliderVal: new ResliderVal(),
    setBorder: new setBorder(),
}
