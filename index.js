var util = {
    debounce: function(idle, action) {
        var last;
        return function() {
            var me = this;
            var args = arguments;
            clearTimeout(last);
            last = setTimeout(function() {
                action.apply(me, args);
            }, idle);
        }
    }
}
var vm = (function() {
    var jsonFile = './data/list-result.json';
    var listResultUrl = listOrigUrl = listOrig = [];
    var listDefaultStepLength = 5;
    var listFirstStepLength = 10;
    return new Vue({
        el: "#main",
        data: {
            searchKeyword: "",
            msg: "选择一张图片",
            currentIndex: -1,
            list: [],
            listLength: 0,
            listLeft: 0,
            protocol: "http:",
            host: "oww4nskgw.bkt.clouddn.com",
            ss: { // style string
                tn: "tn",
                pv: "pv",
                aw: "aw"
            }
        },
        computed: {},
        methods: {
            init: function() {
                var me = this;
                $.ajax({
                        url: jsonFile,
                        type: 'POST',
                        dataType: 'JSON',
                        data: {}
                    })
                    .done(function(a, b, c) {
                        listOrig = a.reverse();
                        me.fn_filter();
                        me.fn_next(listFirstStepLength, true);
                    });

                // 绑定事件：点击 .tn 时，复制 dataset-clip 到剪贴板
                var clipboard = new Clipboard('.tn');
            },
            onSearchEnter: util.debounce(200, function() {
                var me = this;
                me.fn_filter(me.searchKeyword);
                me.fn_next(listFirstStepLength, true);
            }),
            onSelect: function(e) {
                var me = this;
                var elm = e.target;
                me.msg = url = elm.dataset.url;
                me.currentIndex = Number(elm.dataset.index);
            },
            fn_filter: function(keyword) {
                var me = this;
                listResultUrl = [];
                if (keyword && keyword !== '') {
                    listOrig.forEach(function(val, i) {
                        if (val.indexOf(keyword) > -1) {
                            listResultUrl.push(me.fn_origToUrl(val));
                        }
                    });
                } else if (listOrigUrl.length === 0) {
                    listOrig.forEach(function(val, i) {
                        listOrigUrl.push(me.fn_origToUrl(val));
                    });
                    listResultUrl = listOrigUrl;
                } else {
                    listResultUrl = listOrigUrl;
                }
                me.listLength = listResultUrl.length;
            },
            fn_origToUrl: function(orig) {
                var me = this;
                return `${me.protocol}//${me.host}/${orig}`;
            },
            fn_next: (function() {
                var i;
                return function(num, isNewList) {
                    var me = this;
                    steplength = num ? num : listDefaultStepLength;
                    if (isNewList) {
                        i = 0;
                        me.list = [];
                    }
                    if (i <= me.listLength) {
                        me.list = me.list.concat(listResultUrl.slice(i, i + steplength));
                        i += steplength;
                        me.listLeft = i < me.listLength ? me.listLength - i : 0;
                    }
                }
            })()
        }
    });
})();
vm.init();