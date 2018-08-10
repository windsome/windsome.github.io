### Docker管理
1. docker一般维护
  + 安装docker`apt-get install docker.io`
  + 添加当前用户到docker组,避免频繁输入sudo.
  ```
    ll /var/run/docker.sock 
    sudo gpasswd -a ${USER} docker
    sudo service docker restart
    reboot
  ```
  + `docker version` 查看客户端及服务器端docker版本号
  + `docker images` 查看安装的images
  + `docker ps` 查看当前运行了几个docker container
  + `docker ps -a` 查看运行了几个docker container,包含之前运行过的.
  + `docker pull <image-name>` 从docker服务器拉去一个image, 如`docker pull hello-world`
  + `docker run hello-world` 运行某个image
2. dockerfile生成image
  + 编辑`dockerfile`,下面是构建nginx的例子
  ```
FROM ubuntu:12.10

# Update OS.
RUN echo "deb http://archive.ubuntu.com/ubuntu quantal main universe multiverse" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get upgrade -y

# Install basic packages.
RUN apt-get install -y software-properties-common
RUN apt-get install -y curl git htop unzip vim wget

# Add files.
ADD root/.bashrc /root/.bashrc
ADD root/.gitconfig /root/.gitconfig
ADD root/scripts /root/scripts
  ```
  + `docker build -t="dockerfile/ubuntu" github.com/dockerfile/ubuntu`构建image
  + `docker images`查看构建出来的image

### K8S管理
1. 
2. 

