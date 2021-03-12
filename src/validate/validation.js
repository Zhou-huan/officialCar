export default {
  required: {
    getMessage (field, args) {
      return field + '不能为空'
    },
    validate (value) {
      return value.length !== 0
    }
  },
  digital: {
    getMessage (field, args) {
      return field + '只能为合法的数字'
    },
    validate (value) {
      let reg = /^([1-9]{1}\d*)$/
      return reg.test(value)
    }
  },
  phoneRules: {
    getMessage (field, args) {
      return field + '号码格式不正确'
    },
    validate (value) {
      /**
         * 1、中国移动拥有号段为：134、135、136、137、138、139、147、148、150、151、152、157、158、159、178、182、183、184、187、188、198、1440、1703、1705、1706
         * 2、中国联通拥有号段为：130、131、132、155、156、185、186、145、146、166、167、175、176、1704、1707、1708、1709、1710、1711、1712、1713、1714、1715、1716、1717、1718、1719
         * 3、中国电信拥有号段为：133、153、177、180、181、189、191、199、1349、1410、1700、1701、1702、1740
      */
      let reg = /^1(3([0-345-9]\d|4[1-8])|4[14-9]\d|5([01235689]\d|7[1-79])|66\d|7(0|1)\d|7[2-35-8]\d|740|8\d{2}|9[389]\d)\d{7}$/
      return reg.test(value)
    }
  },
  numRules: {
    getMessage (field, args) {
      return field + '只能为合法的正整数'
    },
    validate (value) {
      let reg = /^[1-9]\d*$/
      return reg.test(value)
    }
  }
}
