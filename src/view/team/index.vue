<template>
    <div>
        <el-card class = "box-card">
            <el-input style = "width: 180px;margin: 0 10px;" autocomplete = "off" placeholder = "查询"
                    v-model = "table.select.name"></el-input>
            <el-button type = "primary" @click = "reloadTable" icon = "el-icon-search">查询</el-button>
            <el-button type = "primary" @click = "add">新增</el-button>
            
            <el-table v-loading = "table.loading" :data = "table.tableData" border
                    border
                    row-key = "id"
                    border
                    :default-expand-all = "false"
                    :tree-props = "{ children: 'children', hasChildren: 'hasChildren' }"
                    style = "width: 100%;margin-top: 10px;margin-bottom: 10px;">
                
                <el-table-column
                        type = "index"
                        width = "50">
                </el-table-column>
                <el-table-column prop = "name" label = "名称"></el-table-column>
                <el-table-column prop = "parent" label = "上级"></el-table-column>
                <el-table-column prop = "level" label = "级别"></el-table-column>
                <el-table-column label = "操作">
                    <template slot-scope = "scope">
                        <el-button size = "mini" @click = "edit(scope.row)">编辑</el-button>
                        <el-button size = "mini" @click = "del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--            <el-pagination-->
            <!--                    @size-change="handleSizeChange"-->
            <!--                    @current-change="handleCurrentChange"-->
            <!--                    :current-page="table.select.page"-->
            <!--                    :page-size="table.select.limit"-->
            <!--                    layout="total, sizes, prev, pager, next, jumper"-->
            <!--                    :total="table.total"-->
            <!--            >-->
            <!--            </el-pagination>-->
        </el-card>
        
        <el-dialog
                :visible.sync = "pop.form"
                width = "30%"
        >
            <date-form ref = "dateForm" :type = "settings.form.type" :close = "closeForm" :parentTeam = "realData"></date-form>
        </el-dialog>
    
    </div>
</template>

<script>
import main from '@/api/team';
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
            realData: [],//未处理的原始数据
            table: {
                select: {
                    page: 1,
                    limit: 2000
                },
                loading: false,
                total: 0,
                tableData: []//已进行分级处理的数据
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
        //获取最大的父节点
        getParent(allList) {
            let list = [];
            allList.forEach((obj, idx) => {
                if (!obj.parent) {
                    obj.children = this.getTree(obj.id, allList);
                    list.push(obj);
                }
            });
            return list;
        },
        //获取部门的树形数据
        getTree(pid, list) {
            //let list = this.settings.treeDdDept;
            // console.log('进入了--------------');
            //app.tosort(list,"headerSort",true);
            let treeList = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].parent === pid) {
                    list[i].children = this.getTree(list[i].id, list);
                    // if (cc.length > 0) {
                    //     list[i].children = cc;//子部门
                    // } else {
                    //     list[i].children = [];
                    // }
                    treeList.push(list[i]);
                }
            }
            return treeList;
        },
        setTableDate() {
            this.table.loading = true;
            main.list(this.table.select).then(res => {
                // console.info(res);
                let cc = [];
                res.data.forEach(item=>{
                    cc.push(item);
                });
                this.realData =cc ;
                // this.setRealDate(res.data);
                // let list = res.data;
                // setTimeout(()=>{
                this.table.tableData = this.getParent(res.data);
                
                // },10000);
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
        closeForm() {
            this.pop.form = false;
            this.reloadTable();
        },
        add() {//添加
            this.settings.form.type = 1;
            this.pop.form = true;
            this.$nextTick(() => {
                this.$refs['dateForm'].clearForm();
                this.$refs['dateForm'].setParent(this.realData);
            });
        },
        edit(data) {//编辑
            this.settings.form.type = 2;
            this.pop.form = true;
            this.$nextTick(() => {
                this.$refs['dateForm'].clearForm();
                this.$refs['dateForm'].setForm(data);
                this.$refs['dateForm'].setParent(this.realData);
    
            });
        },
        del(id) {
            this.$confirm('此操作将永久该记录 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                main.del({ id: id }).then(res => {
                    this.$message.success('删除成功');
                    this.reloadTable();//重载表格
                }).catch(err => {
                
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
