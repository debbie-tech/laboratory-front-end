<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <!-- 简单搜索 -->
      <div class="filter-container-conditions" style="margin: 2px">
        <el-input v-model="queryList.property_name" placeholder="资产名称" style="width: 230px;" clearable>
          <template slot="prepend">资产名称</template>
        </el-input>
        <el-select v-model="queryList.user_id" style="width: 160px;" placeholder="出借人" filterable clearable @change="handleFilter">
          <!--获取数据库信息动态生成option-->
          <!--
          <el-option v-for="item in CategoryList" :key=item.id :label="item.name" :value="item.id" >
            <span style="float: left">编号:{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
          </el-option>
          -->
          <el-option key="1" label="出借人1" value="1" />
          <el-option key="0" label="出借人2" value="0" />
        </el-select>
        <el-date-picker
          v-model="queryList.start_date"
          type="date"
          placeholder="出借日期"
          style="width: 150px">
        </el-date-picker>
        <el-select v-model="queryList.status" style="width: 120px;" placeholder="出借状态" filterable clearable @change="handleFilter">
          <!--获取数据库信息动态生成option-->
          <!--
          <el-option v-for="item in CategoryList" :key=item.id :label="item.name" :value="item.id" >
            <span style="float: left">编号:{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
          </el-option>
          -->
          <el-option key="0" label="正在出借" value="0" />
          <el-option key="1" label="已归还" value="1" />
          <el-option key="2" label="丢失" value="2" />
        </el-select>
        <el-button-group>
          <el-button type="primary"  size="medium" @click="handleFilter">搜索</el-button>
        </el-button-group>
      </div>
      <!-- 功能按钮 -->
      <div class="button-filter-container">
        <el-button-group>
          <el-button type="primary"  size="medium" @click="showDetailSearchBtn = !showDetailSearchBtn">
            高级搜索
          </el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary"  size="medium" @click="handleCreate">
            添加
          </el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary"  size="medium" @click="handleBatchCreate">
            导入
          </el-button>
          <el-button type="primary"  size="medium" :loading="downloadLoading" @click="handleDownload">
            导出
          </el-button>
        </el-button-group>
      </div>
    </div>
    <!-- 浮动高级搜索区域 -->
    <el-dialog :visible.sync="showDetailSearchBtn" width="95%" :show-close="false">
      <span class="my-dialog-title" slot="title">高级搜索</span>
      <div class="DetailSearch_son">
        <el-row class="DetailSearch_son_row">
          <!-- 资产名称 -->
          <el-col :span="6">
            <el-input v-model="queryList.property_name" placeholder="资产名称" style="width: 300px;" clearable>
              <template slot="prepend">资产名称</template>
            </el-input>
          </el-col>
          <!-- 出借人 -->
          <el-col :span="6">
            <el-select v-model="queryList.user_id" style="width: 300px;" placeholder="出借人" filterable clearable @change="handleFilter">
              <!--获取数据库信息动态生成option-->
              <!--
              <el-option v-for="item in CategoryList" :key=item.id :label="item.name" :value="item.id" >
                <span style="float: left">编号:{{ item.id }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
              </el-option>
              -->
              <el-option key="1" label="出借人1" value="1" />
              <el-option key="0" label="出借人2" value="0" />
            </el-select>
          </el-col>
          <!-- 出借开始日期 -->
          <el-col :span="6">
            <el-date-picker
              v-model="queryList.start_date"
              type="date"
              placeholder="出借开始日期"
              style="width: 300px">
            </el-date-picker>
          </el-col>
          <!-- 出借截止日期 -->
          <el-col :span="6">
            <el-date-picker
              v-model="queryList.end_date"
              type="date"
              placeholder="出借截止日期"
              style="width: 300px">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <!-- 出借归还日期-->
          <el-col :span="6">
            <el-date-picker
              v-model="queryList.return_date"
              type="date"
              placeholder="归还日期"
              style="width: 300px">
            </el-date-picker>
          </el-col>
          <!-- 出借状态 -->
          <el-col :span="6">
            <el-select v-model="queryList.status" style="width: 300px;" placeholder="出借状态" filterable clearable @change="handleFilter">
              <!--获取数据库信息动态生成option-->
              <!--
              <el-option v-for="item in CategoryList" :key=item.id :label="item.name" :value="item.id" >
                <span style="float: left">编号:{{ item.id }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
              </el-option>
              -->
              <el-option key="0" label="正在出借" value="0" />
              <el-option key="1" label="已归还" value="1" />
              <el-option key="2" label="丢失" value="2" />
            </el-select>
          </el-col>
          <!-- 资产种类 -->
          <el-col :span="6">
            <el-select v-model="queryList.lab_property_category_id" style="width: 300px;" placeholder="资产种类" filterable clearable @change="handleFilter">
              <!--获取数据库信息动态生成option-->
              <!--
              <el-option v-for="item in CategoryList" :key=item.id :label="item.name" :value="item.id" >
                <span style="float: left">编号:{{ item.id }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
              </el-option>
              -->
              <el-option key="1" label="种类1" value="1" />
              <el-option key="0" label="种类2" value="0" />
            </el-select>
          </el-col>
          <!-- 出借数量 -->
          <el-col :span="6">
            <el-input v-model="queryList.quantity" placeholder="出借数量" style="width: 300px;" clearable>
              <template slot="prepend">出借数量</template>
            </el-input>
          </el-col>
        </el-row>
        <!-- 按钮定位 -->
        <div class="DetailSearch_button">
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
          </el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-close" @click="handleClose">
            取消
          </el-button>
        </div>

      </div>
    </el-dialog>
    <!-- table区域 -->
    <!-- 表格错位问题 设置全局样式 -->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-click="handleDetail"
      :header-cell-style="{'font-size': '17px'}"
    >
      <el-table-column
        label="序号"
        type="index"
        width="70"
        align="center"
      />
      <el-table-column
        prop="lab_num"
        label="资产名称"
        width="auto"
      />
      <el-table-column
        prop="lab_name"
        label="出借人"
        width="auto"
      />
      <el-table-column
        prop="lab_category"
        label="资产状态"
      />
      <el-table-column
        prop="lab_cur_equip_num"
        label="出借时间"
      />
      <el-table-column
        prop="lab_inCharge"
        label="归还时间"
      />
    </el-table>
    <!-- 分页栏 -->
    <pagination v-show="total > 0"
                :total="100"
                :page.sync="pageNum"
                :limit.sync="pageSize"
    />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  const fakeData = {

  }
  //假数据列表
  const fakeDataList = [ {...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData} ]
  export default {
    components: {
      Pagination
    },
    name: 'property-list',
    data() {
      return {
        /* 表格参数 */
        tableData: null,
        listLoading: true,
        /* 分页参数 待修改 */
        total: 100,
        pageNum: 1,
        pageSize: 20,
        /* 类别信息列表 */
        CategoryList: [],
        /* 导出excel相关参数 */
        downloadLoading: false,
        /* 查询条件 */
        queryList: {
          id: null,
          lab_property_id: null,
          lab_property_category_id: null,
          property_name: null,
          user_id: null,
          status: null,
          quantity: null,
          start_date: null,
          end_date: null,
          return_date: null
        },
        /* 是否显示高级搜索 */
        showDetailSearchBtn: false
      }
    },
    methods: {
      /* 获取列表信息 */
      getTableList() {
        this.tableData = fakeDataList
        this.listLoading = false
      },
      /* 详情 */
      handleDetail(row, column, event) {
        console.log('handleDetail')
        this.$router.push({
          name: 'Property_Detail',
          query:{
            id: row.id
          }
        })
      },
      /* 查找 */
      handleFilter() {

      },
      /* 导出Excel */
      handleDownload() {

      },
      /* 跳转添加资产出借信息页面 */
      handleCreate() {
        console.log('handleCreate')
        this.$router.push({
          name: ''
        })
      },
      /* 批量添加 */
      handleBatchCreate() {

      },
      /* 管理高级搜索 */
      handleClose() {
        // 清空旧数据
        for (const key in this.queryList) {
          this.queryList[key] = null
        }
        // 关闭
        this.showDetailSearchBtn = false
      }
    },
    /* 页面创建时，加载数据 */
    created() {
      this.getTableList()
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<!-- 高级搜索样式 -->
<style>
  .my-dialog-title{
    font-size: 20px;
    font-weight: 700;
  }
  .DetailSearch {
    overflow:hidden;
    margin-top: 10px;
    margin-bottom: 10px;
    -webkit-box-shadow: #CCCCCC 0px 0px 5px;
    -moz-box-shadow: #CCCCCC 0px 0px 5px;
    box-shadow: #CCCCCC 0px 0px 5px;
  }
  .DetailSearch_son {
    margin : 10px;
  }
  .DetailSearch_son_row {
    margin-bottom: 10px;
  }
  .DetailSearch_button {
    margin: 30px 10px 0px;
    text-align: right;
  }
</style>
<!-- 功能栏样式 -->
<style scoped>
  .filter-container {
    margin-bottom: 70px;
  }
  .FunctionBtn {
    overflow:hidden;
    margin-top: 10px;
    margin-bottom: 10px;
    -webkit-box-shadow: #CCCCCC 0px 0px 5px;
    -moz-box-shadow: #CCCCCC 0px 0px 5px;
    box-shadow: #CCCCCC 0px 0px 5px;
  }
  .FunctionBtn_Son {
    display: inline-block;
    margin : 5px;
  }
  .button-filter-container {
    display: inline-block;
    margin: 5px;
    float: right;
  }
  .filter-container-conditions {
    float: left;
    display: inline-block;
  }
</style>

