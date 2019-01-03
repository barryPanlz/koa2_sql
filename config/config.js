// 配置文件
const app = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    database: 'blog',//名字
    password: '123456789',
    connectionLimit: 50 // 最大连接数
}
module.exports = app;