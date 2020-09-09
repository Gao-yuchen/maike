<template >
    <div id="box">
        <el-table :data="tableData" height="100%" border style="width: 100%">
            <el-table-column label="序号" type="index" width="180" align="center"></el-table-column>
            <el-table-column prop="name" label="用户名称" width="380" align="center"></el-table-column>
            <el-table-column prop="password" label="密码" align="center"></el-table-column>
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click.stop="()=>handleEdit(scope.$index, scope.row)"
                    >修改</el-button>
                    <el-button type="text" size="small" @click.stop="() => handleDelete(scope.row.id)">删除</el-button>
                    <el-button type="text" size="small" @click.stop="() => addmessage()">添加</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 修改弹框 -->
        <el-dialog :title="dialogTitle" width="50%" :visible.sync="iconFormVisible">
            <el-form :inline="true" :model="userInfo" class="demo-form-inline">
                <el-form-item label="用户名称">
                    <el-input v-model="userInfo.name" placeholder="用户名称"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="userInfo.password" placeholder="密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="iconFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUser()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style>
#box {
    height: 100%;
}
.add {
    position: absolute;
    right: 4%;
    bottom: 0;
}
</style>
<script>
import { GetAdministratorUserInformation, DeleteAdministratorUserInformation ,changeInformation,AddUserInformation} from '../../api/index';
export default {
    data() {
        return {
            tableData: [],
            iconFormVisible: false,
            userInfo: {},
            dialogTitle: '增加',
            rowIndex: null,
            
        };
    },
    created() {
        
        GetAdministratorUserInformation(0).then((returndata) => {
            if (returndata.code == 200) {
                var data = returndata.info;
                // console.log(data)
                this.tableData = data;
                
            }
                console.log(this.tableData)
        });
    },
    methods: {
        handleDelete(scope) {
            // console.log(scope)
            DeleteAdministratorUserInformation(scope).then((returndata) => {
                if(returndata.code=="200"){

                    let data = returndata.info;
                       
                    this.tableData= data;
                    window.location.reload();
                }
            });
            
        },
            // 修改
        handleEdit(index, row) {
            
            
        this.dialogTitle = '修改';
        
        this.userInfo = row;
        this.iconFormVisible = true;
        this.rowIndex = index;
        
        },
        // 弹窗确定
        submitUser() {
            if (this.dialogTitle === '修改') {
                // console.log(this.tableData,"2314124",this.rowIndex,"aaa",this.userInfo)
                // this.tableData.splice(this.rowIndex, 1, this.userInfo);
                this.iconFormVisible = false;
                
                let userID=this.userInfo.id
                let data=this.userInfo
                
            changeInformation(userID,data).then(returndata=>{
                if(returndata.code==200){
                    
                    let retdata=returndata.info;
                    
                    
                    this.tableData.splice(this.rowIndex,1,{password:retdata.password,name:retdata.name,id:retdata.id})
                }
                
            })
                return;
                  
            }
            
            this.iconFormVisible = false;
            if(this.dialogTitle === '添加'){
                this.iconFormVisible = false;
                this.adduser=this.userInfo
                this.adduser.type="User"
                this.adduser.userType="0"
                this.userInfo={}
                
                AddUserInformation(this.adduser).then(returndata=>{
                    
                    
                    if(returndata.code==200){

                        let data=returndata.info
                        
                        this.tableData.unshift(data)
                    }
                   
                })

                
            }
            
        },
        addmessage(){
            this.dialogTitle = '添加';
            this.iconFormVisible = true;


        }
    }
};
</script>
