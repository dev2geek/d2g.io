http://d2g.io 网站代码。

### 安装

    npm install
    bower install


### 数据库

初始化

    knex migrate:latest

回滚

    knex migrate:rollback

### gulp

启动开发环境

    gulp dev

模板编译

    gulp style:prepare
    gulp style:compile

JS代码格式化

    gulp format:js

打包

    gulp dist

