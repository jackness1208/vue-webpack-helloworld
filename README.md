# YY.COM -H5 项目

## 环境说明
项目基于 `webpack + vuejs + gulp` 搭建, 需要在 `node >= 4.0.0` 环境下运行

### 全局安装以下组件
```unix
$ npm install webpack webpack-dev-server -g
```

## 项目初始化
```unix
$ npm install
```

## 命令说明
运行 webpack 打包
```unix
$ webpack
```

运行 webpack 打包并监听
```unix
$ webpack -w
```

运行 webpack 打包并压缩
```unix
$ webpack -p
```

运行 webpack 打包并建立 本地服务器
访问地址 `http://127.0.0.1:5000`
```unix
$ webpack-dev-server --inline --hot
```

通过 gulp 执行 webpack 打包
```unix
$ gulp all
```

```unix
$ gulp webpack
```


通过 gulp 执行 webpack 打包 并建立本地服务器
```unix
$ gulp watch
```

提交代码到 各个 svn
```unix
# --sub 提交分支 test|release|trunk
# --git 是否拉取最新 git 代码
$ gulp commit --sub <branch> --git
```


