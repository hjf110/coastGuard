<template>
    <div>
        <el-card class="box-card">
            <el-input
                style="width: 180px;margin: 0 10px;"
                autocomplete="off"
                placeholder="查询"
                v-model="table.select.name"
            ></el-input>
            <el-button type="primary" @click="reloadTable" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="add">新增</el-button>

            <el-table
                v-loading="table.loading"
                :data="table.tableData"
                border
                row-key="id"
                :default-expand-all="false"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                style="width: 100%;margin-top: 10px;margin-bottom: 10px;"
            >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="parent" label="父ID"></el-table-column>
                <el-table-column prop="sort" label="排序值（越小越在前）"></el-table-column>
                <el-table-column prop="valid" label="是否启用">
                    <template slot-scope="scope">
                        <template v-if="scope.row.valid === 1">
                            <el-tag type="success">启用</el-tag>
                        </template>
                        <template v-else>
                            <el-tag type="danger">禁用</el-tag>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button
                            v-if="!scope.row.parent"
                            type="primary"
                            @click="setArea(scope.row)"
                        >设置显示区域</el-button>
                        <el-button @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="table.select.page"
                :page-size="table.select.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table.total"
            ></el-pagination>-->
        </el-card>

        <el-dialog :visible.sync="pop.form" width="30%">
            <date-form ref="dateForm" :type="settings.form.type" :close="closeForm"></date-form>
        </el-dialog>

        <el-dialog :visible.sync="pop.area" width="30%">
            <area-form ref="areaForm" :type="settings.area.type" :close="closeForm"></area-form>
        </el-dialog>
    </div>
</template>

<script>
//接口
import main from '@/api/myModule';
import area from '@/api/area';

//组件
import dateForm from './components/dateForm.vue';
import areaForm from './components/areaForm.vue';

export default {
    name: 'index',
    components: {
        dateForm,
        areaForm
    },
    data() {
        return {
            pop: {
                form: false,
                area: false
            },
            table: {
                select: {
                    page: 1,
                    limit: 200000
                },
                loading: false,
                total: 0,
                tableData: []
            },
            settings: {
                form: {
                    type: 1
                },
                area: {
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
            main.tree()
                .then(res => {
                    // console.log('1111111111111====', res);
                    // this.table.tableData = this.$ValidateUtil.getParent(res.data);
                    this.table.tableData = res.data;

                    this.table.total = res.count;
                    this.table.loading = false;
                })
                .catch(err => {
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
            this.pop.area = false;
            this.pop.form = false;
            this.reloadTable();
        },
        add() {
            //添加
            this.settings.form.type = 1;
            this.pop.form = true;
            this.$nextTick(() => {
                this.$refs['dateForm'].clearForm();
            });
        },
        edit(data) {
            //编辑
            this.settings.form.type = 2;
            this.pop.form = true;
            this.$nextTick(() => {
                this.$refs['dateForm'].clearForm();
                this.$refs['dateForm'].setForm(data);
            });
        },
        del(id) {
            this.$confirm('此操作将永久该记录 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    main.del({ id: id })
                        .then(res => {
                            this.$message.success('删除成功');
                            this.reloadTable(); //重载表格
                        })
                        .catch(err => {});
                })
                .catch(() => {});
        },
        //设置显示区域
        setArea({ id }) {
            console.log(id);
            this.pop.area = true;
            area.list({ limit: 10000, page: 1 })
                .then(res => {
                    this.pop.area = true;

                    console.log(res);
                    if (res.data.findIndex(j => j.moduleId == id) > -1) {
                        this.settings.area.type = 2;
                        this.$nextTick(() => {
                            this.$refs['areaForm'].clearForm();
                            this.$refs['areaForm'].setForm(res.data.find(j => j.moduleId == id));
                        });
                    } else {
                        this.settings.area.type = 1;
                        this.$nextTick(() => {
                            this.$refs['areaForm'].clearForm();
                        });
                    }
                })
                .catch(err => {});
        }
    },
    created() {
        setTimeout(() => {
            this.setTableDate(); //获取表格数据
        }, 100);
    },
    mounted() {}
};
</script>

<style scoped>
.el-select {
    width: 100%;
}
</style>
