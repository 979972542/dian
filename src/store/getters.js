const getters = {
    getUser: state => state.user,
    getActive:state => state.user.active,
    getTab:state=>state.classify,
    getList:state=>state.spu
}
export default getters