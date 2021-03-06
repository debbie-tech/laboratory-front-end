const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const table = require('./table')
const software = require('./software')
const softwareCategory = require('./software-category')
const applicableSystem = require('./applicable-system')
const brand = require('./brand')
const unitPrice = require('./unit-price')
const countryCode = require('./country-code')
const manufacturer = require('./manufacturer')
const supplier = require('./supplier')
const consumableCategory = require('./consumable-category')
const consumable = require('./consumable')
const field = require('./field')
const model = require('./model')
const laboratory = require('./laboratory')
const laboratoryCategory = require('./laboratory-category')
const equipment = require('./equipment')
const equipmentCategory = require('./equipment-category')
const equComponents = require('./equ-components')
const equComponentsCategory = require('./equ-components-category')

const mocks = [
  ...user,
  ...table,
  ...software,
  ...softwareCategory,
  ...applicableSystem,
  ...brand,
  ...unitPrice,
  ...countryCode,
  ...manufacturer,
  ...supplier,
  ...consumableCategory,
  ...consumable,
  ...field,
  ...model,
  ...laboratory,
  ...laboratoryCategory,
  ...equipment,
  ...equipmentCategory,
  ...equComponents,
  ...equComponentsCategory
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}

