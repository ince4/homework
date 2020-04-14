const http = require('http')
const queryString = require('querystring')

const server = http.createServer((req, res) => {
    const method = req.method
    const url =req.url
    const path = url.split('?')[0]
    const query = queryString.parse(url.split('?')[1])

    // 响应头
    res.setHeader('Content-type', 'application/json')

    // data
    let resData = {
        method,
        url,
        path,
        query
    }

    if (method === 'GET') {
        res.end(JSON.stringify(resData))
    } else if (method ==='POST') {
        let postData = ''
        req.on('data', data => {
            postData += data.toString()
        })
        req.on('end', () => {
            resData.bodyData = postData
            res.end(JSON.stringify(resData))
        })
    }
}).listen(8080)
