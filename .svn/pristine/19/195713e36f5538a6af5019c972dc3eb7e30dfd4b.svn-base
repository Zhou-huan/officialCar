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
      let reg = /^1\d{10}$/
      return reg.test(value)
    }
  }
}
