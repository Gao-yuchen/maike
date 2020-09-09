<template>
    <div>
        <div class="sidebar">
            <div class="aaaaa">
                <el-tree
                    class="treeitems"
                    :data="data"
                    node-key="id"
                    :props="defaultProps"
                    :load="loadNode"
                    lazy
                    @node-click="handleNodeClick"
                    ref="tree"
                    :render-after-expand="true"
                    :indent="16"
                    :auto-expand-parent="true"
                    icon-class="el-icon-s-help"
                >
                    <!-- :default-expanded-keys="[0]"
                    :highlight-current="true"
                    -->
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{node.label }}</span>

                        <span class="customAdd">
                            <i @click.stop="() => append(node,data)" class="el-icon-plus"></i>
                            <i
                                v-if="data.id !== 0"
                                @click.stop="() => deletes(node,data)"
                                class="el-icon-delete"
                            ></i>
                            <!-- <i
                        v-if="data.id !== 0"
                        @click.stop="() => rename(node,data)"
                        class="el-icon-edit"
                            ></i>-->
                        </span>
                    </span>
                </el-tree>
            </div>
            <AlertInput @childFn="parentFn" ref="mychild"></AlertInput>
            <div class="treeOther">
                <div @click.stop="usersAdmin" class="usersAdmin">
                    <span class="el-icon-s-custom">&nbsp;&nbsp;用户管理</span>
                </div>
                <div class="userAdmin" v-show="userShow">
                    <div @click.stop="administrators">管理员用户</div>
                    <div @click.stop="OrdinaryUsers">普通用户</div>
                </div>
                <div @click.stop="getway" class="usersAdmin">
                    <span class="el-icon-monitor">&nbsp;&nbsp;网络配置</span>
                </div>
                <div class="userAdmin" v-show="getwayShow">
                    <div @click.stop="CNGCF">网关配置</div>
                    <div @click.stop="Equipment">设备组网</div>
                    <div v-show="equipment"  v-for="(item,i) in node" :key="i">
                        <p class="getwaynode" @click.stop="price(item)" >{{item}}</p>
                        
                    </div>
                  
                    
                </div>

                <div class="systemSettings">
                    <span @click.stop="systemSetup" class="el-icon-s-tools">&nbsp;&nbsp;系统设置</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '../common/bus';
import AlertInput from './alertInput';

