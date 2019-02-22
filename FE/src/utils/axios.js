import axios from 'axios'

const ajax = (options) =>{
    let _react = options.react === undefined ? true : options.react;
    return axios(options)
            .then(res =>{
                return res
            })
            .catch(err=>{
                return err
            })
}
export default ajax