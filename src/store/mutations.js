const mutations={
    SET_INIT_STATUS(state,data){
        state.initStatusResult=data
    },
    SET_USER_SUBS(state,data){
        state.Subscribe=data
    },
    SET_EFFECTSIMG(state,data){
        if(data.clear){
            state.effectsImgList=[];
            return
        }
        const idx=state.effectsImgList.findIndex(item=>item.id===data.id);
        if(idx>-1)state.effectsImgList.splice(idx,1,data);
        else state.effectsImgList.push(data);
    },
}

export default mutations
