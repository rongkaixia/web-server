import config from '../../config';
const protocol = require('../../../lib/protocol/protocol_pb')

export function queryProduct(id) {
  let tmp = {
    id: "124fda405i2",
    type: "neck",
    name: "经典 - 18k白金翡翠吊坠",
    type_name: "吊坠",
    brief_desc: ["精选心型翡翠吊坠", "18k白金、18k黄金", "吊坠大小 - 1.8cm * 0.5cm * 0.2cm"], // 简要描述，用于购买页展示
    choices: [
      {id: 1, name: "材质", value: ["18k白金", "18k黄金", "18k玫瑰金"]},
      {id: 2, name: "手寸", value: ["11", "12", "13", "14", "15"]}
    ], //商品选择
    specs: [
      {name: "大小", value: ["主石大小 1.8cm * 0.5cm * 0.2cm", "吊坠大小 1.8cm * 0.5cm * 0.2cm"]},
      {name: "重量", value: ["主石重量 0.018g", "吊坠总重量 1.02g"]}
    ], //参数
    hero_image: "static/diaozhui.jpg", //商品主图，单张图片， 用于点击进入详情页或购买页面
    gallery: {}, //商品gallery，多张
    banner: {} // banner图片，用于商品详细页面
  }
  if (id) {
    return tmp;
  }else {
    return {necklaces: [tmp, tmp, tmp, tmp]}
  }
}
