<template>
    <div id="box">
        <table class="system">
            <thead>
                <tr>
                    <th>系统参数名称</th>
                    <th>系统参数</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{optiondata.name}}</td>
                    <td>
                        <el-select v-model="value" placeholder="请选择" @change="variation">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.text"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </td>
                </tr>
                
                <tr v-for="(item,i) in tabledata" :key="i.length">
                    <td>{{item.name}}</td>
                    <td>
                        <el-radio-group v-model="item.value" @change="variation">
                            <el-radio :label="0">hidden</el-radio>
                            <el-radio :label="1">show</el-radio>
                            
                        </el-radio-group>
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { GetSystemSettings ,updateSystem} from '../../api/index';
import systemSetup1 from '@/components/common/radioButton';



export default {
    data() {
        return {
            tabledata: [],
            optiondata: [],
            value:'',
            options:[]
        };
    },
    components: {
        systemSetup1
    },
    created() {
        GetSystemSettings().then((returndata) => {
           let data = returndata.info;
           console.log(data)

            for (var i in data) {
                
                if (data[i].dataType == 'boolean') {
                    this.tabledata.push(data[i]);
                    

                }
                if (data[i].dataType.type == 'enum') {
                    this.optiondata = data[i];
                    this.options = this.optiondata.dataType.options;
                    this.value=this.optiondata.value
                }
            }
            // console.log(this.radio)
            // console.log(this.tabledata)

            // console.log(this.optiondata.dataType.options)
        });
    },
    methods: {
        variation(){
            // console.log(this.optiondata.value)
            // console.log(this.value)
            this.optiondata.value=this.value
            const updataArray=this.tabledata.concat(this.optiondata)
            const updataobj={}
            // console.log(updataArray)
            
           for(var i in updataArray){
               delete updataArray[i].dataType
               updataobj[updataArray[i].name]=updataArray[i].value
              
           }
        //    console.log(updataobj)
            updateSystem(updataobj).then(returndata=>{
                if(returndata.code=="200"){
                    let data = returndata.info;
                    
                    console.log(data)
                    this.tabledata.splice(0,data.length)

                        for (var i in data) {
                            
                            if (data[i].dataType == 'boolean') {
                                this.tabledata.push(data[i]);
                            }
                            
                            
                        }
                        window.location.reload(); 
                }
            })
        }
    },
    
    
    
};
</script>
<style >
html,
body,
#box {
    height: 100%;
    width: 100%;
}

.system,
thead,
tbody {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
}
.system thead th {
    width: 50%;

    padding: 10px 0;
}
.system tbody td {
    width: 50%;
    border: 1px solid #000;
    height: 40px;
}
</style>