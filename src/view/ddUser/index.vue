<template>
    <div>
        <el-card class="box-card">
            <el-input
                style="width: 180px;margin: 0 10px;"
                autocomplete="off"
                placeholder="输入要查询的人员姓名"
                v-model="table.select.name"
            ></el-input>
            <el-button type="primary" @click="reloadTable" icon="el-icon-search">查询</el-button>
            <!--            <el-button @click = "add" icon = "el-icon-plus">新增</el-button>-->
            <el-table v-loading="table.loading" :data="table.tableData" border style="width: 100%;margin-top: 10px;margin-bottom: 10px;">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <!--                <el-table-column prop = "departmentId" label = "部门ID"/>-->
                <el-table-column prop="placepoint" label="权限"></el-table-column>
                <el-table-column prop="street" label="类型"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <!--                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除 </el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="table.page"
                :page-size="table.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table.total"
            >
            </el-pagination>
        </el-card>

        <el-dialog
            v-dialogDrag
            :title="settings.form.type === 1 ? '添加账号' : '修改账号'"
            :visible.sync="settings.form.show"
            width="300px"
        >
            <el-form :model="form" label-width="auto">
                <!--                <el-form-item label="部门">-->
                <!--                    <el-select v-model="form.departmentId" filterable placeholder="请选择部门">-->
                <!--                        <el-option-->
                <!--                            v-for="(item, idx) in settings.ddDepartment"-->
                <!--                            :key="idx"-->
                <!--                            :label="item.name"-->
                <!--                            :value="item.departmentId"-->
                <!--                        ></el-option>-->
                <!--                    </el-select>-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="姓名">-->
                <!--                    <el-input v-model="form.name" autocomplete="off"></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="所属区域">
                    <!--                    <el-input v-model = "form.placepoint" autocomplete = "off"/>-->
                    <el-select v-model="form.a" clearable filterable placeholder="所管区域">
                        <el-option v-for="(item, idx) in areaList" :key="idx" :label="item" :value="item"></el-option>
                        <el-option label="admin" value="admin"></el-option>
                        <el-option label="领导" value="领导"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="集中点">
                    <!--                    <el-input v-model = "form.placepoint" autocomplete = "off"/>-->
                    <el-select v-model="form.b" clearable filterable placeholder="所管区域">
                        <el-option v-for="(item, idx) in showList" :key="idx" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型">
                    <!--                    <el-input v-model = "form.placepoint" autocomplete = "off"/>-->
                    <el-checkbox-group v-model="form.ss">
                        <el-checkbox label="集中">集中</el-checkbox>
                        <el-checkbox label="居家">居家</el-checkbox>
                        <el-checkbox label="疾控">疾控</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <!--                <el-form-item v-if="settings.form.type === 2" label="是否锁定">-->
                <!--                    <el-switch-->
                <!--                        v-model="form.locked"-->
                <!--                        active-color="#13ce66"-->
                <!--                        inactive-color="#ff4949"-->
                <!--                        :active-value="false"-->
                <!--                        :inactive-value="true"-->
                <!--                    >-->
                <!--                    </el-switch>-->
                <!--                </el-form-item>-->
            </el-form>
            <div slot="footer">
                <el-button @click="settings.form.show = false">取 消</el-button>
                <el-button type="primary" :loading="settings.form.loading" @click="submit">确 定</el-button>
                <el-button type="warning" :loading="settings.form.loading" @click="clearQx">清空权限</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ddUser from '@/api/ddUser';
import ddDepartment from '@/api/ddDepartment';
import point from '@/api/point';

export default {
    name: 'index',
    data() {
        return {
            table: {
                select: {
                    name: ''
                },
                loading: false,
                page: 1,
                limit: 20,
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
                ddDepartment: [] //获取所有部门下拉
            },
            form: {
                a: '',
                b: '',
                ss: [],
                // departmentId: '', //部门id
                // locked: false, //是否锁定
                // name: '', //姓名
                unionid: '', //用户唯一ID
                placepoint: '',
                street: '',
                id: ''
            },
            pointSelect: [], //集中点下拉
            areaList: []
        };
    },
    computed: {
        showList() {
            if (this.form.a) {
                return this.pointSelect.filter(item => item.area === this.form.a);
            } else {
                return this.pointSelect;
            }
        }
    },
    methods: {
        getPoint() {
            point
                .list({ page: 1, limit: 10000 })
                .then(res => {
                    console.log('集中点---------------', res.data);
                    this.pointSelect = res.data; //集中点下拉
                    let list = [];
                    res.data.forEach(item => {
                        list.push(item.area); //存入区域字段
                    });
                    this.areaList = list.filter((element, index, self) => {
                        return self.indexOf(element) === index;
                    });
                })
                .catch(err => {});
        },
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
            ddUser
                .list({
                    page: this.table.page,
                    limit: this.table.limit,
                    name: this.table.select.name
                })
                .then(res => {
                    // console.log('1111111111111====', res);
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
            if (row.placepoint) {
                let cc = row.placepoint.split(',');
                this.form.a = cc[0];
                this.form.b = cc[1] === '--' ? '' : cc[1];
            } else {
                this.form.a = '';
                this.form.b = '';
            }
            this.form.ss = [];
            this.form.id = row.id;
            this.form.unionid = row.unionid;
            if (row.street) {
                this.form.street = row.street;
                this.form.ss = row.street.split(',');
            }
            // this.form = row;
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
                a: '',
                b: '',
                unionid: '', //用户唯一ID
                placepoint: '',
                id: ''
            };
        },
        changeLocked(data) {
            console.log(data);
            ddUser
                .edit(data)
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
            if (this.form.b && !this.form.a) {
                this.$message.error('请选择所属区域');
            } else if (!this.form.b && !this.form.a) {
                this.$message.error('请选择权限');
            } else {
                this.settings.form.loading = true;
                if (this.settings.form.type === 1) {
                    ddUser
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
                    let aa = '';
                    let bb = '';
                    if (this.form.a) {
                        //说明填了区域
                        aa = this.form.a;
                    } else {
                        aa = '--';
                    }
                    if (this.form.b) {
                        //说明填了区域
                        bb = this.form.b;
                    } else {
                        bb = '--';
                    }

                    this.form.placepoint = aa + ',' + bb;
                    this.form.street = this.form.ss.join(',');

                    ddUser
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
            }
        },
        clearQx() {
            this.settings.form.loading = true;
            this.form.placepoint = '';
            ddUser
                .edit(this.form)
                .then(res => {
                    console.log(res);
                    this.settings.form.loading = false;
                    this.$message.success('清空成功');
                    this.reloadTable();
                    this.settings.form.show = false;
                })
                .catch(err => {
                    this.$message.error(err);
                    this.settings.form.loading = false;
                });
        }
    },
    created() {
        setTimeout(() => {
            this.setTableDate(); //获取表格数据
        }, 100);
        // this.getDdDepartment(); //获取所有部门下拉
        this.getPoint(); //获取集中点
    },
    mounted() {}
};
</script>

<style scoped>
.el-select {
    width: 100%;
}
</style>
