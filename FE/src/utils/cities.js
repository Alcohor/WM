const cities = (cities) =>{
    let arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    let obj ={}
    arr.forEach(item => obj[item] = [] )
    cities.forEach(item =>{
        let word = item.pinyin.substr(0,1)
        obj[word].push(item)
    })
    for(const key in obj){
        if ( !obj[key].length ){
            delete obj[key]
        }
    }
    return obj
}

export default cities