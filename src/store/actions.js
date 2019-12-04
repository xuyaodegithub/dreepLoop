/**
 * Created by Yan on 18/8/15.
 */
import axios from 'axios'
import qs from 'qs';
import { userSubscribe } from '@/apis'
// axios.defaults.baseURL=process.env.BASE_API;
// axios.defaults.timeout = 10000;
// axios.defaults.headers['content-type']='application/json';
// axios.defaults.withCredentials=true;//请求携带cookie


const actions={
    userGetscribe(context,data){
        userSubscribe().then(res=>{
            context.commit('SET_USER_SUBS',res.data)
        })
    }

}


export default actions
