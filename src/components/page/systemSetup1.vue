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
                    <td>ApplicationType</td>
                    <td>
                        <el-select v-model="fromdata.ApplicationType" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr >
                    <td>SystemName</td>
                    <td>
                        {{fromdata.SystemName}}
                    </td>
                </tr>
                <tr>
                    <td>LightingDisplay</td>
                    <td>
                        <el-radio v-model="fromdata.LightingDisplay" :label="0" >show</el-radio>
                        <el-radio v-model="fromdata.LightingDisplay" :label="1" >hidden</el-radio>
                    </td>
                </tr>
                <tr>
                    <td>TemperatureDisplay</td>
                    <td>
                        <el-radio v-model="fromdata.TemperatureDisplay" :label="0" >show</el-radio>
                        <el-radio v-model="fromdata.TemperatureDisplay" :label="1" >hidden</el-radio>
                    </td>
                </tr>
                <tr>
                    <td>HumidityDisplay</td>
                    <td>
                        <el-radio v-model="fromdata.HumidityDisplay" :label="0" >show</el-radio>
                        <el-radio v-model="fromdata.HumidityDisplay" :label="1" >hidden</el-radio>
                    </td>
                </tr>
                <tr>
                    <td>CO2Display</td>
                    <td>
                        <el-radio v-model="fromdata.CO2Display" :label="0" >show</el-radio>
                        <el-radio v-model="fromdata.CO2Display" :label="1" >hidden</el-radio>
                    </td>
                </tr>
                <tr>
                    <td>PM25Display</td>
                    <td>
                        <el-radio v-model="fromdata.PM25Display" :label="0" >show</el-radio>
                        <el-radio v-model="fromdata.PM25Display" :label="1" >hidden</el-radio>
                    </td>
                </tr>
                <tr>
                    <td>VOCDisplay</td>
                    <td>
                        <el-radio v-model="fromdata.VOCDisplay" :label="0" >show</el-radio>
                        <el-radio v-model="fromdata.VOCDisplay" :label="1" >hidden</el-radio>
                    </td>
                </tr>
                <tr>
                    <td>FireSystemName</td>
                    <td>{{fromdata.FireSystemName}}</td>
                </tr>
                <tr>
                    <td>FireDeviceDisplay</td>
                    <td>
                        <el-radio v-model="fromdata.FireDeviceDisplay" :label="0" >show</el-radio>
                        <el-radio v-model="fromdata.FireDeviceDisplay" :label="1" >hidden</el-radio>
                    </td>
                </tr>
                <tr>
                    <td>FireDisplay</td>
                    <td>
                        <el-radio v-model="fromdata.FireDisplay" :label="0" >show</el-radio>
                        <el-radio v-model="fromdata.FireDisplay" :label="1" >hidden</el-radio>
                    </td>
                </tr>
                <tr>
                    <td>FaultDisplay</td>
                   <td>
                        <el-radio v-model="fromdata.FaultDisplay" :label="0" >show</el-radio>
                        <el-radio v-model="fromdata.FaultDisplay" :label="1" >hidden</el-radio>
                        
                    </td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>{{fromdata.name}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { GetSystemSettings } from '../../api/index';
import systemSetup1 from '@/components/common/radioButton'
export default {
    data() {
        return {
            tabledata:[
            ],
            options: [
                {
                    value: '0',
                    label: 'Meeting room management',
                    
                },
                {
                    value: '1',
                    label: 'Comfort control'
                },
                {
                    value: '2',
                    label: 'Environmental monitor'
                }
            ],
            fromdata:{

                ApplicationType: "",//下拉菜单默认值
                SystemName: "",
                LightingDisplay:"",
                TemperatureDisplay: "",
                HumidityDisplay: "",
                CO2Display: "",
                PM25Display: "",
                VOCDisplay: "",
                FireSystemName: "",
                FireDeviceDisplay: "",
                FireDisplay: "",
                FaultDisplay: "0",
                name: "",
                ApplicationTypepassword: ""
            }

            
            


        };
    },
    components:{
        systemSetup1
    },
    watch:{
        fromdata:{
            
        }
    },
    created() {
        GetSystemSettings().then((returndata) => {
            let data = returndata.info;
            
            
                this.tabledata=data
                this.fromdata.ApplicationType= this.tabledata.ApplicationType,//下拉菜单默认值
                this.fromdata.SystemName= this.tabledata.SystemName,
                this.fromdata.LightingDisplay= this.tabledata.LightingDisplay,
                this.fromdata.TemperatureDisplay= this.tabledata.TemperatureDisplay,
                this.fromdata.HumidityDisplay=this. tabledata.HumidityDisplay,
                this.fromdata.CO2Display= this.tabledata.CO2Display,
                this.fromdata.PM25Display= this.tabledata.PM25Display,
                this.fromdata.VOCDisplay= this.tabledata.VOCDisplay,
                this.fromdata.FireSystemName= this.tabledata.FireSystemName,
                this.fromdata.FireDeviceDisplay=this. tabledata.FireDeviceDisplay,
                this.fromdata.FireDisplay=this. tabledata.FireDisplay,
                this.fromdata.FaultDisplay=this. tabledata.FaultDisplay,
                this.fromdata.name=this. tabledata.name,
                this.fromdata.ApplicationTypepassword= this.tabledata.ApplicationTypepassword
                console.log(data)
                


            
            
            
        });
    },
    methods:{
        
    }
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
    border-collapse:collapse;
}
.system thead th {
    width: 50%;
    background-color: #fff;
    padding: 10px 0;
    border: 1px solid #000;

}
.system tbody td {
    width: 50%;
    border: 1px solid #000;
    height: 40px;
}
</style>