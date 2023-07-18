<template>
    <div >
      <div class="van-dropdown-menu">
        <div class="van-dropdown-menu__bar van-dropdown-menu__bar--opened">
          <div role="button" tabindex="0" class="van-dropdown-menu__item">
            <span class="van-dropdown-menu__title" :class="[ showSelectMultiple ? 'van-dropdown-menu__title--active van-dropdown-menu__title--down' : '' ]" @click="selectActive()">
              <div class="van-ellipsis">{{ selectName }}</div>
            </span>
            <div v-if="showSelectMultiple" class="btn_left">
              <span v-if="!all" @click="toggleAll()">全选</span>
              <span v-if="all" @click="toggleFalseAll()">取消全选</span>
            </div>
            <div v-if="showSelectMultiple" class="btn_true" @click="submitSelect()">确定</div>
          </div>
        </div>
      </div>
      <div v-if="showSelectMultiple" class="van-dropdown-item van-dropdown-item--down" style="top: 40.9531px;">
        <div class="van-overlay" style="z-index: 2005; position: absolute; animation-duration: 0.2s;" />
        <div ref="content" class="van-popup van-popup--top van-dropdown-item__content" style="transition-duration: 0.2s; z-index: 2006; position: relative; ">
  
          <van-checkbox-group v-model="checked" res="checkboxGroup" @change="selectDataOptsChange">
            <div v-for="(item,index) in selectDataOpts" :key="item.value" role="button" :tabindex="index" class="van-cell van-cell--clickable van-dropdown-item__option">
              <div class="van-cell__title">
                <span>
                  <van-checkbox :name="item.value" checked-color="#A9B910">{{ index+1 }}.{{ item.text }}</van-checkbox></span>
              </div>
            </div>
            <!-- <div class="footer_btn">
              <div class="btn_d" @click="cancelSelect()">取消</div>
              <div class="btn_d btn_cur" @click="submitSelect()">确定</div>
            </div> -->
            <!-- <div class="blank"> </div> -->
          </van-checkbox-group>
  
        </div>
  
      </div>
    </div>
  </template>
  <script >
  import { Checkbox, CheckboxGroup, DropdownMenu, DropdownItem } from 'vant'
  export default {
    name: 'CopyCode',
    components: {
      VanCheckbox: Checkbox,
      VanCheckboxGroup: CheckboxGroup,
      // eslint-disable-next-line
      VanDropdownMenu: DropdownMenu,
      // eslint-disable-next-line
      VanDropdownItem: DropdownItem
    },
    props: {
      selectName: {
        type: String,
        default: '全部'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      otherName: {
        type: String,
        default: '供应商'
      },
      checkedList: {
        type: Array,
        default: function() { return [] }
      },
      selectDataOpts: {
        type: Array,
        default: function() { return [] }
      }
      // showSelectMultiple: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        showSelectMultiple: false,
        checked: [],
        all: false
      }
    },
    mounted() {
      this.checked = this.checkedList
    },
    methods: {
      selectActive() {
        if (this.disabled) {
          return
        }
        this.showSelectMultiple = !this.showSelectMultiple
      },
      toggleAll() {
        const data = []
        for (let i = 0; i < this.selectDataOpts.length; i++) {
          data.push(this.selectDataOpts[i].value)
        }
        this.all = true
        this.checked = data
      },
      toggleFalseAll() {
        this.all = false
        this.checked = []
      },
      submitSelect() {
        this.showSelectMultiple = false
        this.selectNameData()
      },
      cancelSelect() {
        this.showSelectMultiple = false
      },
      selectDataOptsChange(data) {
        this.selectNameData()
      },
      selectNameData() {
        if (!this.checked.length || this.selectDataOpts.length === this.checked.length) {
          this.$emit('selectMutiple', { checked: this.checked, name: '全部' + this.otherName })
        } else {
          this.$emit('selectMutiple', { checked: this.checked, name: '已选中（' + this.checked.length + ')' + this.otherName })
        }
      },
      onCopy() {
      },
      onError() {
      }
  
    }
  }
  </script>
  <style lang="less" scoped>
  .copy{
    font-size:14px;
  }
  .blank{
    position: relative;
    width:100%;
    height:60px;
  }
  .btn_true{
    width:60px;
    height:30px;
    border-radius: 5px;
    background-color:#A2C14D;
    color:#fff;
    position: absolute;
    text-align:center;
    line-height:30px;
    right:10px;
    font-size:14px;
    top:10px;
  }
  .btn_left{
    width:60px;
    height:30px;
    position: absolute;
    text-align:center;
    line-height:30px;
    left:10px;
    font-size:14px;
    top:10px;
  }
  .block_content{
    width:100%;
  }
  .flex_bottom{
    position: absolute ;
    bottom:-10px;
    left:0;
  }
  </style>