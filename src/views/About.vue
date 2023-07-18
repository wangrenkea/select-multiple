<template>
  <div class="about">
    <div class="box">
      <van-dropdown-menu active-color="#ee0a24">
        <van-dropdown-item v-model="value1" :options="option1" @change="changeItem"/>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
      <div>这是测试</div>
      <button @click="confirm">点击</button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      value1:'',
      value2:'',
      option1: [
        { text: '全部商品全部商品全部商品全部商品', value: 0 },
        { text: '新款商品新款商品新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
    }
  },
  methods:{
    confirm(){
      console.log('aaa')
    },
    changeItem(item){
      console.log('出发了',item)
    }
  },
  created(){
    console.log('$slot',this.$slots)
  }
}
</script>
<style scoped>
.box {
}
/deep/.van-dropdown-menu {
  /* margin-top:300px; */
}
</style>
