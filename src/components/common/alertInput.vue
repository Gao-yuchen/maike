<template>
    <div>
        <el-dialog title="添加" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="添加名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="添加类型" :label-width="formLabelWidth">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in form.type"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogForm">确 定</el-button>
            </div>
        </el-dialog>
        <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
    </div>
</template>
<script>
export default {
    props: {
        forChildData: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            dialogFormVisible: false,
            form: {
                name: '',
                type: []
            },
            value: '',
            formLabelWidth: '120px'
        };
    },

    methods: {
        dialogForm() {
            this.dialogFormVisible = !this.dialogFormVisible;
            let params = {
                name: this.form.name,
                value: this.value
            };
            this.$emit('childFn', params);
        },
        parentHandleclick(e) {
            console.log(e);
            this.form.name = '';
            this.form.type = [];
            this.form.type = e.type;
            this.value = this.form.type[0];
            this.dialogFormVisible = e.show;
        }
    }
};
</script>
<style scoped>
</style>