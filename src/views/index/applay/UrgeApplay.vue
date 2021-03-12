<template>
  <div class="applay" @click="onBlur">
      <header-bar>
        <icon slot="left" name="arrow-left"  @click="toBack" class="icons" size="24px" color="#fff"/>
        <div slot="center">
          <span class="title">紧急用车</span>
        </div>
        <div slot="right"><span class="right-text" @click="openRules">用车规则</span></div>
      </header-bar>
      <div class="form-box">
        <div class="title"><img src="@/assets/images/applay_geren.png" alt="">申请人</div>
        <cell-group>
          <p class="title-item">用车单位</p>
          <field v-model="user_dept_name" placeholder="请输入用车单位" disabled @click="chanceDept"/>
          <input type="hidden" v-model="form.apply_dept_id" name="user_dept_name" v-validate="'required'" data-vv-as="用车单位">
          <span v-show="errors2.has('user_dept_name')" class="help is-error">{{errors2.first('user_dept_name')}}</span>
        </cell-group>
        <cell-group>
          <p class="title-item">申请人</p>
          <div class="selector-box">
            <selector :value="form.apply_name_id" :options="applayUser" @change="applayUserChange" :valueMap="['id', 'user_name']"></selector>
            <input type="hidden" v-model="form.apply_name_id" name="apply_name_id" v-validate="'required'" data-vv-as="申请人">
          </div>
          <span v-show="errors2.has('apply_name_id')" class="help is-error">{{errors2.first('apply_name_id')}}</span>
        </cell-group>
        <cell-group>
           <p class="title-item">申请人电话</p>
          <field v-model="form.apply_name_phone" placeholder="请输入申请人电话" disabled/>
          <input type="hidden" v-model="form.apply_name_phone" name="apply_name_phone" v-validate="'required'" data-vv-as="申请人电话">
          <span v-show="errors2.has('apply_name_phone')" class="help is-error">{{errors2.first('apply_name_phone')}}</span>
        </cell-group>
      </div>
      <div class="form-box">
        <div class="title"><img src="@/assets/images/applay_danwei.png" alt="">用车时间</div>
        <cell-group>
           <p class="title-item">全天包车</p>
          <div class="selector-box">
            <radio-group v-model="form.is_chartered_bus" direction="horizontal">
              <radio :name="1">是</radio>
              <radio :name="0">否</radio>
            </radio-group>
          </div>
        </cell-group>
        <cell-group>
           <p class="title-item">出车时间</p>
           <div class="change-box">
             <input v-model="form.apply_use_time_str" placeholder="请输入出车时间" class="timeText" disabled/><img  @click="changeTime(0)"  src="@/assets/images/applay_time.png" alt="" style="width:24px;height:24px">
           </div>
        </cell-group>
        <cell-group>
           <p class="title-item">归队时间</p>
           <div class="change-box">
              <input v-model="form.apply_back_time_str" placeholder="请输入归队时间" class="timeText" disabled/><img  @click="changeTime(2)" src="@/assets/images/applay_time.png" alt="" style="width:24px;height:24px">
           </div>
        </cell-group>
      </div>
      <div class="form-box">
        <div class="title"><img src="@/assets/images/applay_danwei.png" alt=""> 用车信息</div>
        <cell-group>
          <p class="title-item">乘车人</p>
          <field v-model="form.yong_che_ren" maxlength="20" placeholder="请输入乘车人姓名" v-validate="'required'" data-vv-as="姓名" :name="'yong_che_ren'"/>
          <span v-show="errors2.has('yong_che_ren')" class="help is-error">{{errors2.first('yong_che_ren')}}</span>
        </cell-group>
        <cell-group>
           <p class="title-item">联系电话</p>
          <field v-model="form.apply_use_phone" maxlength="11" placeholder="请输入联系电话"  v-validate="'required|phoneRules'" data-vv-as="联系电话" :name="'apply_use_phone'"/>
          <span v-show="errors2.has('apply_use_phone')" class="help is-error">{{errors2.first('apply_use_phone')}}</span>
        </cell-group>
        <cell-group>
          <p class="title-item">乘车人数</p>
          <field v-model="form.apply_man_num" maxlength="2"  placeholder="请输入用车人数" v-validate="'required'" data-vv-as="用车人数" :name="'apply_man_num'"/>
          <span v-show="errors2.has('apply_man_num')" class="help is-error">{{errors2.first('apply_man_num')}}</span>
        </cell-group>
        <cell-group>
           <p class="title-item">服务平台</p>
          <div class="selector-box">
            <selector :value="form.apply_fwzx_id" :options="fwlist" @change="platformChange" :valueMap="['id', 'dept_name']"></selector>
          </div>
        </cell-group>
        <cell-group>
          <p class="title-item">用车性质</p>
          <div class="selector-box">
            <selector :value="form.yong_che_xz" :options="xzList" @change="natureChange" :valueMap="['id', 'xz_name']"></selector>
          </div>
        </cell-group>
        <cell-group>
          <p class="title-item">审核人</p>
          <div class="selector-box">
            <selector :value="form.audit_user_id" :options="auditUser" @change="auditorChange" :valueMap="['id', 'user_name']"></selector>
          </div>
        </cell-group>
        <div v-if="isXinghao">
          <cell-group>
            <p class="title-item">任务号</p>
            <div class="selector-box">
              <selector :value="form.object_id" :options="TaskList" @change=" taskChange" :valueMap="['objectId', 'objectName']"></selector>
            </div>
          </cell-group>
          <span v-show="errors2.has('object_id')" class="help is-error">{{errors2.first('object_id')}}</span>
        </div>
        <cell-group>
           <p class="title-item">用车事由</p>
          <div class="selector-box">
            <selector :value="form.apply_remark" :options="remarkList" @change="reasonChange" :valueMap="['id', 'apply_remark']"></selector>
          </div>
        </cell-group>
        <cell-group>
           <p class="title-item">车辆类型<img  @click="openCarType" src="../../../assets/images/applay_add.png" class="img-add" alt=""></p>
           <div class="carList">
             <div v-if="showCarList.length" class="carType-content">
               <p v-for="(val, index) in showCarList" :key="index"><span>{{val.car_type_name}}</span><span>{{val.count}}辆</span></p>
             </div>
             <field v-else placeholder="请选择车辆类型" disabled/>
           </div>
        </cell-group>
        <cell-group>
           <p class="title-item">是否携带秘品</p>
          <div class="selector-box">
            <radio-group v-model="form.carry_secret" direction="horizontal">
              <radio :name="1">是</radio>
              <radio :name="0">否</radio>
            </radio-group>
          </div>
        </cell-group>
        <cell-group>
          <p class="title-item">是否有所领导</p>
          <div class="selector-box">
            <radio-group v-model="form.have_leader" direction="horizontal" @change="changeLeader">
              <radio :name="1">是</radio>
              <radio :name="0">否</radio>
            </radio-group>
          </div>
          <div @click="openLeader" v-if="form.have_leader === 1">
            <p class="leader-names" v-if="showLeaderText.length"><span v-for="(item, index) in showLeaderText" :key="index">{{item.leader_name}}</span></p>
            <field v-else placeholder="请选择领导" disabled/>
          </div>
        </cell-group>
      </div>
      <div class="form-box" ref="applay">
        <div class="title"><img src="@/assets/images/applay_yongche.png" alt="">用车线路</div>
        <cell-group>
           <p class="title-item">常规路线</p>
          <div class="selector-box">
            <selector :options="frList" @change="areaChange" :valueMap="['id', 'place_info']"></selector>
          </div>
        </cell-group>
        <cell-group>
           <p class="title-item">出发地</p>
            <div class="change-box">
              <textarea v-model="form.apply_use_address_1" class="timeText" placeholder="请选择出发地址" disabled/><img  @click="changeAddress(0)" src="@/assets/images/applay_dingwei.png" alt="" style="width:24px;height:24px">
              <input type="hidden" v-model="form.apply_use_address_1" name="apply_use_address_1" v-validate="'required'" data-vv-as="出发地">
           </div>
            <span v-show="errors2.has('apply_use_address_1')" class="help is-error">{{errors2.first('apply_use_address_1')}}</span>
        </cell-group>
        <cell-group>
          <p class="title-item">出发地详细地址</p>
          <field v-model="form.apply_use_address_2" maxlength="50" placeholder="详细地址补充" @input="addressChange(1)"/>
        </cell-group>
        <!-- 出发地址历史搜索框 -->
        <div class="address-box" v-show="isShowOutSearch">
          <ul class="address-list">
            <li v-for="(val, index) in OutPlaceList" :key="index" :data-index="index" @click="setAddress1('out', val)">{{val.address}}</li>
          </ul>
        </div>
        <cell-group>
           <p class="title-item">目的地</p>
            <div class="change-box">
              <textarea v-model="form.apply_destination_1" class="timeText" placeholder="请选择目的地址" disabled/><img  @click="changeAddress(1)" src="@/assets/images/applay_dingwei.png" alt="" style="width:24px;height:24px">
              <input type="hidden" v-model="form.apply_destination_1" name="apply_destination_1" v-validate="'required'" data-vv-as="目的地">
           </div>
           <span v-show="errors2.has('apply_destination_1')" class="help is-error">{{errors2.first('apply_destination_1')}}</span>
        </cell-group>
        <cell-group>
          <p class="title-item">目的地详细地址</p>
          <field v-model="form.apply_destination_2" maxlength="50" placeholder="详细地址补充" @input="addressChange(2)"/>
          <!-- 目的地址历史搜索框 -->
          <div class="address-box" v-if="isShowInSearch">
            <ul class="address-list">
              <li v-for="(val, index) in InPlaceList" :key="index" @click="setAddress1('in', val)">{{val.address}}</li>
            </ul>
          </div>
          <p class="title-item title-other">
          路程：<span class="blue">{{distance}}公里</span>预计时间：<span class="blue">{{useTime}}</span>
        </p>
        </cell-group>
      </div>
      <div class="form-box">
        <div class="title"><img src="@/assets/images/applay_qita.png" alt="">其他</div>
        <cell-group>
           <p class="title-item">备注</p>
           <field v-model="form.apply_bz" maxlength="50" placeholder="请输入备注"/>
        </cell-group>
      </div>
      <div class="form-bottom">
        <p v-if="costConfirmeText" class="text">{{costConfirmeText}}</p>
        <button v-else class="submit" v-debounce="doSubmit">提交</button>
      </div>
        <action-sheet v-model="timeShow">
            <datetime-picker
            v-if="showTimeOut"
            v-model="currentDateOut"
            type="datetime"
            title="选择预计出车时间"
            :min-date="minDate"
            :max-date="maxDateOut"
            @confirm="confirmTimeOut"
            @cancel="cancelTime"
            />
            <datetime-picker
            v-if="showTimeIn"
            v-model="currentDateIn"
            type="datetime"
            title="选择预计归队时间"
            :min-date="minDateIn"
            :max-date="maxDate"
            @confirm="confirmTimeIn"
            @cancel="cancelTime"
            />
      </action-sheet>
        <!-- 详情弹框 -->
        <overlay :show="isShowRules">
          <div class="wrapper" @click="closeRules">
            <div class="block">
              <div class="detail-title">用车规则<span class="close-text" @click="closeRules">关闭</span></div>
              <div class="detail-data">
                <h4> 单位车辆管理制度</h4>
                <h5>为加强单位车辆的管理，本着“方便管理、节约开支、提高效率、优质服务”的原则，制定下列制度。</h5>
                <p>一、车辆管理</p>
                <p>1、车辆有关证照和有关手续，由办公室人员妥善保管。</p>
                <p>2、车辆严格实行下班入库制。下班后车辆停放在指定停车场，因事不能停入指定车位的车辆应存放在相应有关规定的停放处。如：出差在外的车辆，要将车辆停放在安全场所，并锁好方向盘和门窗，搞好安全防范。严禁车辆在洗车处及私人住宅区过夜，否则产生不良后果由驾驶员负责。</p>
                <p>3、车辆实行专车专人驾驶，严禁将车辆私自交他人驾驶；严禁将车辆交给无证人员驾驶；任何人不得利用单位车辆练习驾车；不准跑私车。外单位向我单位借车的，须经领导批准；</p>
                <p>4、车辆进行加油需经财务人员负责登记，领导签字；每月驾驶员需准确上报车辆的耗油和公里数状况，财务人员进行审核公布。</p>
                <p>5、特殊状况用车务必经领导同意方可出车。</p>
                <p>二、车辆调度和使用</p>
                <p>1、车辆调度实行先领导后一般，先急后缓，先远后近，先乡镇后城市，先会议后出差，先保证工作后私人用车的原则。</p>
                <p>2、办公用车实行派车制度。由用车人向领导提出申请，由领导统一进行安排、调度。领导外出时，由办公室负责人安排调度。车辆调度按照工作的轻重缓急及领导优先的原则，统筹安排，未经领导批准，驾驶员不得擅自出车。司机务必经领导通知方可出车，并按派车通知规定的时间、地点出车，不得擅自改变。</p>
                <p>3、用车均实行出车登记制，由驾驶员登记，注明出车途径地、目的地、出车时间等，并请用车人签字确认。月底由驾驶员本人汇总填写当月出车报表，作为核销油料等费用的依据</p>
              </div>
            </div>
          </div>
        </overlay>
        <!-- 车辆类型弹框 -->
        <popup v-model="isShowCarType" position="bottom" :style="{ height: '60%' }">
          <div class="carType-box">
            <h3 class="carType-title">选择车辆类型</h3>
            <ul>
              <li v-for="(val, index) in carList" :key="index">
                <span>{{val.car_type_name}}</span>
                <div class="right">
                  <button class="car-reduce" @click="reduce(index)">-</button>
                   <field type="digit" maxlength="3" v-model="val.count"/>
                  <button @click="add(index)">+</button>
                </div>
              </li>
            </ul>
            <div class="form-bottom car-btn">
              <button class="fC999" @click="cancle">取消</button>
              <button class="submit" @click="carSubmit">确定</button>
            </div>
          </div>
        </popup>
        <!-- 有所领导时的列表 -->
        <popup v-model="isShowLeader" position="bottom" :style="{ height: '60%' }" @open="openLeader">
          <div class="carType-box">
            <h3 class="carType-title leader-title"><span>选择领导</span><span class="leader-ok" @click="leaderSubmit">确定</span></h3>
              <cell-group>
                <cell
                  v-for="(item, index) in leaderList"
                  clickable
                  :key="item.id"
                  :title="item.leader_name"
                  @click="toggle(index)"
                >
                  <template #right-icon>
                    <checkbox v-model="item.isChecked" ref="checkboxes" />
                  </template>
                </cell>
              </cell-group>
          </div>
        </popup>
        <!-- 地图弹框层 -->
        <div class="amap-wrapper" v-if="iShowMapBox">
          <Map @getLnglat="getPosi" @closePage="iShowMapBox = false"></Map>
        </div>
        <!-- 单位树选择框 -->
        <popup v-model="isShowTree" position="bottom" :style="{ height: '60%' }">
            <TreeBox :data="dataList" v-if="dataList.length" @changeOne="chanceItem"></TreeBox>
        </popup>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar/header-bar'
