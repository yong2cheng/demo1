<template>
<div class="bigbox">
  <div class="centerbox">
    <form action="#" class="tzdz">
      <div class="loginbox">
        <h2><img src="../assets/img/logo.png" width="163" height="54" alt=""/>电能量数据分析与运维系统</h2>
        <div class="formbox">
          <!--用户名-->
          <div class="bdbox">
            <span class="icon icon-user"></span>
            <input v-model="lgusername" type="text" class="srk yhm" placeholder="用户名" value="" />
          </div>
          <!--密码-->
          <div class="bdbox">
            <span class="icon icon-key"></span>
            <input v-model="lguserpwd" type="password" class="srk mm" v-on:keydown="enterLoginajax" placeholder="密码" />
            <span class="icon-eye-blocked" id="mm_see"></span>
          </div>
          <input type="button" class="anniu un_butt" :class="{buttonClass:lgButton}" v-on:click="loginajax" value="登 陆" />
        </div>
      </div>
    </form>
  </div>
</div>
</template>
<script>
// import Axios from 'axios'
import $bvid from "@/assets/config/bvidMap";
import qs from "qs";
export default {
  data: function() {
    return {
      lgusername: "",
      lguserpwd: "",
      lgButton: false,
      lgtoken: ""
    };
  },
  watch: {
    lgusername: function() {
      var a = this.lgusername.slice(
        this.lgusername.length - 1,
        this.lgusername.length
      );
      var re = /[A-Za-z]|[\u4e00-\u9fa5]/;
      if (!re.test(a)) {
        this.lgusername = this.lgusername.slice(0, this.lgusername.length - 1);
      }
      if (this.lgusername != "" && this.lguserpwd != "") {
        this.lgButton = true;
      } else {
        this.lgButton = false;
      }
    },
    lguserpwd: function() {
      if (this.lgusername != "" && this.lguserpwd != "") {
        this.lgButton = true;
      } else {
        this.lgButton = false;
      }
    }
  },
  methods: {
    loginajax() {
      this.$http
        .post(
          "/systemManagementService/userService/loginByUsername",
          qs.stringify({
            username: this.lgusername,
            password: this.lguserpwd
          })
        )
        .then(result => {
          console.log(result);
          var res = result.data;
          console.log(res.msg);
          if (res.code === 1) {
            sessionStorage.setItem("accessToken", res.data.token);
            this.getUserInfo(res.data.token);
          } else {
            this.lgusername = "";
            this.lguserpwd = "";
            alert("密码或用户名错误");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUserInfo(token) {
      this.$http
        .get("/systemManagementService/userService/getUserDetail?sign=" + token)
        .then(res => {
          console.log(res.data);
          if (res.data.code === 1) {
            sessionStorage.setItem(
              "userName",
              res.data.data.userDetail.userName
            );
            sessionStorage.setItem(
              "userAlias",
              res.data.data.userDetail.userAlias
            );
            sessionStorage.setItem("userId", res.data.data.userDetail.userId);
            if (res.data.data.userDetail.divisionCode != null) {
              sessionStorage.setItem(
                "systemId",
                res.data.data.userDetail.divisionCode
              );
            }
            this.getBvid(
              sessionStorage.getItem("accessToken"),
              sessionStorage.getItem("systemId")
            );
            // console.log(res.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getBvid(token, systemId) {
      if (systemId == 0 || systemId == null) {
        sessionStorage.setItem("systemType", "1");
      } else {
        sessionStorage.setItem("systemType", "2");
      }
      this.$http
        .get(
          "/prefectureLevelCityService/prefectureLevelCityApi/getSubsystemList?sign=" +
            token
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code === 1) {
            var obj = {},
              bvIds = "";
            var allSubSystems = res.data.data.allSubSystems;
            if (allSubSystems && allSubSystems.length > 0) {
              for (var i = 0; i < allSubSystems.length; i++) {
                if (systemId == allSubSystems[i].systemId) {
                  bvIds = allSubSystems[i].bvIds;
                }
              }
            }
            if (bvIds) {
              bvIds = bvIds.split(",");
            }
            var data = [];
            if (bvIds && bvIds.length > 0) {
              for (var m = 0; m < bvIds.length; m++) {
                for (var n = 0; n < $bvid.length; n++) {
                  if (bvIds[m] == $bvid[n].bvId) {
                    data.push(
                      JSON.stringify({
                        bvId: $bvid[n].bvId,
                        dydj: $bvid[n].dydj + "KV"
                      })
                    );
                  }
                }
              }
              sessionStorage.setItem("systemType", "2");
            } else {
              for (var j = 0; j < $bvid.length; j++) {
                data.push(
                  JSON.stringify({
                    bvId: $bvid[j].bvId,
                    dydj: $bvid[j].dydj + "KV"
                  })
                );
              }
            }
            // data.join(data)
            sessionStorage.setItem("bvIds", data);
            // if (
            //   !sessionStorage.getItem("systemId") &&
            //   sessionStorage.getItem("systemId") != 0 &&
            //   typeof sessionStorage.getItem("systemId") != "undefined"
            // ) {
            //   this.$router.push("/");
            // } else {
            //   this.$router.push("/dlywkhd");
            // }
            this.$router.push('/');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    enterLoginajax(e) {
      if (e.keyCode == 13) {
        if (this.lgusername != "" && this.lguserpwd != "") {
          this.loginajax();
        }
      }
    }
  }
};
</script>
<style>
.bigbox {
  float: left;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  background: #074444 url(../assets/img/wlbg.png) no-repeat 102% 116%;
}

.centerbox {
  width: 622px;
  margin: 0 auto;
}

.loginbox {
  float: left;
  width: 600px;
  height: 300px;
  padding: 10px;
  margin-top: 25vh;
  background: linear-gradient(#01686a, #042f2f);
  border: 1px solid #042f2f;
  border-radius: 10px;
  box-shadow: inset 0 0 2px 1px #078989, 0 0 30px 3px rgba(5, 134, 135, 0.3);
}

.loginbox h2 {
  width: 100%;
  height: 54px;
  padding-bottom: 5px;
  margin-bottom: 20px;
  line-height: 54px;
  font-size: 32px;
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  font-weight: normal;
  letter-spacing: 2px;
  border-bottom: 1px solid #024244;
  box-shadow: 0 1px 0px #058687;
}

.loginbox h2 img {
  float: left;
  padding-right: 20px;
  vertical-align: middle;
}

.formbox {
  width: 55%;
  margin: 0 auto;
}

.bdbox {
  float: left;
  width: 100%;
  height: 42px;
  background: #042f2f;
  border-radius: 4px;
  margin-top: 15px;
  transition: all 500ms;
  border-bottom: 1px solid #056c6d;
  box-shadow: inset 0 1px 1px 1px rgba(2, 20, 20, 0.6);
}

.bdbox .icon {
  float: left;
  width: 22px;
  height: 22px;
  line-height: 22px;
  font-size: 20px;
  color: #058687;
  margin: 10px 6px;
}

#mm_see {
  float: left;
  width: 22px;
  height: 22px;
  line-height: 22px;
  font-size: 20px;
  color: #058687;
  margin: 10px 6px;
  cursor: pointer;
}
.srk {
  float: left;
  width: 78%;
  height: 40px;
  border: none;
  color: #058687;
  font-size: 16px;
  outline: none;
  background: none;
}

.srk:focus {
  color: #53f6f7;
}

.anniu {
  float: left;
  width: 100%;
  height: 42px;
  border-radius: 4px;
  margin-top: 15px;
  background: linear-gradient(#016869, #042f2f);
  transition: all 500ms;
  border: none;
  text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.5);
  font-size: 18px;
}

.un_butt {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 0 1px 1px rgba(7, 137, 137, 0.6);
  color: #011010;
}

.butt {
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5),
    inset 0 0 1px 1px rgba(7, 137, 137, 0.6);
  cursor: pointer;
  /*光标:手型*/
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
}

.butt:hover {
  background: linear-gradient(#016869, #042f2f);
}

.butt:active {
  background: linear-gradient(#016869, #042f2f);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 0 1px 1px rgba(7, 137, 137, 0.6);
}

.centerbox .buttonClass {
  color: white;
  cursor: pointer;
}
</style>
