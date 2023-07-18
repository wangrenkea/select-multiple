<template>
      <div class="dropdown-menu_item" @click.stop="toggle()">
          <div :style="{'color':showSelectMultiple ? `${activeColor}` : ''}" class="dropdown-menu_title" :class="{'dropdown-menu__title--down':showSelectMultiple}">
              <div class="ellipsis-title">
                {{title | fitlerTitle(options,multiple)}}
              </div>
          </div>
      </div>
  </template>
  <script>
  export default {
    name:'dropdown-item',
    inject:['activeColor'],
    props:{
      activeColor:[String], // 选择后的颜色
      value:[String,Array,Number],
      multiple:Boolean,  // 是否为多选，默认为单选
      options:{
        type:Array,
        default(){
          return []
        }
      }
    },
    filters:{
      fitlerTitle(data,options,multiple){
        if(multiple){
          let checkedOptions = []
          options.forEach((item)=>{
            if(data.includes(item.value)){
              checkedOptions.push(item.label)
            }
          })
          return checkedOptions.length>0 ?  checkedOptions.join(',') : ''
        }else{
          let checkedOptions = options.find((item)=>{
            return item.value == data
          })
          return checkedOptions ? checkedOptions.label : ''
        }
      }
    },
    data(){
      return {
        showSelectMultiple:false
      }
    },
    computed:{
      title(){
        return this.value
      },
    },
    methods:{
      toggle(){
        if(!this.showSelectMultiple){
          this.$parent.hideChildDropdownDown()
          this.showSelectMultiple = true
          document.onclick = ()=>{
            this.toggle()
            this.change()
          }
        }else{
          this.showSelectMultiple = false
          document.onclick = null
        }
      },

      // 赋值
      setInput(value){
        this.$emit('input',value)
      },

      // change事件
      change(item){
        this.$emit('change',item)
      }
    },
    created(){
      this.showSelectMultiple = false
    }
  }
  </script>
  <style scoped>
  .dropdown-menu {
    user-select: none;
  }

  /* 标题 */
  
  .dropdown-menu_item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-width: 0;
  }
  .dropdown-menu_title {
    position:relative;
    padding:10px;
    /* padding-right:0; */
    box-sizing: border-box;
    max-width:100%;
    transition:color 0.3s;
  }
  .dropdown-menu_title::after {
      position: absolute;
      top: 50%;
      right: -3px;
      margin-top: -5px;
      border: 3px solid;
      border-top-color:transparent;
      border-right-color:transparent;
      border-bottom-color:#dcdee0;
      border-left-color: #dcdee0;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      opacity: 0.8;
      content: '';
  }
  .dropdown-menu__title--down::after {
    margin-top: -1px;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
  }
  
  .dropdown-menu__title--down.dropdown-menu_title::after {
    border-bottom-color:inherit;
    border-left-color: inherit;
  }
  
  .ellipsis-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex:1;
  }
  
  
  .show-dropdown-item {
    display:block;
    transform: rotateX(90deg)
  }

  </style>