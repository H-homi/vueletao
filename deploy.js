var node_ssh, ssh, site_dir, static_dir, filename, path
node_ssh = require('node-ssh');
ssh = new node_ssh;
path = require('path')

// 站点目录
site_dir = '/www/wwwroot/letao.com';
//要上传的目录
static_dir = './dist/';

// 连接
ssh.connect({
    host: '47.106.90.23',
    username: 'root',
    // 私钥的文件地址
    privateKey: 'C:/Users/kx190/.ssh/id_rsa'
}).then(function () {
    // 上传本地目录中的文件到远程服务器
    uploadDist();
})

//上传静态文件
function uploadDist() {
    console.log('静态文件上传中');
    // (要上传的静态目录,站点目录)
    ssh.putDirectory(static_dir, site_dir, {

        //递归上传
        recursive: true,
        // 并发
        concurrency: 10,

        // 验证文件
        validate: function (itemPath) {
            const baseName = path.basename(itemPath)
            // 过滤不需要上传文件
            return baseName.substr(0, 1) !== '.' && // do not allow dot files
                baseName !== 'node_modules' && baseName !== 'scss' // do not allow node_modules
        },

        tick: function (static_dir, site_dir, error) {
            if (error) {
                failed.push(static_dir)
            } else {
                // 成功上传文件到服务器
                successful.push(static_dir)
            }
        }

    }).then(function () {
        console.log('上传成功');
        // 进程退出
        process.exit();
    }, function (error) {
        console.error('错误信息:' + error.message);
    })
}
