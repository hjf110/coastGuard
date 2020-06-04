<template>
    <div>
        <el-card class="box-card">
            <!--            <el-button @click="add" icon="el-icon-plus">新增</el-button>-->
            <el-table
                v-loading="table.loading"
                :data="table.tableData"
                border
                row-key="id"
                :default-expand-all="false"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                style="width: 100%;margin-top: 10px;margin-bottom: 10px;"
            >
                <el-table-column prop="name" label="部门名称"></el-table-column>
                <el-table-column prop="departmentId" label="钉钉部门ID"></el-table-column>
                <el-table-column prop="parent" label="钉钉父部门ID"></el-table-column>
                <el-table-column label="是否禁用">
                    <template slot-scope="scope">
                        <div @click="changeLocked(scope.row)">
                            <el-switch
                                v-model="scope.row.locked"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                :active-value="false"
                                :inactive-value="true"
                            ></el-switch>
                        </div>
                        <!--                        <div @click="changeLocked(scope.row)">-->
                        <!--                            <el-radio-group v-model = "scope.row.locked" >-->
                        <!--                              <el-radio :label = "false" border >启用</el-radio >-->
                        <!--                              <el-radio :label = "true" border >禁用</el-radio >-->
                        <!--                            </el-radio-group >-->
                        <!--                        </div>-->
                    </template>
                </el-table-column>
                <!--                <el-table-column label="操作">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <el-button-->
                <!--                                size="mini"-->
                <!--                                @click="handleEdit(scope.$index, scope.row)">查看与编辑-->
                <!--                        </el-button>-->
                <!--                        <el-button-->
                <!--                                size="mini"-->
                <!--                                type="danger"-->
                <!--                                @click="handleDelete(scope.$index, scope.row)">删除-->
                <!--                        </el-button>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
            </el-table>
            <!--            <el-pagination-->
            <!--                    @size-change="handleSizeChange"-->
            <!--                    @current-change="handleCurrentChange"-->
            <!--                    :current-page="table.page"-->
            <!--                    :page-size="table.limit"-->
            <!--                    layout="total, sizes, prev, pager, next, jumper"-->
            <!--                    :total="table.total"-->
            <!--            >-->
            <!--            </el-pagination>-->
            <!--            部门的组织架构图-->

            <!--             <el-tree-->
            <!--                     :data = "treeDdDept"-->
            <!--                     accordion-->
            <!--             >-->
            <!--                 <span   class = "custom-tree-node" slot-scope = "{ node, data }" >-->
            <!--                   <span >{{ node.label }}</span >-->
            <!--                   <span style="position: relative;left: 80px;" >-->
            <!--                      <el-button-->
            <!--                              type = "text"-->
            <!--                              size = "mini"-->
            <!--                              @click = "() => append(data)" >-->
            <!--                        添加-->
            <!--                      </el-button >-->
            <!--                      <el-button-->
            <!--                              type = "text"-->
            <!--                              size = "mini"-->
            <!--                              @click = "() => remove(node, data)" >-->
            <!--                        删除-->
            <!--                      </el-button >-->
            <!--                   </span >-->
            <!--                 </span >-->
            <!--             </el-tree >-->
        </el-card>

        <el-dialog
            v-dialogDrag
            :title="settings.form.type === 1 ? '添加账号' : '修改账号'"
            :visible.sync="settings.form.show"
            width="300px"
        >
            <el-form :model="form" label-width="auto">
                <el-form-item label="父部门">
                    <el-select v-model="form.parent" filterable placeholder="请选择部门">
                        <el-option
                            v-for="(item, idx) in settings.ddDepartment"
                            :key="idx"
                            :label="item.name"
                            :value="item.departmentId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门ID">
                    <el-input v-model="form.departmentId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="settings.form.type === 2" label="是否锁定">
                    <el-switch
                        v-model="form.locked"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="false"
                        :inactive-value="true"
                    ></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="settings.form.show = false">取 消</el-button>
                <el-button type="primary" :loading="settings.form.loading" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ddUser from '@/api/ddUser';
import ddDepartment from '@/api/ddDepartment';

