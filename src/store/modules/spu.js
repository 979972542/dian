export default {
    namespaced: true,
    state: [{
            id: 1,
            img: [
                "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            ],
            type: "手机",
            title: "苹果11",
            details: "牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的牛的",
            specsList: [{
                    title: "颜色",
                    spec: ["红色", "蓝色"],
                },
                {
                    title: "内存",
                    spec: ["6G+64G", "6G+128G"],
                },
            ],
            sku: [{
                    img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
                    rate: "1200",
                    stock: "100",
                    Composition: ["红色", "6G+64G"],
                },
                {
                    img: "",
                    rate: "1800",
                    stock: "50",
                    Composition: ["蓝色", "6G+128G"],
                },
            ],
        },
        {
            id: 2,
            img: [
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            ],
            type: "手机",
            title: "苹果12",
            details: "非常牛的",
            specsList: [{
                    title: "颜色",
                    spec: ["绿色"],
                },
                {
                    title: "内存",
                    spec: ["6G+64G", "6G+128G"],
                },
            ],
            sku: [{
                img: "",
                rate: "100",
                stock: "100",
                Composition: ["绿色", "6G+64G"],
            }, ],
        },
        {
            id: 3,
            img: [
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            ],
            type: "电脑",
            title: "DELL游匣",
            details: "很强",
            specsList: [{
                    title: "颜色",
                    spec: ["黄色", "蓝色"],
                },
                {
                    title: "内存",
                    spec: ["6G+64G"],
                },
            ],
            sku: [{
                    img: "",
                    rate: "200",
                    stock: "100",
                    Composition: ["黄色", "6G+64G"],
                },
                {
                    img: "",
                    rate: "800",
                    stock: "50",
                    Composition: ["蓝色", "6G+128G"],
                },
            ],
        },
    ],
    mutations: {
        addspu(state, val) {
            val.id = state[state.length - 1].id + 1;
            state.push(val);
        },
        addspecsList(state, val) {
            state.forEach((row) => {
                if (row.id == val.id) {
                    row.specsList.push({ title: val.value, spec: [] });
                }
            });
        },
        addspec(state, val) {
            state.forEach((row) => {
                if (row.id == val.id) {
                    row.specsList[val.ro].spec.push(val.value);
                }
            });
        },
        removespec(state, val) {
            state.forEach((row) => {
                if (row.id == val.id) {
                    row.specsList[val.ro].spec.splice(val.r, 1);
                }
            });
        },
        tagupdata(state, val) {
            state.forEach((row) => {
                if (row.id == val.id) {
                    row.specsList[val.ro].title = val.value;
                }
            });
        },
        removelist(state, val) {
            state.forEach((row) => {
                if (row.id == val.id) {
                    row.specsList.splice(val.ro, 1);
                }
            });
        },
        addsku(state, val) {
           state.form.Composition = val.form.Composition.filter((ro) => ro != "");
            state.forEach((el) => {
                if (el.id == val.id) {
                    el.sku.push({
                        // 在上面表格(sku)中添加数据
                        img: val.form.img,
                        rate: val.form.rate,
                        stock: val.form.stock,
                        Composition: val.form.Composition,
                    });
                }
            });
        },
        removesku(state, val) {
            state.forEach((el) => {
                if (el.id == val.id) {
                    el.sku.splice(val.index, 1);
                }
            });
        },
        // 删除数据（商品列表）
        remove(state, val) {
            // 遍历state
            state.forEach((row, i) => {
                if (row.id == val) {
                    state.splice(i, 1);
                    // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目
                    // 该方法会改变原始数组。
                    // 
                    // arrayObject.splice(index,howmany,item1,.....,itemX)
                    // index:必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
                    // howmany:必需。要删除的项目数量。如果设置为 0，则不会删除项目。
                    // item1, ..., itemX:可选。向数组添加的新项目。
                }
            });
        },
        changespu(state, val) {
            state.forEach((row) => {
                if (row.id == val.id) {
                    row.type = val.form.type;
                    row.title = val.form.title;
                    row.img = val.form.img;
                    row.details = val.form.details;
                }
            });
        },
        changesku(state, val) {
            state.forEach((row) => {
                if (row.id == val.id) {
                    row.sku[val.index].img = val.form.img;
                    row.sku[val.index].rate = val.form.rate;
                    row.sku[val.index].stock = val.form.stock;
                }
            });
        },
        changeSkuClass(state, val) {
            state.forEach(row => {
                if (row.type == val.old) {
                    row.type = val.new
                }
            })
        }
    },
    actions: {
        addspu({ commit }, val) {
            commit("addspu", val);
        },
        addspecsList({ commit }, val) {
            commit("addspecsList", val);
        },
        addspec({ commit }, val) {
            commit("addspec", val);
        },
        removespec({ commit }, val) {
            commit("removespec", val);
        },
        tagupdata({ commit }, val) {
            commit("tagupdata", val);
        },
        removelist({ commit }, val) {
            commit("removelist", val);
        },
        addsku({ commit }, val) {
            commit("addsku", val);
        },
        removesku({ commit }, val) {
            commit("removesku", val);
        },
        remove({ commit }, val) {
            commit("remove", val);
        },
        changespu({ commit }, val) {
            commit("changespu", val);
        },
        changesku({ commit }, val) {
            commit("changesku", val);
        },
        changeSkuClass({ commit }, val) {
            commit("changeSkuClass", val);
        },
    },
};