import { sublistFacilities, geSublistOfSpecific, deleteFacilites, geTypeOfSpecific,GetDeviceNetworking } from '../../api/index';
export default {
    components: {
        AlertInput
    },
    data() {
        return {
            sublistnode:false,
            equipment:false,
            node:[],
            filterText: '',
            data: [
                {
                    id: 0,
                    label: '会议室管理',
                    name: '会议室管理'
                }
            ],
            dataone:[{
                 label: '设备组网',
            }],
            children: [],
            defaultProps: {
                children: 'children',
                label: 'label',
                isLeaf: 'leaf'
            },
            
            message: '',
            forChildData: {
                show: false,
                name: '',
                type: []
            },
            addDataID: '',
            addDataNode: '',
            userShow: false,
            getwayShow: false
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },

    updated() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        // bus.$on('collapse', msg => {
        //     this.collapse = msg;
        //     bus.$emit('collapse-content', msg);
        // });
        //returndata传递过去更新sidebar的this.data   20200601
        bus.$on('forchangTablesave', (val) => {
            console.log(val + '4455555');
            geSublistOfSpecific(0)
                .then((returndata) => {
                    if (!this.data.children) {
                        this.$set(this.data, 'children', []);
                    }
                    this.data.children = [];
                    this.data.childNodes = [];

                    returndata.info.forEach(function (e) {
                        e.label = e.name;
                        this.data.children.push(e);
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '修改失败'
                    });
                });
        });
    },
    methods: {
        //管理员页面
        administrators() {
            this.$router.push({ path: '/administrators' });
        },
        //普通用户页面
        OrdinaryUsers() {
            this.$router.push({ path: '/users' });
        },
        //系统设置
        systemSetup() {
            this.equipment=false
            this.$router.push({ path: '/systemSetup' });
        },
        //网关配置
        CNGCF() {
            this.equipment=false
            this.$router.push({ path: '/Thegatewayconfiguration' });
        },
        //设备组网
        Equipment() {
            this.$router.push( '/EquipmentNetworking' );
            this.equipment=!this.equipment
            if(this.equipment==true){
                // console.log("1111")
                GetDeviceNetworking().then(data=>{
                    let parentname=[]
                    let name=data.info
                    for(var i in name){
                        parentname.push(name[i].parent.name)
                          
                    }
                    let node=new Set(parentname)
                    let nodename=Array.from(node)
                    this.node=nodename
                   
                })
            }
        },
        price(item){
             this.$bus.$emit('item', item);
        },
        //点重命名事件
        append(node, data) {
            console.log(node, data, '增加');
            this.addDataID = data;
            this.addDataNode = node;
            geTypeOfSpecific(data.id)
                .then((returndata) => {
                    if (returndata.info.childrenTypes.length == 0) {
                        this.$message({
                            type: 'info',
                            message: '已经不能添加'
                        });
                        return;
                    }
                    this.forChildData.name = data.name;
                    this.forChildData.type = returndata.info.childrenTypes;
                    this.forChildData.show = true;
                    this.$refs.mychild.parentHandleclick(this.forChildData);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '添加失败'
                    });
                });
        },
        partialRefreshpartialRefresh(node) {
            //设置loaded为false；模拟一次节点展开事件，加载重命名后的新数据；
            // node.loaded = false;
            // node.expand();
            node.parent.loaded = false;
            node.parent.expand();
            //新建子节点是刷新一次本节点的展开请求，而重命名和删除则需要刷新父级节点的的展开事件，
            //可以设置node.parent.loaded = false;node.parent.expand();
        },
        //懒加载
        loadNode(node, resolve) {
            if (node.level === 0) {
                //本地的数据，一个承载中国字样的数组；
                return resolve(this.data);
            } else if (node.level === 1) {
                //现在为模拟数据；
                //有真实数据，在resolve中放置请求回来的数据即可。
                //else同样也是。我这里是区分了两种请求方式。
                return resolve(this.children);
            } else {
                if (node.data.children) {
                    return resolve(node.data.children);
                } else {
                    return resolve([]);
                }
            }
        },
        
        handleNodeClick(node, data) {
            // console.log(node);
            this.$router.push(`/table/${node.id}/${node.name}`);
            geSublistOfSpecific(node.id)
                .then((returndata) => {
                    // console.log(returndata)
                    if (!data.children) {
                        this.$set(data.data, 'children', []);
                    }
                    data.data.children = [];
                    data.childNodes = [];
                    returndata.info.forEach(function (e) {
                        e.label = e.name.substr(0, 20);
                        data.data.children.push(e);
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '修改失败'
                    });
                });
        },

        deletes(node, data) {
            this.$confirm('确定删除此节点？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });

                    deleteFacilites(data.id)
                        .then((returndata) => {
                            this.partialRefreshpartialRefresh(node);
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '添加失败'
                            });
                        });
                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex((d) => d.id === data.id);
                    children.splice(index, 1);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        rename(node, data) {
            console.log(node, data);
        },
        parentFn(payload) {
            this.message = payload;
            let formData = {
                label: this.message.name,
                type: this.message.value,
                name: this.message.name
            };
            sublistFacilities(this.addDataID.id, formData)
                .then((returndata) => {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    if (!this.addDataID.children) {
                        this.$set(this.addDataID, 'children', []);
                    }
                    this.addDataID.children.push(returndata.info);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '添加失败'
                    });
                });
        },
        usersAdmin() {

            this.userShow = !this.userShow;
            this.equipment=false
        },
        getway() {
            this.equipment=false
            this.getwayShow = !this.getwayShow;
        }
    }
};
</script>

<style lang="scss" scoped>
.cngcf {
    padding-left: 6px;
    color: #606266;
    cursor: pointer;
}
.cngcf:hover {
    background-color: #ccc;
    font-weight: 900;
}
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 90px;
    bottom: 0;
    overflow-y: scroll;
    width: 300px;
}
.el-tree {
    background: #3c4f6e;
    color: #fff;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar > ul {
    height: 100%;
}

.custom-tree-node {
    width: 100%;
}
.el-tree,
.treeitems,
.aaaaa {
    display: block;

    line-height: 35px;
}
.getwaynode{
    margin-left: 20px;
}

.customAdd {
    float: right;
}

.customAdd i {
    margin-left: 7px;
}

.treeOther div {
    color: #fff;
    cursor: pointer;
    line-height: 35px;
}
.treeOther {
    height: 100%;
    background: #3c4f6e;
}
.systemSettings:hover {
    background-color: #ccc;
    font-weight: 900;
}
.usersAdmin:hover {
    background-color: #ccc;
    font-weight: 900;
}
.el-icon-plus:hover {
    font-weight: 900;
    color: black;
    font-size: 18px;
}
.el-icon-delete:hover {
    font-weight: 900;
    color: black;
    font-size: 18px;
}
.usersAdmin span {
    padding-left: 6px;
}
.systemSettings span {
    padding-left: 6px;
}
.userAdmin div:hover {
    background-color: #ccc;
    font-weight: 900;
}

.userAdmin div {
    padding-left: 41px;
}

/deep/ .el-tree-node:focus > .el-tree-node__content {
    background-color: #ccc !important;
    font-weight: 900;
}

/deep/ .el-tree-node:hover > .el-tree-node__content:hover {
    background-color: #ccc !important;
    font-weight: 900;
}
</style>