import TreeBox from '@/components/tree-box/tree'
import Map from '@/components/map'
import moment from 'moment'
import '@/validate'
import { preList, getDeptTree, getTask, getArea, getApplyInfoById, getSearchPlace, addUrgeAppaly, getApplayUsers, getAuditor, checkApply } from '@/libs/const'
import { transformTime, getStore, amapTobmap, bmapToamap, deepCopy } from '@/libs/util'
import { Field, CellGroup, Cell, DatetimePicker, ActionSheet, RadioGroup, Radio, Overlay, Icon, Popup, Checkbox } from 'vant'
import Selector from '@/components/selector/selector'
export default {
  components: {
    HeaderBar,
    Field,
    CellGroup,
    Selector,
    DatetimePicker,
    ActionSheet,
    RadioGroup,
    Radio,
    Overlay,
    Icon,
    Popup,
    Cell,
    Checkbox,
    Map,
    TreeBox
  },
  data () {
    return {
      dataList: [],
      isShowTree: false,
      timeShow: false,
      isShowRules: false,
      isShowCarType: false, // 车辆类型框显示与否
      isShowLeader: false, // 领导框是否显示
      historyAddress: {}, // 临时存储历史地址经纬度
      leaderList: [], // 领导数据
      leaderResult: [], // 选择后的领导
      showLeaderText: [], // 页面展示的领导数据
      carList: [], // 车辆类型数据
      showCarList: [], // 选择后的车辆类型数据
      iShowMapBox: false, // 地图盒子是否显示
      currentMapType: 1, // 当前是选目的地还是选出发地的标识(0:出发地， 1:目的地)
      costConfirmeText: '', // 有费用待确认的提示语
      form: {
        apply_name_id: 0, // apply_name_id（申请人id/int）
        apply_dept_id: '', // apply_dept_id（申请单位id/int）
        apply_name_phone: '', // apply_name_phone（申请人电话/string）
        yong_che_ren: '', // yong_che_ren（用车人/string）
        apply_use_phone: '', // 用车人电话
        apply_man_num: '', // apply_man_num（乘车人数/int）
        yong_che_xz: 0, // yong_che_xz（用车性质id/int）
        apply_qy_id: 0, // apply_qy_id（用车区域id/int）
        apply_fwzx_id: 0, // apply_fwzx_id（服务中心id/int）
        apply_use_time_str: moment(new Date()).format('YYYY-MM-DD HH:mm'), // apply_use_time_str（出车时间/string/yyyy-MM-dd HH:mm:ss
        apply_back_time_str: moment(new Date()).format('YYYY-MM-DD HH:mm'), // apply_back_time_str（归队时间/string/yyyy-MM-dd HH:mm:ss）
        apply_use_address_1: '', // apply_use_address1（出车地点/string）
        apply_use_address_2: '', //
        start_longitude: '', // start_longitude（出车地点经度/string）
        start_latitude: '', // start_latitude（出车地点纬度/string）
        apply_destination_1: '', // apply_destination1（目的地/string）
        apply_destination_2: '', // apply_destination_2（目的地详细地址/string）
        end_longitude: '', // end_longitude（目的地经度/string）
        end_latitude: '', // end_latitude（目的地纬度/string）
        apply_remark: 0, // apply_remark（用车事由/string、注：不是id是字符串）
        audit_user_id: 0, // audit_user_id（审核人id/int）
        object_id: 0, // object_id（任务号id/int）
        is_chartered_bus: 0, // is_chartered_bus（是否包车/int、1是0否）
        apply_bz: '', // apply_bz（订单备注/string）
        carInfo: '', // 车辆类型信息
        carry_secret: 0, // 是否携带密品
        have_leader: 0, // 是否有所领导
        leader: '',
        operation_state: this.$route.query.operation_state ? Number(this.$route.query.operation_state) : 1, // operation_state（操作标识/1新增、2修改）
        id: this.$route.query.applyId ? Number(this.$route.query.applyId) : 0 // 0表示新增，其他代表修改或者重新申请
      },
      isXinghao: false,
      distance: 0, // 距离
      useTime: 0, // 预计时间
      fwlist: [ // 服务中心
        { id: '1', dicName: '李四23' },
        { id: '1', dicName: '李四33' },
        { id: '1', dicName: '李四44' },
        { id: '1', dicName: '李四555' }
      ],
      xzList: [], // 用车性质
      remarkList: [], // 用车事由
      frList: [], // 常规路线
      applayUser: [], // 申请人列表
      auditUser: [], // 审核人
      auditUserEdit: [], // 接口返回的审核人数据（临时用）
      TaskList: [], // 任务号
      user_dept_name: '',
      amapManager: {},
      showTimeIn: false, // 时间选择器相关参数
      showTimeOut: false,
      minDate: new Date(),
      maxDateOut: new Date(2050, 10, 1),
      minDateIn: new Date(),
      maxDate: new Date(2050, 10, 1),
      currentDateIn: new Date(),
      currentDateOut: new Date(),
      isChangePlace: true, // 是不是自定义进行选择位置信息（用于区别是自己选择地址还是后台获取的地址）
      OutPlaceList: [
        {
          text: '1111'
        },
        {
          text: '14441'
        },
        {
          text: '3161'
        }
      ],
      InPlaceList: [],
      userbean: JSON.parse(getStore('userBean')),
      isShowOutSearch: false, // 是否显示出发地址搜索框
      isShowInSearch: false // 是否显示目的地址搜索框
    }
  },
  created () {
    this.$nextTick(() => {
      this.getList()
      getDeptTree({}, res => {
        let deptData = res.deptInfo
        // {1:{name: '',pid: 0, id: 1}}
        let treeMapList = deptData.reduce((memo, current) => {
          memo[current.id] = current
          return memo
        }, {})
        let result = deptData.reduce((arr, current) => {
          let pid = current.pId
          let parent = treeMapList[pid]
          current.isExpand = false
          current.isChecked = false
          // 有父亲
          if (parent) {
            parent.child ? parent.child.push(current) : parent.child = [current]
          } else { // 没有父亲，这是跟
            arr.push(current)
          }
          return arr
        }, [])
        this.dataList = result
      })
    })
  },
  mounted () {
    if (this.$route.query.type) {
      this.$refs.applay.scrollIntoView()
    }
  },
  methods: {
    // 部门数选择部门
    chanceDept () {
      this.isShowTree = true
    },
    chanceItem (item) {
      this.form.apply_dept_id = item.id
      this.user_dept_name = item.name
      this.isShowTree = false
      this.getAppUserData(this.form.apply_dept_id)
      this.getAuditors(this.form.apply_dept_id)
    },
    // 获取申请人列表数据
    getAppUserData (id, callback) {
      getApplayUsers({
        userName: '',
        requestDept: id
      }, res => {
        this.applayUser = res.list
        this.form.apply_name_id = this.applayUser[0].id
        this.form.apply_name_phone = this.applayUser[0].user_phone
        callback && callback()
      })
    },
    // 获取审核人列表数据
    getAuditors (id, callback) {
      // 获取审核人列表
      getAuditor({
        deptId: id
      }, res => {
        if (!this.isXinghao) {
          this.auditUser = res.auditUserDept
          if (res.auditUserDept.length > 0) {
            this.form.audit_user_id = this.auditUser[0].id
            this.form.object_id = 0
            callback && callback()
          } else {
            this.form.audit_user_id = 0
            this.form.object_id = 0
            this.$toast({
              message: '该部门下无审核人'
            })
          }
        }
      })
    },
    // 申请人改变时
    applayUserChange (e) {
      checkApply({
        applyNameId: e.id
      }, res => {
        if (res.state === 0) {
          this.form.apply_name_id = e.id
          this.form.apply_name_phone = e.user_phone
          this.costConfirmeText = ''
        } else {
          this.costConfirmeText = res.str
          this.$toast({
            message: res.str,
            duration: 1000,
            className: 'toastStyle'
          })
        }
      })
    },
    changeAddress (num) {
      if (this.isChangePlace) {
        this.iShowMapBox = true
        this.currentMapType = num
      }
      return false
    },
    // 确定车辆类型
    carSubmit () {
      this.showCarList = this.carList.filter((val, index) => {
        if (val.count && val.count > 0) {
          return val
        }
      })
      this.isShowCarType = false
    },
    // 点击展开领导列表
    openLeader () {
      this.leaderList.forEach(val => {
        this.leaderResult.forEach(item => {
          if (val.id === item.id) {
            val.isChecked = true
          }
        })
      })
      this.isShowLeader = true
    },
    // 是否有所领导
    changeLeader (e) {
      if (e === 0) {
        this.leaderResult = []
      }
    },
    // 关闭所领导框
    closeLeader () {
      this.leaderResult = this.leaderList.filter(val => {
        if (val.isChecked) {
          return val
        }
      })
    },
    // 选择所领导确定操作
    leaderSubmit () {
      this.closeLeader()
      this.showLeaderText = deepCopy(this.leaderResult)
      this.isShowLeader = false
    },
    // 提交时车辆数据类型转换
    changeCarData () {
      let carInfoArr = ''
      this.showCarList.forEach((val1, index1) => {
        if (carInfoArr === '') {
          carInfoArr += `${[val1.id]}` + ':' + `${val1.count}`
        } else {
          carInfoArr += ',' + `${[val1.id]}` + ':' + `${val1.count}`
        }
      })
      this.form.carInfo = carInfoArr
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    openCarType () {
      this.carList.forEach((val, index) => {
        this.showCarList.forEach((item, i) => {
          if (val.id === item.id && item.count > 0) {
            val.count = item.count
          }
        })
      })
      this.isShowCarType = true
    },
    reduce (index) {
      if (this.carList[index].count <= 0) {
        this.carList[index].count = 0
      } else {
        this.carList[index].count = this.carList[index].count - 1
      }
    },
    add (index) {
      this.carList[index].count = Number(this.carList[index].count)
      this.carList[index].count = this.carList[index].count + 1
    },
    // 取消车辆类型
    cancle () {
      this.isShowCarType = false
    },
    addressChange (type) {
      if (type === 1) {
        this.getSearchData(this.form.apply_use_address_2, type)
      } else {
        this.getSearchData(this.form.apply_destination_2, type)
      }
    },
    onBlur () {
      this.isShowOutSearch = false
      this.isShowInSearch = false
    },
    // 地图部分
    getPosi (lng, lat, address) {
      // 选择的地址回显
      if (this.currentMapType === 0) {
        this.form.apply_use_address_1 = address
        // 将高德经纬度转百度经纬度
        let bmapLngLat1 = amapTobmap(lng, lat)
        this.form.start_longitude = bmapLngLat1.bd_lng
        this.form.start_latitude = bmapLngLat1.bd_lat
        this.historyAddress.start_longitude = lng
        this.historyAddress.start_latitude = lat
      } else {
        this.form.apply_destination_1 = address
        let bmapLngLat = amapTobmap(lng, lat)
        this.form.end_longitude = bmapLngLat.bd_lng
        this.form.end_latitude = bmapLngLat.bd_lat
        this.historyAddress.end_longitude = lng
        this.historyAddress.end_latitude = lat
      }
      this.getDistance()
      this.getTime()
      this.iShowMapBox = false
    },
    // 当输入选择时，出发地，目的地设置，不是地图选择
    setAddress1 (text, val) {
      // 百度坐标转高德
      if (text === 'out') {
        this.form.apply_use_address_1 = val.address1
        this.form.apply_use_address_2 = val.address2
        this.form.start_longitude = val.lon
        this.form.start_latitude = val.lat
        let amapLngLat = bmapToamap(val.lon, val.lat)
        this.historyAddress.start_longitude = amapLngLat.lng
        this.historyAddress.start_latitude = amapLngLat.lat
      } else {
        this.form.apply_destination_1 = val.address1
        this.form.apply_destination_2 = val.address2
        this.form.end_longitude = val.lon
        this.form.end_latitude = val.lat
        let amapLngLat = bmapToamap(val.lon, val.lat)
        this.historyAddress.end_longitude = amapLngLat.lng
        this.historyAddress.end_latitude = amapLngLat.lat
      }
      this.getDistance()
      this.getTime()
    },
    // 得到历史地址搜索
    async getSearchData (text, type) {
      await getSearchPlace({
        adderssStr: text,
        type: type,
        nameId: this.form.apply_name_id
      }, res => {
        if (res.list.length) {
          if (type === 1) {
            this.isShowOutSearch = true
            this.OutPlaceList = res.list
          } else {
            this.isShowInSearch = true
            this.InPlaceList = res.list
          }
        }
      })
    },
    // 获取驾车的距离
    getDistance () {
      if (this.historyAddress.start_longitude && this.historyAddress.end_longitude) {
        this.distance = (Math.round(AMap.GeometryUtil.distance([Number(this.historyAddress.start_longitude), Number(this.historyAddress.start_latitude)], [Number(this.historyAddress.end_longitude), Number(this.historyAddress.end_latitude)])) / 1000).toFixed(2)
      }
    },
    // 获取驾车预计时间
    getTime () {
      let self = this
      AMap.plugin('AMap.Driving', function () {
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME
        })
        var startLngLat = [self.historyAddress.start_longitude, self.historyAddress.start_latitude]
        var endLngLat = [self.historyAddress.end_longitude, self.historyAddress.end_latitude]

        driving.search(startLngLat, endLngLat, function (status, result) {
          // 未出错时，result即是对应的路线规划方案
          if (status === 'complete') {
            self.useTime = transformTime(result.routes[0].time)
          } else {
            self.useTime = 0
          }
        })
      })
    },
    areaChange (e) {
      if (e.id !== 0) {
        this.isChangePlace = false
        this.form.apply_use_address_1 = e.departure
        this.form.apply_destination_1 = e.destination
        this.form.start_longitude = e.start_lng
        this.form.start_latitude = e.start_lat
        this.form.end_longitude = e.end_lng
        this.form.end_latitude = e.end_lat
        // 百度坐标转高德
        let amapLngLat = bmapToamap(e.start_lng, e.start_lat)
        this.historyAddress.start_longitude = amapLngLat.lng
        this.historyAddress.start_latitude = amapLngLat.lat
        let amapLngLat1 = bmapToamap(e.end_lng, e.end_lat)
        this.historyAddress.end_longitude = amapLngLat1.lng
        this.historyAddress.end_latitude = amapLngLat1.lat
        this.getDistance()
        this.getTime()
      } else {
        this.isChangePlace = true
        this.distance = 0
        this.useTime = 0
      }
    },
    getList () {
      preList({}, (res) => {
        let carArr = res.cartype
        carArr.forEach((item, index) => {
          item.count = 0
        })
        this.carList = carArr
        this.leaderList = res.leaderInfo.map(val => {
          return { ...val, isChecked: false }
        })
        this.remarkList = res.remarkList
        this.xzList = res.xzList
        this.form.yong_che_xz = res.xzList[0].id
        this.form.apply_remark = res.remarkList[0].id
        this.fwlist = res.fwlist
        this.form.apply_fwzx_id = res.fwlist[0].id
        this.frList = res.frList
        this.frList.unshift({
          id: 0,
          place_info: '自定义'
        })
        this.auditUserEdit = res.auditUser
        // 修改或者重新申请数据
        if (this.form.id !== 0) {
        // 通过订单id获取回显数据
          getApplyInfoById({ applyId: this.form.id }, (resEdite) => {
            // 获取表单项中的key数组
            let params = Object.keys(this.form)
            let resData = resEdite.carAppFrom
            this.user_dept_name = resData.apply_dept_name
            this.form = Object.assign(this.form, resData)
            this.form.yong_che_xz = Number(resData.yong_che_xz_id)
            this.form.apply_dept_id = resData.apply_dept_id
            this.form.apply_remark = Number(resData.apply_remark)
            // 根据部门id获取申请人、电话号码
            this.getAppUserData(this.form.apply_dept_id, () => {
              this.form.apply_name_id = resData.apply_name_id
              this.form.apply_name_phone = resData.apply_name_phone
            })
            // 是否是选择型号审核人
            if (resData.object_id === 0) {
              // 根据部门id获取审核人信息
              this.getAuditors(this.form.apply_dept_id, () => {
                this.form.audit_user_id = resData.audit_user_id
              })
            } else {
              // 选择型号审核人时
              this.isXinghao = true
              this.auditUser = this.auditUserEdit
              this.form.audit_user_id = resData.audit_user_id
              this.getTaskList(this.form.audit_user_id, () => {
                this.form.object_id = resData.object_id
              })
            }
            // 回显车辆类型数据
            let carTypeData = resData.listcar
            this.carList.forEach((val, index) => {
              carTypeData.forEach((item, i) => {
                if (Number(item.xinx0) === val.id) {
                  this.showCarList.push({ ...val, count: Number(item.xinx1) })
                }
              })
            })
            // 回显领导数据
            if (resData.have_leader === 1) {
              this.leaderResult = resData.leaderList
              this.showLeaderText = this.leaderResult
              this.leaderList.forEach(val => {
                resData.leaderList.forEach(item => {
                  if (val.id === item.id) {
                    val.isChecked = true
                  }
                })
              })
            }
            // 百度坐标转高德
            let amapLngLat = bmapToamap(this.form.start_longitude, this.form.start_latitude)
            this.historyAddress.start_longitude = amapLngLat.lng
            this.historyAddress.start_latitude = amapLngLat.lat
            let amapLngLat1 = bmapToamap(this.form.end_longitude, this.form.end_latitude)
            this.historyAddress.end_longitude = amapLngLat1.lng
            this.historyAddress.end_latitude = amapLngLat1.lat

            let newArr = {}
            // 过滤对象中其他项
            for (let key in this.form) {
              if (params.indexOf(key) > -1) {
                newArr[key] = this.form[key]
              }
            }
            this.form = newArr
            this.getDistance()
            this.getTime()
          })
        }
      })
    },
    openRules () {
      this.isShowRules = true
    },
    closeRules () {
      this.isShowRules = false
    },
    toBack () {
      if (this.form.id === 0) {
        this.$router.replace('../index')
      } else {
        this.$router.replace({
          path: '/useCarDetail',
          query: {
            id: this.$route.query.applyId
          }
        })
      }
    },
    platformChange (e) {
      this.form.apply_fwzx_id = e.id
    },
    natureChange (e) {
      if (this.form.apply_dept_id) {
        this.form.yong_che_xz = e.id
        if (e.id === 3) {
          this.isXinghao = true
          this.auditUser = this.auditUserEdit
          this.form.audit_user_id = this.auditUser[0].id
          this.getTaskList(this.form.audit_user_id)
        } else {
          this.isXinghao = false
          this.getAuditors(this.form.apply_dept_id)
        }
      } else {
        this.$toast({
          message: '请先选择用车单位'
        })
        return false
      }
    },
    reasonChange (e) {
      this.form.apply_remark = e.id
    },
    auditorChange (e) {
      this.form.audit_user_id = e.id
      if (this.isXinghao) {
        this.getTaskList(e.id)
      }
    },
    getTaskList (auditId, callback) {
      getTask({
        auditId: auditId,
        useTime: this.form.apply_use_time_str
      }, res => {
        this.TaskList = res.data
        this.form.object_id = this.TaskList.length ? this.TaskList[0].objectId : 0
        callback && callback() // 回调函数，有就执行，没有就不执行
      })
    },
    taskChange (e) {
      this.form.object_id = e.objectId
    },
    // 时间选择部分
    // 选择出队时间
    confirmTimeOut (value) {
      this.form.apply_use_time_str = moment(value).format('YYYY-MM-DD HH:mm')
      this.timeShow = false
      this.minDateIn = value
      this.currentDateOut = value
      this.getTaskList(this.auditUserEdit[0].id)
    },
    // 选择归队时间
    confirmTimeIn (value) {
      this.form.apply_back_time_str = moment(value).format('YYYY-MM-DD HH:mm')
      this.maxDateOut = value
      this.timeShow = false
      this.currentDateIn = value
    },
    cancelTime () {
      this.timeShow = false
    },
    changeTime (flag) {
      this.timeShow = true
      if (flag === 0) {
        this.showTimeOut = true
        this.showTimeIn = false
      } else {
        this.showTimeIn = true
        this.showTimeOut = false
      }
    },
    doSubmit () {
      var date1 = new Date(this.form.apply_use_time_str)
      var date2 = new Date(this.form.apply_back_time_str)
      if (date1 >= date2) {
        this.$toast({
          message: '归队时间必须大于出车时间',
          duration: 1000,
          className: 'toastStyle'
        })
        return
      }
      if (this.form.audit_user_id === 0) {
        this.$toast({
          message: '请选择审核人',
          duration: 1000,
          className: 'toastStyle'
        })
        return
      }
      if (this.showCarList.length) {
        this.changeCarData()
      } else {
        this.$toast({
          message: '请选择用车类型',
          duration: 1000,
          className: 'toastStyle'
        })
        return
      }
      if (this.form.have_leader === 1) {
        if (this.showLeaderText.length) {
          let leaderEdit = ''
          this.showLeaderText.forEach((val, index) => {
            if (leaderEdit === '') {
              leaderEdit += `${val.id}`
            } else {
              leaderEdit += ',' + `${val.id}`
            }
          })
          this.form.leader = leaderEdit
        } else {
          this.$toast({
            message: '请添加领导',
            duration: 1000,
            className: 'toastStyle'
          })
          return
        }
      }
      this.$validator.validateAll().then(async (valid) => {
        if (valid) {
          await getArea({ // 获取用车区域
            lng: this.form.end_longitude,
            lat: this.form.end_latitude
          }, (res) => {
            this.form.apply_qy_id = res.qyId
            addUrgeAppaly(this.form, res => {
              this.$toast({
                message: '操作成功',
                duration: 1000,
                className: 'toastStyle',
                onClose: () => {
                  this.$router.push('/index')
                }
              })
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 90%;
  background-color: #fff;
  white-space: pre-wrap;
  .detail-title {
    width: 100%;
    height: 80px;
    background-color: rgb(49, 120, 179);
    color: #fff;
    text-align: center;
    font-size: 32px;
    line-height: 80px;
    position: relative;
    .close-text {
      position: absolute;
      right: 20px;
      top: 0;
      font-size: 28px;
    }
  }
  .detail-data {
    padding: 20px 10px;
    overflow-y: scroll;
    box-sizing: border-box;
    color: #333;
    width: 100%;
    font-size: 24px;
    h4 {
      font-size: 30px;
    }
    h5 {
      font-size: 26px;
      padding-bottom: 10px;
    }
  }
}
.van-overlay {
  z-index: 999;
}
.amap-wrapper {
    position: fixed;
    z-index: 999;
    height: 100vh;
    width: 100%;
}
     @import 'applay';
</style>
