function handleType(genre,a2,data2,yemsline,ytmr,tmrAll,wtmrline){
    var genreType;
    var genreModels;
    if(genre=="线端"){
        genreType="aclineend";
        genreModels="lineEndModels";
    }else if(genre=="绕组"){
        genreType="transformerwinding";
        genreModels="transformerWindingModels";
    }else if(genre=="电容器"){
        genreType="compensator";
        genreModels="compensatorModels";
    }else if(genre=="机组"){
        genreType="generating_unit";
        genreModels="generatingUnitModels";
    }else if(genre=="站用电"){
        genreType="energyconsumer";
        genreModels="energyconsumerModels";
    }else if(genre=="虚拟设备"){
        genreType="virture_equipment";
        genreModels="virtureEquipmentModels";
    }else if(genre=="开关"){
        genreType="breaker";
        genreModels="unAttachedBreakers";

    }
    for(var i in this.jisuanline){
        var js=this.jisuan[i];
        var has=false;
        for (var b of a2[genreModels]) {
            if(b.mrid==js.mrid){
                has=true;
            }
        }  
        if(!has){
            this.jisuanline.splice(i,1);
            this.jisuan.splice(this.jisuan.indexOf(js.mrid),1); 
        }        
    }
        if (a2[genreModels].length > 0) {
                      for (var b of a2[genreModels]) {
                        xiufuleft.push({
                          mrid: b.mrid,
                          name: b.pathName,
                          bvId: b.bvId,
                          type: genre=="站用电"?genre:(b.energyconsumerType == 1
                            ? "站用变"
                            : b.energyconsumerType == 2
                              ? "备用"
                              : b.energyconsumerType == 3
                                ? "消弧线圈"
                                : b.energyconsumerType == 4 ? "电表" : "其他")
                        });
                        if (
                          b.otherKey3 != "" &&
                          b.otherKey3 != null &&
                          b.otherKey3 != undefined
                        ) {
                          var cy = false;
                          for (var d of data2.voltageLevelModels) {
                            for (var c of d[genreModels]) {
                              if (b.otherKey3 == c.mrid) {
                                cy = true;
                                yemsline.push(c.mrid);
                                ytmr.push([
                                  {
                                    name: b.localName,
                                    numone: 3
                                  },
                                  {
                                    name: c.name,
                                    numone: 3
                                  },
                                  {
                                    name: "解除",
                                    hasClick: true,
                                    mrid: b.mrid,
                                    type: genreType
                                  }
                                ]);
                                tmrAll.push([
                                  {
                                    name: "",
                                    hasInput: true,
                                    mrid: b.mrid,
                                    bvId: a2.bvId,
                                    numone: 1
                                  },
                                  {
                                    name: genre=="站用电"?genre:(b.energyconsumerType == 1
                                        ? "站用变"
                                        : b.energyconsumerType == 2
                                          ? "备用"
                                          : b.energyconsumerType == 3
                                            ? "消弧线圈"
                                            : b.energyconsumerType == 4 ? "电表" : "其他"),
                                    numone: 1
                                  },
                                  {
                                    name: b.localName,
                                    numone: 3
                                  },
                                  {
                                    name: c.name,
                                    numone: 3
                                  },
                                  {
                                    name: "关联",
                                    numone: 1,
                                    c: true,
                                    hasClick: true
                                  }
                                ]);
                              }
                            }
                          }
                          if (!cy) {
                            wtmrline.push({
                              name: b.localName,
                              mrid: b.mrid,
                              type: genreType
                            });
                          }
                        } else {
                          wtmrline.push({
                            name: b.localName,
                            mrid: b.mrid,
                            type: genreType
                          });
                        }
                      }
                    }
    

}
function getTypeLeft(models,name,xiufuleft){
    if (models.length > 0) {
        for (var b of models) {
          xiufuleft.push({
            mrid: b.mrid,
            name: b.pathName,
            bvId: b.bvId,
            type: name
          });
        }
      }
}
function getJisuan(models,jisuanline){
    for (var a of models) {
        if (this.jisuan.indexOf(a.mrid) == -1) {
          this.jisuan.push(a.mrid);
          jisuanline.push({ mrid: a.mrid });
          this.xiufuright.push({
            mrid: a.mrid,
            name: a.pathName,
            bvId: a.bvId,
            type: "线端"
          });
        }
      }
}
function getqueshi(data2,yemsline,genre){
    var genreModels;
    if(genre=="线端"){
        genreModels="lineEndModels";
    }else if(genre=="绕组"){
        genreModels="transformerWindingModels";
    }else if(genre=="电容器"){
        genreModels="compensatorModels";
    }else if(genre=="机组"){
        genreModels="generatingUnitModels";
    }else if(genre=="站用电"){
        genreModels="energyconsumerModels";
    }else if(genre=="虚拟设备"){
        genreModels="virtureEquipmentModels";
    }else if(genre=="开关"){
        genreModels="unAttachedBreakers";
    }
    var linequeshi = [];
                for (var a of data2.voltageLevelModels) {
                  if (a.bvId == bvId) {
                    for (var b of a[genreModels]) {
                      if (yemsline.indexOf(b.mrid) == -1) {
                        linequeshi.push({
                          name: b.name,
                          mrid: b.mrid
                        });
                      }
                    }
                  }
                }
                for (var i = 0; i < linequeshi.length; i++) {
                    tmrAll.push([
                      {
                        name: "",
                        hasInput: true,
                        mrid: linequeshi[i].mrid,
                        queshi: true,
                        localName: linequeshi[i].name,
                        numone: 1
                      },
                      {
                        name: genre,
                        numone: 1
                      },
                      {
                        name: "缺失",
                        hasClick: true,
                        bgc: true,
                        numone: 3
                      },
                      {
                        name: linequeshi[i].name,
                        numone: 3
                      },
                      {
                        name: "未关联",
                        numone: 1,
                        hasClick: true,
                        c: true
                      }
                    ]);
                  
                }
}
pathName,bvName,localName,mrId,localId;
this.jisuanline = this.shanchuarr(this.jisuanline, a);
          this.jisuantrans = this.shanchuarr(this.jisuantrans, a);
          this.jisuanbre = this.shanchuarr(this.jisuanbre, a);
          this.jisuancom = this.shanchuarr(this.jisuancom, a);
          this.jisuanene = this.shanchuarr(this.jisuanene, a);
          this.jisuangen = this.shanchuarr(this.jisuangen, a);
          this.jisuanvir = this.shanchuarr(this.jisuanvir, a);