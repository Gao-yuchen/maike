<template>
    
    <div >

        <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="180" align="center"></el-table-column>
        <el-table-column prop="id" label="设备ID"  align="center"></el-table-column>
        <el-table-column prop="type" label="设备类型" align="center"></el-table-column>
        <!-- <el-table-column prop="parent.id" label="父ID" align="center"></el-table-column> -->
        <el-table-column prop="name" label="设备名称" align="center">
            
        </el-table-column>
        <el-table-column  label="操作" align="center">
            <template  slot-scope="scope">

         <el-button type="text" size="small" @click.stop="() => change(scope.row.id)">更改网关</el-button>
            </template>
        </el-table-column>

    </el-table>
    <el-dialog :title="dialogTitle" width="50%" :visible.sync="iconFormVisible">
            
                <el-select v-model="value" placeholder="请选择" >
                            <el-option
                                v-for="item in options"
                                :key="item"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="iconFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUser()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>
<script>
import { GetDeviceNetworking,changeNode } from '../../api/index';
export default {
    data(){
        return{
            
            tableData:[],
            iconFormVisible:false,
            dialogTitle:"更改网关",
            ID:"",
            value:"",
            options:[],
            parentId:"",
            parseIntname:""
        }
    },
    methods:{
        change(id){
            
            this.iconFormVisible = true;
            this.ID=id;
           

        },
        submitUser(){
            
            GetDeviceNetworking().then(data=>{
                let info=data.info
                 for( let i in info){
                     
                     if(info[i].parent.name==this.value){
                         this.parentId= info[i].parent.id
                        // console.log(info[i])
                        // this.tableData=info[i]
                     }
                    
                 }
                 
             })
            //  console.log(this.value,"-----",this.parentId)
            changeNode(this.ID,{parentId:this.parentId}).then(data=>{
                this.dialogTitle="是否确认修改"
                console.log(data)
                if(data.code==200){
                    
                
                // window.location.reload();
                this.tableData=[]
                    GetDeviceNetworking().then(data=>{
                         let tabledata=data.info
                        for(var i in tabledata){
                        //  console.log(tabledata[i].parent.id)
                            // console.log(tabledata[i].parent.id,"parentid",this.parentId)
                            if(tabledata[i].parent.name==this.parseIntname){
                                this.tableData.push(tabledata[i])
                                this.iconFormVisible = false;
                            }
                        }
                    })
                }

            })
                    
        }
    },
    beforeCreate(){
         this.$bus.$on('item', (item) => {  
            //  console.log(item)
            this.value=item
            this.parseIntname=item
             GetDeviceNetworking().then(data=>{
                //  console.log(data)
                 this.tableData=[]
                 if(data.code==200){
                      
                     var node=data.info
                     for(var i in node){
                         
                         if(node[i].parent.name==item){
                             
                             this.tableData.push(node[i])
                         }
                     }
                     let parentname=[]
                    let name=data.info
                    for(var i in name){
                        parentname.push(name[i].parent.name)
                          
                    }
                    let nodeone=new Set(parentname)
                    let nodename=Array.from(nodeone)
                    this.options=nodename
                    // console.log(this.options)
                     
                 }
                 
                     
                
             })
  })
    }

}
</script>