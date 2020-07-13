
const count = 20;
const List = []

for (let i = 1; i <= count; i++){
  List.push({
    id: i,
    name: '耗材分类' + i,
    english_name: 'eng-cc' + i,
    description: 'desc-cc'
  })
}

module.exports = [
  {
    url: '/api/consumableCategory/infos',
    type: 'get',
    response: config => {
      console.log('config query = ', config.query)
      let {pageNum, pageSize, name} = config.query
      if (!pageSize && !pageNum && !name){
        return {
          code: 20000,
          data: {
            total: List.length,
            list: List
          }
        }
      }
      const list = List.filter(m => m.name===name )
      return {
        code: 20000,
        data: {
          total: list.length,
          list: list
        }
      }
    }
  },
  {
    url: '/api/consumableCategory/detail',
    type: 'get',
    response: config => {
      const {id} = config.query
      let tempData = List.filter(m => m.id === id * 1).pop()
      // console.log({...tempData})
      return {
        code: 20000,
        data: {
          item: tempData
        }
      }
    }
  },
  {
    url: '/api/consumableCategory/create',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: {
          msg: 'success'
        }
      }
    }
  },
  {
    url: '/api/consumableCategory/delete',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        data: {
          msg: 'success'
        }
      }
    }
  },
  {
    url:'/api/consumableCategory/modify',
    type: 'put',
    response: config => {
      return {
        code: 20000,
        data: {
          msg: 'success'
        }
      }
    }
  }
]
