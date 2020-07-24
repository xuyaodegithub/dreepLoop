    let oBtn = $( '.item .btn' ), token = localStorage.getItem( 'user_Token' );
oBtn.click( function () {
    const editPictures = {
        pro: '',
        ori: '',
        filename: '',
        bgImg: $( this ).children( 'img' ).attr( 'loadsrc' ).split( ',' )[1],
        fileId: '',
        imageMsg: {}
    }
    localStorage.setItem( 'editImg', JSON.stringify( editPictures ) )
    window.open( 'editPictures.html' )
} )
if (token) {
    $.ajax( {
        url: '//restapi.picup.shop/user/userInfo',
        type: 'GET',
        dataType: 'json',
        headers: {token: token},
        success(res) {
            if(!res.code){
                $( '.loginbtb' ).css( {display: 'none'} )
                $( '.users' ).css( {display: 'inline-block'} )
                $( '.users' ).text( res.data.mobile );
            }
        }
    } )
} else {
    $( '.loginbtb' ).css( {display: 'inline-block'} )
    $( '.users' ).css( {display: 'none'} )
}

function loadImg() {
    let allImg = $( '#contanin .item ' );
    $.each( allImg, function (i, item) {
        let selfH = $( item ).width(), cT = $( item ).offset().top - $( document ).scrollTop(),
            cB = $( window ).height() - $( item ).offset().top + $( document ).scrollTop();
        // console.log( cT, cB, i )
        if (cB > 30 && cT > 0) {
            ($( this ).find( 'img' )).attr( 'src', ($( this ).find( 'img' ).attr( 'loadsrc' )).split( ',' )[0] )
        }
    } )
}

function initDiv() {
    var oItem = $( '#contanin .item' ), initH = 300, saveW = 0, Omainw = $( '#contanin > .flex' ).width(),
        temporary = [];
    $.each( oItem, function (i, v) {
        let scale = $( v ).attr( 'data-w' ) / $( v ).attr( 'data-h' );
        saveW += (initH * scale);
        temporary.push( v )
        if (saveW >= Omainw) {
            console.log( saveW, temporary.length )
            let hh = (Omainw - temporary.length * 10) * initH / saveW;
            $.each( temporary, function (j, k) {
                $( k ).css( {
                    width: parseInt( hh * $( k ).attr( 'data-w' ) / $( k ).attr( 'data-h' ) ),
                    height: parseInt( hh )
                } )
            } )
            temporary = [];
            saveW = 0;
        }else if(i===oItem.length-1 && saveW<Omainw){
            $.each( temporary, function (j, k) {
                $( k ).css( {
                    width: parseInt( 300 * $( k ).attr( 'data-w' ) / $( k ).attr( 'data-h' ) ),
                    height: 300
                } )
            } )
        }
    } )
}

function seach(e) {
    let ev = e || window.event
    let code = e.keyCode || e.which;
    if (code === 13) console.log( code )
}

function loginout() {
    localStorage.removeItem( 'user_Token' );
    window.location.reload();
}

var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

window.addEventListener( resizeEvt, initDiv, false );
window.addEventListener( 'scroll', loadImg, false );
initDiv()
loadImg()
