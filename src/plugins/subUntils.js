import Vue from 'vue'
import '../assets/public.css';
import '../element-variables.scss'
import filters from '../filters/filters'
import {getTanDeg} from '@/utils'

require( 'promise.prototype.finally' ).shim();//使axios支持finally回调
// import lang from 'element-ui/lib/locale/lang/en'
// import locale from 'element-ui/lib/locale'
// locale.use(lang)
// window.addEventListener('beforeunload', e => {
//     window.localStorage.removeItem('user_Token')
// });
Object.keys( filters ).map( (val, index) => {
    Vue.filter( val, filters[val] )
    // console.log(val,filters[val])
} )
import {
    Button,
    Input,
    Table,
    TableColumn,
    Radio,
    RadioGroup,
    Dialog,
    Select,
    Option,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Message,
    Pagination,
    Loading,
    Checkbox,
    Scrollbar,
    ColorPicker,
    Upload,
    Notification,
    Switch,
    Slider,
    MessageBox,
    Carousel,
    CarouselItem,
    InputNumber,
    Popover,
    Tooltip,
} from 'element-ui'

Vue.component( Button.name, Button );
Vue.component( Input.name, Input );
Vue.component( Table.name, Table );
Vue.component( TableColumn.name, TableColumn );
Vue.component( Radio.name, Radio );
Vue.component( RadioGroup.name, RadioGroup );
Vue.component( Dialog.name, Dialog );
Vue.component( Select.name, Select );
Vue.component( Option.name, Option );
Vue.component( Dropdown.name, Dropdown );
Vue.component( DropdownMenu.name, DropdownMenu );
Vue.component( DropdownItem.name, DropdownItem );
Vue.component( Checkbox.name, Checkbox );
Vue.component( Scrollbar.name, Scrollbar );
Vue.prototype.$message = Message;
Vue.component( Pagination.name, Pagination );
Vue.component( ColorPicker.name, ColorPicker );
Vue.component( Upload.name, Upload );
Vue.component( Switch.name, Switch );
Vue.component( Slider.name, Slider );
Vue.component( Carousel.name, Carousel );
Vue.component( CarouselItem.name, CarouselItem );
Vue.component( InputNumber.name, InputNumber );
Vue.component( Popover.name, Popover );
Vue.component( Tooltip.name, Tooltip );
Vue.prototype.$loading = Loading.service;
Vue.use( Loading.directive );
Vue.prototype.$notify = Notification;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.directive( 'drag', (event) => {
    let [oDiv, w, h, top, left, centerx, centery] = [event, event.offsetWidth, event.offsetHeight, event.offsetTop, event.offsetLeft, event.offsetLeft + event.offsetWidth / 2, event.offsetTop + event.offsetHeight / 2];
    const rotates = oDiv.style.transform ? oDiv.style.transform.split( '(' )[1].split( 'd' )[0] : 0;
    oDiv.onmousedown = (ev) => {
        // if( ev.target.className!=='items' ) return;
        let x = ev.clientX - oDiv.offsetLeft;
        let y = ev.clientY - oDiv.offsetTop;
        document.onmousemove = (e) => {
            let l = e.clientX - x;
            let t = e.clientY - y;
            const cn = ev.target.className, mx = e.clientX - ev.clientX, my = e.clientY - ev.clientY;
            if (cn.includes( 'downIcon' )) {
                const db = e.clientX - ev.clientX;
                const res = 180 - getTanDeg( Math.sqrt( Math.pow( db, 2 ) + Math.pow( e.clientY - ev.clientY, 2 ) ) / 2 / (h / 2) ) * 2
                oDiv.style.transform = `rotateZ(${db > 0 ? -res + parseFloat( rotates ) : res + parseFloat( rotates )}deg)`
                // console.log(res,rotates)
            } else if (cn === 'iOne') {
                oDiv.style.height = h - my + 'px';
                oDiv.style.top = top + my + 'px'
            } else if (cn === 'iTwo') oDiv.style.width = w + mx + 'px';
            else if (cn === 'iTh') oDiv.style.height = h + my + 'px';
            else if (cn === 'iFor') {
                oDiv.style.width = w - mx + 'px';
                oDiv.style.left = left + mx + 'px'
            } else if (cn === 'iFive') {
                oDiv.style.width = w + mx + 'px';
                oDiv.style.height = (w + mx) * h / w + 'px';
                oDiv.style.top = top + h - (w + mx) * h / w + 'px';
            } else {
                oDiv.style.left = l + 'px';
                oDiv.style.top = t + 'px';
            }
        }
        document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }

} )