export default {
    name: 'index',
    data() {
        return {
            table: {
                loading: false,
                page: 1,
                limit: 100000,
                total: 0,
                tableData: []
            },
            settings: {
                form: {
                    type: 1,
                    show: false,
                    loading: false
                },
                peopleInfo: [], //所有用户信息用作下拉
                ddDepartment: [], //获取所有部门下拉,
                treeDdDept: [] //部门树状图
            },
            treeDdDept: [],
            form: {
                departmentId: '', //部门id
                locked: false, //是否锁定
                name: '', //姓名
                parent: '', //钉钉父部门id
                id: ''
            }
        };
    },

    methods: {
        getPeopleInfo() {
            //获取总账号下拉
            ddUser
                .list({ page: 1, limit: 200000 })
                .then(res => {
                    // console.log('1111111111111====', res);
                    //this.table.tableData = res.data;
                    let list2 = res.data;
                    list2.forEach((obj, idx) => {
                        if (!obj.parent) {
                            this.settings.peopleInfo.push(obj);
                        }
                    });
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        getDdDepartment() {
            //获取总账号下拉
            ddDepartment
                .list({ page: 1, limit: 200000 })
                .then(res => {
                    this.settings.ddDepartment = res.data;
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        setTableDate() {
            this.table.loading = true;
            ddDepartment
                .list({ page: this.table.page, limit: this.table.limit })
                .then(res => {
                    // console.log('1111111111111====', res);
                    // this.settings.treeDdDept = res.data;
                    this.table.tableData = this.getParent(res.data);
                    console.log('数据表格的数据为----------------', this.table.tableData);
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
            this.table.limit = val;
            this.setTableDate();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.table.page = val;
            this.setTableDate();
        },
        reloadTable() {
            //重载表格
            this.table.page = 1;
            this.setTableDate();
        },
        handleEdit(index, row) {
            //修改
            console.log(index, row);
            this.form = row;
            this.settings.form.type = 2;
            this.settings.form.show = true;
        },
        handleDelete(index, row) {
            //删除
            console.log(index, row);
            ddUser
                .del({ id: row.id })
                .then(res => {
                    this.$message.success('删除成功');
                    this.table.tableData.splice(index, 1);
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        add() {
            this.settings.form.type = 1;
            this.settings.form.show = true;
            this.form = {
                departmentId: '', //部门id
                locked: false, //是否锁定
                name: '', //姓名
                unionid: '', //用户唯一ID
                id: ''
            };
        },
        changeLocked(data) {
            console.log(data);
            // data.locked = !data.locked;
            let formData = {
                id: data.id,
                locked: data.locked
            };
            ddDepartment
                .edit(formData)
                .then(res => {
                    // console.log(res);
                    //this.settings.form.loading = false;
                    this.$message.success(!data.locked ? '启用成功' : '禁用成功');
                    // this.reloadTable();
                    // this.settings.form.show = false;
                })
                .catch(err => {
                    this.$message.error(err);
                    //this.settings.form.loading = false;
                });
        },
        submit() {
            this.settings.form.loading = true;
            if (this.settings.form.type === 1) {
                ddDepartment
                    .add(this.form)
                    .then(res => {
                        console.log(res);
                        this.settings.form.loading = false;
                        this.$message.success('添加成功');
                        this.reloadTable();
                        this.settings.form.show = false;
                    })
                    .catch(err => {
                        this.$message.error(err);
                        this.settings.form.loading = false;
                    });
            } else {
                ddDepartment
                    .edit(this.form)
                    .then(res => {
                        console.log(res);
                        this.settings.form.loading = false;
                        this.$message.success('修改成功');
                        this.reloadTable();
                        this.settings.form.show = false;
                    })
                    .catch(err => {
                        this.$message.error(err);
                        this.settings.form.loading = false;
                    });
            }
        },
        getDepInfo() {
            ddDepartment
                .list({ page: 1, limit: 1000000 })
                .then(res => {
                    // console.log('1111111111111====', res);
                    console.log('获得的所有部门为-----', res.data);
                    this.settings.treeDdDept = res.data;

                    // let treeList = this.getTree(1);
                    //
                    // console.log('获得的部门树状图为----',treeList);
                    this.treeDdDept = this.getParent();
                    //console.log('父部门为---', this.getParent())
                })
                .catch(err => {});
        },
        //获取最大的父节点
        getParent(allList) {
            let list = [];
            allList.forEach((obj, idx) => {
                if (!obj.parent) {
                    obj.children = this.getTree(1, allList);
                    list.push(obj);
                }
            });
            return list;
        },
        //获取部门的树形数据
        getTree(pid, list) {
            const that = this;
            //let list = this.settings.treeDdDept;
            // console.log('进入了--------------');
            //app.tosort(list,"headerSort",true);
            let treeList = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].parent == pid) {
                    list[i].children = that.getTree(list[i].departmentId, list);
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
        // 添加节点
        append(data) {
            const newChild = { id: id++, label: 'testtest', children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },
        //删除节点
        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        }
    },
    created() {
        setTimeout(() => {
            this.setTableDate(); //获取表格数据
        }, 100);
        this.getDdDepartment(); //获取所有部门下拉
        //this.getDepInfo();//获取部门信息
    },
    mounted() {}
};
</script>

<style scoped>
.el-select {
    width: 100%;
}
</style>
