<template>
    <div class="select-multiple" ref="selectMultiple" >

      <div class="dropdown-menu__bar" @click.stop>
        <slot></slot>
      </div>

      <div v-for="(item,index) in childrenList" :key="index" @click.stop>
        <div class="dropdown-item-down" :style="{'z-index':item.showSelectMultiple ? '10' : '-9999','top':offsetTop+'px'}">

          <div class="overlay-mask" :style="{'z-index':item.showSelectMultiple ? '10' : '-9999','opacity':item.showSelectMultiple ? '.7' : '0'}"></div>

          <div class="popup--top dropdown-item_content" :style="{'z-index':item.showSelectMultiple ? '10' : '-9999'}" :class="{'show-dropdown-item':item.showSelectMultiple}">
            <div class="dropdown-item__option" v-for="optionsItem in item.options" :key="optionsItem.value"  @click="selectDropdown(optionsItem,item)">
              <div class="cell__title" :style="{'color':optionsItem.value == item.value 
              || (Array.isArray(item.value) && item.value.includes(optionsItem.value)) ? activeColor : ''}">{{optionsItem.label}}</div>
              <div class="cell__value"></div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
</template>
<script>
import dropdownItem from './dropdown-item/main.vue'
import {offset} from './utils/dom'
export default {
  components:{dropdownItem},
  props:{
    activeColor:[String]
  },
  provide(){
    return {
      activeColor:this.activeColor,
    }
  },
  data(){
    return {
      childrenList:[],
      offsetTop:0
    }
  },
  methods:{
    // 更新视图
    uploadDom(){
      this.$nextTick(()=>{
        let selectMultiple = this.$refs.selectMultiple
        this.offsetTop = offset(selectMultiple)+selectMultiple.offsetHeight
      })
    },
    
    // 隐藏所有下拉菜单
    hideChildDropdownDown(){
      this.childrenList.forEach((item)=>{
        item.showSelectMultiple = false
      })
      this.uploadDom()
    },
    
    // 选择options
    selectDropdown(optionsItem,item){
      if(item.multiple){
        let index = item.title.indexOf(optionsItem.value)
        let title = JSON.parse(JSON.stringify(item.title))
        if(index === -1){
          title.push(optionsItem.value)
        }else{
          title.splice(index,1)
        }
        item.setInput(title)
        item.change(optionsItem)
      }else{
        // this.$set(item,'title',optionsItem.value)
        item.setInput(optionsItem.value)
        item.toggle()
      }
    }
  },
  mounted(){
    this.childrenList = this.$children
    this.uploadDom()
  }
}
</script>
<style scoped>
.select-multiple {
}
.dropdown-menu__bar {
  display:flex;
  height:48px;
  position:relative;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.12);
  z-index:11;
}

/* 下拉内容 */
.dropdown-item-down {
  overflow:hidden;
  position:fixed;
  left:0;
  bottom:0;
  width:100vw;
}

.overlay-mask {
  position:absolute;
  top:0;
  left:0;
  height:100%;
  width:100%;
  transition:opacity 0.3s;
  background-color:#000;
  opacity:0;
}

.dropdown-item_content.show-dropdown-item {
  transform: translateY(0);
}
.dropdown-item_content {
  position:absolute;
  top:0;
  left:0;
  z-index:1000;
  -webkit-transition: -webkit-transform 0.3s;
  transition:transform 0.3s;
  width:100%;
  max-height:80%;
  background:#fff;
  transform:translateY(-150%);
}
.popup--top {
  top: 0;
  left: 0;
  width: 100%;
}

.dropdown-item__option {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
.dropdown-item__option ::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>