<template>
    <div >
        
            <el-radio v-model="radio" label="0" >show</el-radio>
            <el-radio v-model="radio" label="1" >hidden</el-radio>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
           radio:"1"
            
        }
    },
    methods:{
        showdata(radio){
            
        }
    }
}
</script>