<template>
  <div class="home">
    <button @click="confirm">点击</button>
    <div class="box">
      <select-multiple active-color="#ee0a24">
        <dropdown-item v-model="value2" :options="options2"></dropdown-item>
        <dropdown-item v-model="value1" :options="options1" multiple></dropdown-item>
      </select-multiple>
    </div>
    <div>这是测试</div>
    <button @click="confirm">点击</button>
  </div>
</template>

<script>
import selectMultiple from '@/components/select-multiple/main'
import dropdownItem from '@/components/select-multiple/dropdown-item/main'
export default {
  name: 'Home',
  components: {
    selectMultiple,
    dropdownItem
  },
  methods:{
    confirm(){
      console.log('aaa')
      console.log('value2',this.value2)
      console.log('value1',this.value1)
    },
    changeItem(){
      console.log('item',this.value2)
    }
  },
  data(){
    return {
      value1:[1,2,3],
      value2:'',
      options1:[
        {
          value:1,
          label:'第一个'
        },
        {
          value:2,
          label:'第二个'
        },
        {
          value:3,
          label:'第三个'
        },
        {
          value:4,
          label:'第四个'
        },
      ],
      options2:[
        {
          value:1,
          label:'第1个'
        },
        {
          value:2,
          label:'第2个'
        },
        {
          value:3,
          label:'第3个'
        },
        {
          value:4,
          label:'第4个'
        },
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  margin:0 auto;
  position:relative;
  margin-top:200px;
  width:200px;
}
</style>
