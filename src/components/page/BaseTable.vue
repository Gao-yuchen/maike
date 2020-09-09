<template>
    <div class="crumbs">
        <table class="flexdivsecond myTable">
            <tr>
                <td class="headers">参数名</td>
                <td class="headers">参数值</td>
            </tr>
            <tr v-for="(item,i) in showInput" :key="i">
                <td class="column noChangetd">{{ item.key }}</td>
                <td class="column" v-show="!item.show" @click="changevalue(i)">{{ item.value }}</td>
                <td class="column" v-show="item.show">
                    <el-input
                        class="inputColumn"
                        ref="outsideComponentRef"
                        v-model="item.value"
                        placeholder="请输入内容"
                        @blur="noIput(i)"
                    ></el-input>
                </td>
            </tr>
            <tr class="buttontd">
                
                <td>
                    <el-button
                        class="tablebutton"
                        v-if="buttonshow"
                        type="primary"
                        @click="consoleItem"
                        plain
                    >确认保存</el-button>
                </td>
            </tr>
        </table>
        <!-- <el-table  v-for="(item,i) in showInput" :key="i" style="width: 100%">
            <el-table-column prop="key" label="参数名" align="center"></el-table-column>
            <el-table-column prop="value" label="参数值" align="center"  cell-dblclick="showinput"></el-table-column>
            <el-table-column prop="value" label="参数值" align="center" >
                <el-input
                        class="inputColumn"
                        ref="outsideComponentRef"
                        
                    ></el-input>
            </el-table-column>
            
        </el-table> -->
    </div>
</template>
<script>
import { geSublistRighttable, buildFacilites } from '../../api/index';
import bus from '../common/bus';
export default {
    name: 'basetable',
    data() {
        return {
            tableid: '',
            showInput: [],
            statDataskey: [],
            statDatasval: [],
            statDatas: [],
            returnNewstasDats: [],
            returnNewstasDatskey: [],
            returnNewstasDatsval: [],
            buttonshow: false,
            inputshow:true
        };
    },
    mounted: function () {},
    watch: {
        $route(to, from) {
            //监听路由是否变化

            if (this.$route.params.id) {
                // 判断条件1  判断传递值的变化
                //获取文章数据
                this.init(this.$route.params.id);
            }
        }
    },

    methods: {
        consoleItem() {
            this.returnNewstasDats = [];
            for (let i = 0; i < this.showInput.length; i++) {
                if (this.showInput[i].key !== 'label') {
                    let getkey = this.showInput[i].key;
                    let getvalue = this.showInput[i].value;
                    let params = {};
                    params[getkey] = getvalue;
                    this.returnNewstasDats.push(params);
                }
            }
            let varobj = Object.assign(...this.returnNewstasDats);
            buildFacilites(this.$route.params.id, varobj)
                .then((returndata) => {
                    //returndata传递过去更新sidebar的this.data   20200601
                    //  bus.$emit('forchangTablesave', this.$route.params.id);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '未得到数据'
                    });
                });
        },

        changevalue(i) {
            this.showInput[i].show = !this.showInput[i].show;
            this.$nextTick(() => {
                this.$refs.outsideComponentRef[i].focus();
            });
        },
        showinput(){
            this.inputshow=false
        },
        noIput(i) {
            this.showInput[i].show = !this.showInput[i].show;
        },
        init(roomid) {
            geSublistRighttable(roomid)
                .then((returndata) => {
                    this.showInput = [];
                    this.statDatas = returndata.info;
                    var arr = [];
                    for (let i in this.statDatas) {
                        if (i != 'id' && i != 'label' && i != 'type' && i != 'parentId' && i != 'path') {
                            let o = {};
                            o[i] = this.statDatas[i];
                            arr.push(o);
                        }
                    }
                    this.statDataskey = Object.keys(Object.assign(...arr));
                    this.statDatasval = Object.values(Object.assign(...arr));
                    for (let i = 0; i < this.statDataskey.length; i++) {
                        let forData = {
                            key: this.statDataskey[i],
                            value: String(this.statDatasval[i]),
                            show: false
                        };
                        this.showInput.push(forData);
                    }
                    if (this.showInput.length) {
                        this.buttonshow = true;
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '修改失败'
                    });
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.crumbs {
    width: 100%;
}

.myTable {
    width: 100%;

    border-collapse: collapse;
    /* margin: 0 auto; */
    text-align: center;
}

.myTable td {
    border: 1px solid #cad9ea;
    color: #666;
    height: 40px;
    width: 50%;
    font-size: 12px;

}
.column{
    background: #fff;
    
}

.inputColumn {
    height: 50px;
}

.tablebutton {
    position: relative;
    top: 0;
    left: 840px;
}

.buttontd td {
    border: 0px solid #cad9ea;
}

// .noChangetd {
//     background-color: antiquewhite;
// }
.headers{
    background: #f5f7fa;
        color: #909399;
        font-weight: 500;
        
}
/deep/ .el-input__inner {
    height: 50px;
}
</style>
