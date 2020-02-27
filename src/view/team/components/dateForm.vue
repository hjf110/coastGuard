<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="级别" prop="level">
        <el-select v-model="formData.level" placeholder="请选择级别" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in levelOptions" :key="index" :label="item.label"
            :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级" prop="parent">
        <el-select v-model="formData.parent" placeholder="请选择上级" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in parentOptions" :key="index" :label="item.label"
            :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="large">
        <el-button  :loading="loading" type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import main from '@/api/team';
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
        id: '',
        name: undefined,
        level: undefined,
        parent: undefined,
      },
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        level: [{
          required: true,
          message: '请选择级别',
          trigger: 'change'
        }],
        parent: [{
          required: true,
          message: '请选择上级',
          trigger: 'change'
        }],
      },
      levelOptions: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      parentOptions: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
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
      this.formData.level = '';
      this.formData.parent = '';

    },
    setForm(date) {//赋值表单
      this.formData.id = date.id;
      this.formData.name = date.name;
      this.formData.level = date.level;
      this.formData.parent = date.parent;
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
