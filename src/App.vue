<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>

*{
  padding: 0;
  margin: 0;
}

.el-popover{
  /* height: 100%; */
  max-height: 212px;
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 10;
	-webkit-box-orient: vertical;
  font-size: 13px!important;
}
.el-textarea__inner{
  padding: 10px 15px!important;
}
.el-dialog__body{
  padding: 10px 20px!important;
}
#app {
  font-family: PingFang SC,Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input{
  outline: none;
}
button{
  outline: none;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
