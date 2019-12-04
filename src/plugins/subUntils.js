import Vue from 'vue'
import '../assets/public.css';
import '../element-variables.scss'
import filters from '../filters/filters'
// import lang from 'element-ui/lib/locale/lang/en'
// import locale from 'element-ui/lib/locale'
// locale.use(lang)
Object.keys(filters).map((val,index)=>{
    Vue.filter(val,filters[val])
    // console.log(val,filters[val])
})
import {  Button, Input, Table, TableColumn,  Radio, RadioGroup, Dialog, Select, Option,Dropdown, DropdownMenu, DropdownItem, Message, Pagination, Loading, Checkbox,Scrollbar,ColorPicker,Upload,Notification,Switch,
    Slider} from 'element-ui'
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Dialog.name, Dialog);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Scrollbar.name, Scrollbar);
Vue.prototype.$message = Message;
Vue.component(Pagination.name, Pagination);
Vue.component(ColorPicker.name, ColorPicker);
Vue.component(Upload.name, Upload);
Vue.component(Switch.name, Switch);
Vue.component(Slider.name, Slider);
Vue.prototype.$loading = Loading.service;
Vue.use(Loading.directive);
Vue.prototype.$notify = Notification;
Vue.directive('drag',(event)=>{
    let oDiv=event;
    oDiv.onmousedown=(ev)=>{
        if( ev.target.className!=='content' ) return;
        let x=ev.clientX-oDiv.offsetLeft;
        let y=ev.clientY-oDiv.offsetTop;
        document.onmousemove=(e)=>{
            let l=e.clientX-x;
            let t=e.clientY-y;
            oDiv.style.left=l+'px';
            oDiv.style.top=t+'px';
        }
        document.onmouseup=(e)=>{
            document.onmousemove=null;
            document.onmouseup=null;
        }
    }

})
