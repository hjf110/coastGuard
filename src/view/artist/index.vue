<template>
    <div>
        <el-card class="box-card">
            <el-input style="width: 180px;margin: 0 10px;" autocomplete="off" placeholder="查询"
                      v-model="table.select.name"></el-input>
            <el-button type="primary" @click="reloadTable" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="add" >新增</el-button>

            <el-table v-loading="table.loading" :data="table.tableData" border
                      style="width: 100%;margin-top: 10px;margin-bottom: 10px;">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column prop="content" label="文章内容"></el-table-column>
                <el-table-column prop="createrid" label="信息员ID"></el-table-column>
                <el-table-column prop="creatername" label="作者"></el-table-column>
                <el-table-column prop="createtime" label="创建时间"></el-table-column>
                <el-table-column prop="module" label="所属模块"></el-table-column>
                <el-table-column prop="picture" label="图片地址"></el-table-column>
                <el-table-column prop="publishtime" label="发布时间"></el-table-column>
                <el-table-column prop="substract" label="梗要预览"></el-table-column>
                <el-table-column prop="teamid" label="所属编队"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="valid" label="是否有效"></el-table-column>
                <el-table-column prop="weburl" label="页面详情地址"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button size="mini" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="table.select.page"
                    :page-size="table.select.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="table.total"
            >
            </el-pagination>
        </el-card>

        <el-dialog
                :visible.sync="pop.form"
                width="30%"
        >
            <date-form ref="dateForm" :type="settings.form.type" :close="closeForm"></date-form>
        </el-dialog>

    </div>
</template>

<script>
    import main from '@/api/artist';
    import dateForm from './components/dateForm.vue';


    export default {
        name: 'index',
        components: {
            dateForm
        },
        data() {
            return {
                pop: {
                    form: false
                },
                table: {
                    select: {
                        page: 1,
                        limit: 20
                    },
                    loading: false,
                    total: 0,
                    tableData: []
                },
                settings: {
                    form: {
                        type: 1
                    },
                    peopleInfo: [], //所有用户信息用作下拉
                    ddDepartment: [] //获取所有部门下拉
                }

            };
        },
        computed: {},
        methods: {
            setTableDate() {
                this.table.loading = true;
                main.list(this.table.select).then(res => {
                    // console.log('1111111111111====', res);
                    this.table.tableData = res.data;
                    this.table.total = res.count;
                    this.table.loading = false;
                }).catch(err => {
                    this.$message.error(err);
                    this.table.loading = false;
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.table.select.limit = val;
                this.setTableDate();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.table.select.page = val;
                this.setTableDate();
            },
            reloadTable() {
                //重载表格
                this.table.select.page = 1;
                this.setTableDate();
            },
            handleEdit(index, row) {
                //修改
                console.log(index, row);

            },
            handleDelete(index, row) {
                //删除
                console.log(index, row);

            },
            closeForm(){
                this.pop.form = false;
                this.reloadTable();
            },
            add() {//添加
                this.settings.form.type = 1;
                this.pop.form = true;
                this.$nextTick(()=>{
                    this.$refs['dateForm'].clearForm();
                });
            },
            edit(data) {//编辑
                this.settings.form.type = 2;
                this.pop.form = true;
                this.$nextTick(()=>{
                    this.$refs['dateForm'].clearForm();
                    this.$refs['dateForm'].setForm(data);
                });
            },
            del(id){
                this.$confirm('此操作将永久该记录 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    main.del({id:id}).then(res=>{
                        this.$message.success('删除成功');
                        this.reloadTable();//重载表格
                    }).catch(err=>{

                    });
                }).catch(() => {

                });

            }
        },
        created() {
            setTimeout(() => {
                this.setTableDate(); //获取表格数据
            }, 100);
        },
        mounted() {
        }
    };
</script>

<style scoped>
    .el-select {
        width: 100%;
    }
</style>
