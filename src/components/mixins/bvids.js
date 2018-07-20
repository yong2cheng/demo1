var bvidArrs = {
    data() {
      return {
        bvidArr:[]
      }
    },
    created() {
        var bvIds = (sessionStorage.getItem("bvIds"))
        var data = bvIds.replace(/},/g, "}?").split("?")
        for(var i=0;i<data.length;i++) {
            this.bvidArr.push(JSON.parse(data[i]))
        }
    },
  }
export default bvidArrs;