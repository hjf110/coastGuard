<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="formData.icon" placeholder="请输入图标" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="跳转地址" prop="url">
        <el-input v-model="formData.url" placeholder="请输入跳转地址" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button  :loading="loading"  type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import main from '@/api/sidelink';
export default {
  components: {},
  props: {
    type: Number,
    close: Function
  },
  data() {
    return {
      loading: false,
      formData: {
        id:'',
        name: undefined,
        icon: undefined,
        url: undefined,
      },
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        icon: [{
          required: true,
          message: '请输入图标',
          trigger: 'blur'
        }],
        url: [{
          required: true,
          message: '请输入跳转地址',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    clearForm() {//清空表单
      this.formData.id = '';
      this.formData.name = '';
      this.formData.icon = '';
      this.formData.url = '';
    },
    setForm(date) {//赋值表单
      this.formData.id = date.id;
      this.formData.name = date.name;
      this.formData.icon = date.icon;
      this.formData.url = date.url;
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return;
        // TODO 提交表单
        console.log(this.formData);
        this.loading = true;
        if (this.type === 1) {//添加表单
          main.add(this.formData).then(res => {
            this.close();
            this.loading = false;
          }).catch(err => {
            this.loading = false;
            this.$message.error(err);
          });
        } else if (this.type === 2) {
          main.edit(this.formData).then(res => {
            this.close();
            this.loading = false;
          }).catch(err => {
            this.loading = false;
            this.$message.error(err);
          });
        }
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}

</script>
<style>
</style>
