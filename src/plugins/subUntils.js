import Vue from 'vue'
import '../assets/public.css';
import '../element-variables.scss'
import filters from '../filters/filters'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)
Object.keys(filters).map((val,index)=>{
    Vue.filter(val,filters[val])
    // console.log(val,filters[val])
})
import {  Button, Input, Table, TableColumn,  Radio, RadioGroup, Dialog, Select, Option,Dropdown, DropdownMenu, DropdownItem, Message, Pagination, Loading } from 'element-ui'
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
Vue.prototype.$message = Message;
Vue.component(Pagination.name, Pagination);
Vue.prototype.$loading = Loading.service;
