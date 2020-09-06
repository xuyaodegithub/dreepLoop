import state from "./state";

const getters = {
    ppp: state => {
        return state.page.ppp
    },
    effectsImgList: state => state.effectsImgList,
    initStatusResult: state => state.initStatusResult,
    userSubscribeData: state => state.Subscribe,
    showLoginDilog: state => state.showLoginDilog,
}

export default getters
