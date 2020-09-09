  <template>
  <div>

    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="180" align="center"></el-table-column>
        <el-table-column prop="id" label="设备ID"  align="center"></el-table-column>
        <el-table-column prop="type" label="设备类型" align="center"></el-table-column>
        <el-table-column prop="name" label="网关名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
             <el-button type="text" size="small" @click.stop="() => addgitway(scope.row.id)">添加 </el-button>
             <el-button type="text" size="small" @click.stop="() => removegitway(scope.row.id)">删除 </el-button>
             <el-button type="text" size="small" @click.stop="() => amendgitway(scope.$index,scope.row)">修改 </el-button>
             </template>
        </el-table-column>
    </el-table>
    <!-- 修改弹框 -->
        <el-dialog :title="dialogTitle" width="50%" :visible.sync="iconFormVisible">
            <el-form :inline="true" :model="userInfo" class="demo-form-inline">
                <el-form-item label="网关名称">
                    <el-input v-model="userInfo.name" placeholder="网关名称"></el-input>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-input v-model="userInfo.type" placeholder="设备类型"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="iconFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUser()">确 定</el-button>
            </div>
        </el-dialog>
  </div>
    
</template>

  <script>
  import {gatewayConfiguration,gatewaynode,addgatewaynode,amendgatewaynode,removegatewaynode} from "../../api/index"
export default {
    data() {
        return {
            tableData: [],
            iconFormVisible: false,
            userInfo:{
                type:"KNXDevice"
            },
            dialogTitle: '增加',
            addid:'',
            updataid:'',
            rowindex:''
        };
    },
    mounted(){
        gatewayConfiguration().then(retdata=>{
            // console.log(retdata)
            for(var i in retdata){
                this.tableData=retdata[i]
            }
            
        })
    },
    methods:{
        addgitway(id){
            this.addid=id
            this.iconFormVisible=true   
        },
        amendgitway(index,row){
            this.updataid=row.id
            this.iconFormVisible=true
            this.dialogTitle="修改" 
            this.userInfo=row
            this.rowindex=index
        },
        removegitway(id){
            removegatewaynode(id).then(data=>{
                window.location.reload();
            })
        },
        submitUser(){
            if(this.dialogTitle=="增加"){
                gatewaynode(this.addid).then(data=>{
                    if(data.code==200){
                        let DeviceId=data.info.DeviceId
                        this.userInfo.DeviceId=DeviceId
                        addgatewaynode(this.userInfo).then(data=>{
                            if(data.code==200){
                                this.iconFormVisible=false
                                this.tableData.push(data)
                                window.location.reload();
                            }
                        })

                    }
                })
            }
            if(this.dialogTitle=="修改"){
                gatewaynode(this.updataid).then(data=>{
                    if(data.code==200){
                        let DeviceId=data.info.DeviceId
                        this.userInfo.DeviceId=DeviceId
                        amendgatewaynode(this.updataid,this.userInfo).then(data=>{
                            if(data.code==200){
                                this.iconFormVisible=false
                                 this.tableData.splice(this.rowindex,1,{type:data.type,name:data.name})
                                window.location.reload();
                            }
                        })

                    }
                })
            }
        }

    }
};
</script>