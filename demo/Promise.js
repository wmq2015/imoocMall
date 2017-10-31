let checklogin = () => {
    return new Promise((resolve,reject) => {
        let flag = document.cookie.indexOf('userId') > -1 ? true : false;
        if(flag = true){
            resolve({
                status: 0,
                result: true
            })
        }else{
            reject('error')
        }
    })
};

let getUserInfo = () => {
    return new Promise((reslove,reject) => {
        let userInfo = {
            userId: '101'
        }
        reslove(userInfo)
    })
}

checklogin().then((res) => {
    if(res.status == 0){
        document.write(`login success <br>`)
        return getUserInfo()
    }
}).catch((error) => {
    document.write(`login errors: ${error} <br>`)
}).then((res2) => {
    document.write(`userId: ${res2.userId} <br>`)
})

Promise.all([checklogin(), getUserInfo()]).then(([res1, res2]) => {
    document.write(`result1: ${res1.result},result2: ${res2.userId} <br>`)
})

