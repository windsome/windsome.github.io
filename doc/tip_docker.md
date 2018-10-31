### Docker管理
0. 参考
  [大白话Docker入门（一）](https://yq.aliyun.com/articles/63035?spm=a2c4e.11155435.0.0.754cdb563UjTYN)
  [大白话Docker入门（二）](https://yq.aliyun.com/articles/63517?spm=a2c4e.11153940.blogcont63035.15.7c565711cZjyZU)
  [Docker 常用命令](http://www.cnblogs.com/me115/p/5539047.html)
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
  + `docker run -d -p 8080:80 hub.c.163.com/library/nginx:latest` 在某个端口运行nginx
  + 停止、启动、杀死、重启一个容器
  ```
    docker stop Name/ID  
    docker start Name/ID  
    docker kill Name/ID  
    docker restart name/ID
  ```
2. docker高级维护
  + `docker attach <id、container_name>`附着到正在运行的容器, id通过`docker ps`获取
  + `docker exec -t -i <id、container_name> /bin/bash` 进入正在运行的容器内部，同时运行bash(比attach更好用)

3. 设置service允许的端口范围
    默认范围为`30000~32767`修改`/etc/kubernetes/manifests/kube-apiserver.yaml`,添加 `- --service-node-port-range=79-40000` 这个配置，设定允许的端口
    `KUBE_SERVICE_ADDRESSES="--service-cluster-ip-range=10.254.0.0/16 --service-node-port-range=79-40000`

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
  + 修改docker image的tag及名称`docker tag ca1b6b825289 registry.cn-hangzhou.aliyuncs.com/jtb-api-server:v1.0`或`docker tag 2a57f872a16b localhost/jtb-api-server:v1.0.0`

### K8S管理
1. k8s-node维护命令
  + `kubectl get nodes`
  + `kubectl delete node hostname.company.net` 删除某个Node. 见<https://stackoverflow.com/questions/33671449/how-to-restart-kubernetes-nodes>
  + 重启kubelet
  ```
  systemctl enable kubectl
  systemctl restart kubectl
  ```
  + 切换当前namesapce为kube-system
    查看配置 `kubectl config view`  
    设置对应的命名空间配置 `kubectl config set-context nanhua --namespace=risk-management`  
    选择该命名空间`kubectl config use-context nanhua`  

2. pods维护命令
  + `kubectl create -f ./my-nginx-rc.yaml`创建一个rc,其中有两个pod
  ```
apiVersion: v1
kind: ReplicationController
metadata:
  name: my-nginx
spec:
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        resources:
          limits:
            memory: "128Mi"
            cpu: "500m"
        ports:
        - containerPort: 80
  ```
  + `kubectl get pods` 查看当前容器
  + `kubectl describe pod my-nginx-gy1ij`描述某个容器
  + `kubectl get events`列出所有事件
  + `kubectl get events --namespace=my-namespace`列出某个命名空间下事件
  + `kubectl logs <pod>`检查某个pod的日志
  + `kubectl get pods --all-namespaces -o wide`查看所有命名空间下的内容

3. 部署相关
  <https://blog.csdn.net/qq1010885678/article/details/48832067>
  + `kubectl run my-nginx --image=nginx --replicas=2 --port=80`启动2个拷贝的nginx
  + `kubectl get pods`查看pods
  + 暴露服务给外网
  方法1:`kubectl expose rc my-nginx --port=30000 --type=LoadBalancer`通过端口将应用连接到Internet上  
  方法2:`kubectl expose deployment my-nginx --port=30000 --target-port=80 --type=NodePort`  
  有时第一种方法不起作用,第二种方法才起作用.  
  + 删除服务svc`kubectl delete svc my-nginx`
  + 删除rc`kubectl delete rc my-nginx`,不起作用!!

4. 安装dashboard:`kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml`


### 疑难问题
1. docker服务器的代理配置
见<https://www.jianshu.com/p/2e0c9ed5433d>,<https://blog.csdn.net/chang_harry/article/details/52116305> 
  + 创建配置文件`/etc/systemd/system/docker.service.d/http-proxy.conf`,内容如下:
  ```
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:34743"
  ```
  + 刷新配置`sudo systemctl daemon-reload`
  + 验证下配置是否正常加载：`systemctl show --property=Environment docker`
  + 重启docker：`sudo systemctl restart docker`
2. `journalctl -u kubelet -n 100`查看kubelet日志分析问题,可能会发现如下日志
  ```
8月 11 12:05:44 windsome-XXC kubelet[2904]: E0811 12:05:44.091078    2904 remote_runtime.go:92] RunPodSandbox from runtime service failed: rpc error: code = Unknown desc = failed pulling image "gcr.io/google_containers/pause-amd64:3.0": Error response from daemon: Get https://gcr.io/v2/: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
8月 11 12:05:44 windsome-XXC kubelet[2904]: E0811 12:05:44.091203    2904 kuberuntime_sandbox.go:54] CreatePodSandbox for pod "my-alpine-69d9f445cf-bzr24_default(b477a0d9-9d18-11e8-9218-7c7635904a6b)" failed: rpc error: code = Unknown desc = failed pulling image "gcr.io/google_containers/pause-amd64:3.0": Error response from daemon: Get https://gcr.io/v2/: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
8月 11 12:05:44 windsome-XXC kubelet[2904]: E0811 12:05:44.091258    2904 kuberuntime_manager.go:633] createPodSandbox for pod "my-alpine-69d9f445cf-bzr24_default(b477a0d9-9d18-11e8-9218-7c7635904a6b)" failed: rpc error: code = Unknown desc = failed pulling image "gcr.io/google_containers/pause-amd64:3.0": Error response from daemon: Get https://gcr.io/v2/: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
  ```
可以分析出来gcr.io被墙了导致下载超时.
3. 设置docker的国内镜像
  见<https://blog.csdn.net/bwlab/article/details/50542261>
  + 修改`/etc/docker/daemon.json`,此文件可能一开始并不存在,则需要创建
  ```
{
  "registry-mirrors": [ "https://pee6w651.mirror.aliyuncs.com"]
}
  ```
  [Docker 镜像加速器 ](https://yq.aliyun.com/articles/29941)
  + 其他地址`http://hub-mirror.c.163.com`,`http://aad0405c.m.daocloud.io`

### 在阿里云上部署k8s
尝试[Kubernetes v1.11.x HA 全手动安装教程（TL; DR）](https://www.kubernetes.org.cn/4291.html)
[Ubuntu 16.04下kubeadm安装Kubernetes](https://blog.csdn.net/yan234280533/article/details/75136630)

[CentOS 7.4搭建Kubernetes 1.8.5集群](https://yq.aliyun.com/articles/500127?spm=5176.11065265.1996646101.searchclickresult.3c8c707blntqyw)


### 使用kubeadm搭建Kubernetes(1.10.2)集群（国内环境）
[使用kubeadm搭建Kubernetes(1.10.2)集群（国内环境）](http://www.cnblogs.com/RainingNight/p/using-kubeadm-to-create-a-cluster.html)
其中注意安装`kublet, kubadm, kubectl`时指定版本为`1.10.2-00`
```
  134  apt-get install kubelet=1.10.2-00
  135  apt-cache madison kubeadm
  136  apt-get install kubeadm=1.10.2-00
  137  apt-cache madison kubectl
  138  apt-get install kubectl=1.10.2-00
```
初始化master:`kubeadm init --kubernetes-version=v1.10.2 --feature-gates=CoreDNS=true --pod-network-cidr=192.168.0.0/16`
```
root@iZm5ee51qo3lgnj6mo6sz9Z:~# kubeadm init --kubernetes-version=v1.10.2 --feature-gates=CoreDNS=true --pod-network-cidr=192.168.0.0/16
[init] Using Kubernetes version: v1.10.2
[init] Using Authorization modes: [Node RBAC]
[preflight] Running pre-flight checks.
[certificates] Generated ca certificate and key.
[certificates] Generated apiserver certificate and key.
[certificates] apiserver serving cert is signed for DNS names [izm5ee51qo3lgnj6mo6sz9z kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local] and IPs [10.96.0.1 121.42.167.160]
[certificates] Generated apiserver-kubelet-client certificate and key.
[certificates] Generated etcd/ca certificate and key.
[certificates] Generated etcd/server certificate and key.
[certificates] etcd/server serving cert is signed for DNS names [localhost] and IPs [127.0.0.1]
[certificates] Generated etcd/peer certificate and key.
[certificates] etcd/peer serving cert is signed for DNS names [izm5ee51qo3lgnj6mo6sz9z] and IPs [121.42.167.160]
[certificates] Generated etcd/healthcheck-client certificate and key.
[certificates] Generated apiserver-etcd-client certificate and key.
[certificates] Generated sa key and public key.
[certificates] Generated front-proxy-ca certificate and key.
[certificates] Generated front-proxy-client certificate and key.
[certificates] Valid certificates and keys now exist in "/etc/kubernetes/pki"
[kubeconfig] Wrote KubeConfig file to disk: "/etc/kubernetes/admin.conf"
[kubeconfig] Wrote KubeConfig file to disk: "/etc/kubernetes/kubelet.conf"
[kubeconfig] Wrote KubeConfig file to disk: "/etc/kubernetes/controller-manager.conf"
[kubeconfig] Wrote KubeConfig file to disk: "/etc/kubernetes/scheduler.conf"
[controlplane] Wrote Static Pod manifest for component kube-apiserver to "/etc/kubernetes/manifests/kube-apiserver.yaml"
[controlplane] Wrote Static Pod manifest for component kube-controller-manager to "/etc/kubernetes/manifests/kube-controller-manager.yaml"
[controlplane] Wrote Static Pod manifest for component kube-scheduler to "/etc/kubernetes/manifests/kube-scheduler.yaml"
[etcd] Wrote Static Pod manifest for a local etcd instance to "/etc/kubernetes/manifests/etcd.yaml"
[init] Waiting for the kubelet to boot up the control plane as Static Pods from directory "/etc/kubernetes/manifests".
[init] This might take a minute or longer if the control plane images have to be pulled.
[apiclient] All control plane components are healthy after 24.001883 seconds
[uploadconfig] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[markmaster] Will mark node izm5ee51qo3lgnj6mo6sz9z as master by adding a label and a taint
[markmaster] Master izm5ee51qo3lgnj6mo6sz9z tainted and labelled with key/value: node-role.kubernetes.io/master=""
[bootstraptoken] Using token: n6lmc7.s1z7k6ogpferrau1
[bootstraptoken] Configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstraptoken] Configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstraptoken] Configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstraptoken] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes master has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of machines by running the following on each node
as root:

  kubeadm join 121.42.167.160:6443 --token n6lmc7.s1z7k6ogpferrau1 --discovery-token-ca-cert-hash sha256:e953eb6917cb6b56e6913deece81f69c24831373e4c1c7c8c3a38d986ea3f249
```

### kubernetes-dashboard(1.8.3)部署与踩坑
[kubernetes-dashboard(1.8.3)部署与踩坑](https://www.cnblogs.com/RainingNight/p/deploying-k8s-dashboard-ui.html)

### 操作记录
```
    1  wget https://github.com/kubeup/archon/releases/download/v0.3.0/archon-controller-v0.3.0-linux-amd64.gz
    2  ls
    3  wget https://github.com/kubeup/archon/releases/download/v0.3.0/archon-controller-v0.3.0-linux-amd64.gz
    4  vi .ssh/authorized_keys 
    5  vi /etc/hosts
    6  wget https://github.com/kubeup/archon/releases/download/v0.3.0/archon-controller-v0.3.0-linux-amd64.gz
    7  ls
    8  rm archon-controller-v0.3.0-linux-amd64.gz 
    9  ls
   10  systemctl stop firewalld && systemctl disable firewalld
   11  setenforce 0
   12  ls
   13  ifconfig
   14  ls
   15  vi /etc/hosts
   16  $ curl -fsSL https://get.docker.com/ | sh
   17  curl -fsSL https://get.docker.com/ | sh
   18  reboot
   19  ping get.docker.com
   20  ifconfig
   21  cat /etc/resolv.conf 
   22  cd /etc/
   23  cp resolv.conf resolv.conf.20180812
   24  vi resolv.conf
   25  resolvconf
   26  ping 223.5.5.5
   27  resolvconf 223.5.5.5
   28  ls /run/resolvconf/interface/
   29  cat /run/resolvconf/resolv.conf 
   30  vi resolv.conf
   31  ll resolv
   32  ll resolv.conf
   33  ll
   34  vi resolv.conf
   35  llcd
   36  cd
   37  ping get.docker.com
   38  curl -fsSL https://get.docker.com/ | sh
   39  systemctl enable docker && systemctl start docker
   40  cat <<EOF | tee /etc/sysctl.d/k8s.conf
   41  net.ipv4.ip_forward = 1
   42  net.bridge.bridge-nf-call-ip6tables = 1
   43  net.bridge.bridge-nf-call-iptables = 1
   44  EOF
   45  sysctl -p /etc/sysctl.d/k8s.conf
   46  swapoff -a && sysctl -w vm.swappiness=0
   47  vi /etc/fstab 
   48  wget ${KUBE_URL}/kubelet -O /usr/local/bin/kubelet
   49  apt install lrzsz -y
   50  swapoff -a
   51  wget https://d11.baidupcs.com/file/bd1076fb11b43568c838ca52a73bd85e?bkt=p3-00008d9da4653051b9c4f2c5a264116d2eef&xcode=992b2098c881de6c9ef1bae760d2a1c241e736d4978b23ef3b9ff89589aebd9f0bcfe8fcf2126a9492d06473ec36306a0b2977702d3e6764&fid=2550409439-250528-858992362126421&time=1534086237&sign=FDTAXGERLQBHSKa-DCb740ccc5511e5e8fedcff06b081203-6yBbsCgTLjNrMGdCeW%2Bx5iYLDms%3D&to=d11&size=53634362&sta_dx=53634362&sta_cs=78&sta_ft=gz&sta_ct=4&sta_mt=4&fm2=MH%2CYangquan%2CAnywhere%2C%2Cbeijing%2Cct&resv0=cdnback&resv1=0&vuk=1010784632&iv=0&htype=&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=00008d9da4653051b9c4f2c5a264116d2eef&sl=76480590&expires=8h&rt=sh&r=738091473&mlogid=5194289648603609678&vbdid=411777696&fin=002.001.k8s.deb.v1.11.1.tar.gz&fn=002.001.k8s.deb.v1.11.1.tar.gz&rtype=1&dp-logid=5194289648603609678&dp-callid=0.1.1&hps=1&tsl=80&csl=80&csign=cHFcKYZkCuUkckqqyYeSPA0p1vw%3D&so=0&ut=6&uter=4&serv=0&uc=293718707&ti=78cccb630bb0656e00a3f0e766a33e0b086b90df8e3e0da1&by=themis
   52  ls
   53  wget "https://d11.baidupcs.com/file/bd1076fb11b43568c838ca52a73bd85e?bkt=p3-00008d9da4653051b9c4f2c5a264116d2eef&xcode=992b2098c881de6c9ef1bae760d2a1c241e736d4978b23ef3b9ff89589aebd9f0bcfe8fcf2126a9492d06473ec36306a0b2977702d3e6764&fid=2550409439-250528-858992362126421&time=1534086237&sign=FDTAXGERLQBHSKa-DCb740ccc5511e5e8fedcff06b081203-6yBbsCgTLjNrMGdCeW%2Bx5iYLDms%3D&to=d11&size=53634362&sta_dx=53634362&sta_cs=78&sta_ft=gz&sta_ct=4&sta_mt=4&fm2=MH%2CYangquan%2CAnywhere%2C%2Cbeijing%2Cct&resv0=cdnback&resv1=0&vuk=1010784632&iv=0&htype=&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=00008d9da4653051b9c4f2c5a264116d2eef&sl=76480590&expires=8h&rt=sh&r=738091473&mlogid=5194289648603609678&vbdid=411777696&fin=002.001.k8s.deb.v1.11.1.tar.gz&fn=002.001.k8s.deb.v1.11.1.tar.gz&rtype=1&dp-logid=5194289648603609678&dp-callid=0.1.1&hps=1&tsl=80&csl=80&csign=cHFcKYZkCuUkckqqyYeSPA0p1vw%3D&so=0&ut=6&uter=4&serv=0&uc=293718707&ti=78cccb630bb0656e00a3f0e766a33e0b086b90df8e3e0da1&by=themis"
   54  ls
   55  curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://e2a6d434.m.daocloud.io
   56  systemctl restart docker.service
   57  ssh-copy-id --help
   58  man ssh-copy-id 
   59  ls
   60  wget https://pkg.cfssl.org/R1.2/cfssl_linux-amd64
   61  chmod +x cfssl_linux-amd64
   62  mv cfssl_linux-amd64 /usr/local/bin/cfssl
   63  wget https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
   64  chmod +x cfssljson_linux-amd64
   65  mv cfssljson_linux-amd64 /usr/local/bin/cfssljson
   66  wget https://pkg.cfssl.org/R1.2/cfssl-certinfo_linux-amd64
   67  chmod +x cfssl-certinfo_linux-amd64
   68  mv cfssl-certinfo_linux-amd64 /usr/local/bin/cfssl-certinfo
   69  mkdir /root/ssl
   70  ls
   71  cd ssl/
   72  vi ca-config.json
   73  vi ca-csr.json
   74  cfssl gencert -initca ca-csr.json | cfssljson -bare ca
   75  ls
   76  vi kubernetes-csr.json
   77  cat /etc/hosts
   78  vi kubernetes-csr.json
   79  cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=kubernetes kubernetes-csr.json | cfssljson -bare kubernetes
   80  vi kubernetes-csr.json
   81  vim admin-csr.json
   82  cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=kubernetes admin-csr.json | cfssljson -bare admin
   83  vim kube-proxy-csr.json
   84  cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=kubernetes kube-proxy-csr.json | cfssljson -bare kube-proxy
   85  mkdir -p /etc/kubernetes/ssl
   86  cp -r *.pem /etc/kubernetes/ssl/
   87  ls /etc/kubernetes/ssl/
   88  wget https://github.com/coreos/etcd/releases/download/v3.2.11/etcd-v3.2.11-linux-amd64.tar.gz
   89  cat <<EOF > /etc/apt/sources.list.d/kubernetes.list
   90  deb http://mirrors.ustc.edu.cn/kubernetes/apt kubernetes-xenial main
   91  EOF
   92  apt update
   93  curl -s http://packages.faasx.com/google/apt/doc/apt-key.gpg | sudo apt-key add -
   94  apt update
   95  apt-get install -y kubelet kubeadm kubectl
   96  docker pull reg.qiniu.com/k8s/kube-apiserver-amd64:v1.10.2
   97  docker pull reg.qiniu.com/k8s/kube-controller-manager-amd64:v1.10.2
   98  docker pull reg.qiniu.com/k8s/kube-scheduler-amd64:v1.10.2
   99  docker pull reg.qiniu.com/k8s/kube-proxy-amd64:v1.10.2
  100  docker pull reg.qiniu.com/k8s/etcd-amd64:3.1.12
  101  docker pull reg.qiniu.com/k8s/pause-amd64:3.1
  102  docker tag reg.qiniu.com/k8s/kube-apiserver-amd64:v1.10.2 k8s.gcr.io/kube-apiserver-amd64:v1.10.2
  103  docker tag reg.qiniu.com/k8s/kube-scheduler-amd64:v1.10.2 k8s.gcr.io/kube-scheduler-amd64:v1.10.2
  104  docker tag reg.qiniu.com/k8s/kube-controller-manager-amd64:v1.10.2 k8s.gcr.io/kube-controller-manager-amd64:v1.10.2
  105  docker tag reg.qiniu.com/k8s/kube-proxy-amd64:v1.10.2 k8s.gcr.io/kube-proxy-amd64:v1.10.2
  106  docker tag reg.qiniu.com/k8s/etcd-amd64:3.1.12 k8s.gcr.io/etcd-amd64:3.1.12
  107  docker tag reg.qiniu.com/k8s/pause-amd64:3.1 k8s.gcr.io/pause-amd64:3.1
  108  docker pull reg.qiniu.com/k8s/k8s-dns-sidecar-amd64:1.14.10
  109  docker pull reg.qiniu.com/k8s/k8s-dns-kube-dns-amd64:1.14.10
  110  docker pull reg.qiniu.com/k8s/k8s-dns-dnsmasq-nanny-amd64:1.14.10
  111  docker tag reg.qiniu.com/k8s/k8s-dns-sidecar-amd64:1.14.10 k8s.gcr.io/k8s-dns-sidecar-amd64:1.14.10
  112  docker tag reg.qiniu.com/k8s/k8s-dns-kube-dns-amd64:1.14.10 k8s.gcr.io/k8s-dns-kube-dns-amd64:1.14.10
  113  docker tag reg.qiniu.com/k8s/k8s-dns-dnsmasq-nanny-amd64:1.14.10 k8s.gcr.io/k8s-dns-dnsmasq-nanny-amd64:1.14.10
  114  ifconfig
  115  exit
  116  docker images
  117  kubeadm init --kubernetes-version=v1.10.2 --feature-gates=CoreDNS=true --pod-network-cidr=192.168.0.0/16
  118  docker --version
  119  apt remove docker-ce 
  120  apt-get install -y docker.io
  121  docker version
  122  docker images
  123  kubeadm init --kubernetes-version=v1.10.2 --feature-gates=CoreDNS=true --pod-network-cidr=192.168.0.0/16
  124  kubelet --version
  125  apt versions kubelet
  126  apt-cache show kubelet
  127  apt-get remove kubelet kubeadm kubectl 
  128  ls
  129  ssh -i c-key.pem root@39.106.8.77
  130  ifconfig
  131  ls
  132  apt-get install kubelet=1.10.2
  133  apt-cache madison kubelet
  134  apt-get install kubelet=1.10.2-00
  135  apt-cache madison kubeadm
  136  apt-get install kubeadm=1.10.2-00
  137  apt-cache madison kubectl
  138  apt-get install kubectl=1.10.2-00
  139  kubelet --version
  140  kubeadm init --kubernetes-version=v1.10.2 --feature-gates=CoreDNS=true --pod-network-cidr=192.168.0.0/16
  141  mkdir -p $HOME/.kube
  142  ls .kube/
  143  cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  144  id -u
  145  id -g
  146  kubectl apply -f http://mirror.faasx.com/kubernetes/installation/hosted/kubeadm/1.7/calico.yaml
  147  kubectl get pods --all-namespaces
  148  kubectl taint nodes --all node-role.kubernetes.io/master-
  149  kubectl get nodes
  150  kubeadm join 121.42.167.160:6443 --token n6lmc7.s1z7k6ogpferrau1 --discovery-token-ca-cert-hash sha256:e953eb6917cb6b56e6913deece81f69c24831373e4c1c7c8c3a38d986ea3f249
  151  kubectl get nodes
  152  kubectl get pods --all-namespaces
  153  kubectl get all --all-namespaces
  154  kubectl run my-nginx --image=nginx --replicas=2 --port=80
  155  kubectl get all --all-namespaces
  156  kubectl expose deployment my-nginx --port=30000 --target-port=80 --type=NodePort
  157  kubectl get all --all-namespaces
  158  kubectl apply -f http://mirror.faasx.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml
  159  kubectl get svc --all-namespaces
  160  kubectl get pod --all-namespaces
  161  kubectl create -f http://mirror.faasx.com/kubernetes/heapster/deploy/kube-config/influxdb/influxdb.yaml
  162  kubectl create -f http://mirror.faasx.com/kubernetes/heapster/deploy/kube-config/influxdb/grafana.yaml
  163  kubectl create -f http://mirror.faasx.com/kubernetes/heapster/deploy/kube-config/influxdb/heapster.yaml
  164  kubectl create -f http://mirror.faasx.com/kubernetes/heapster/deploy/kube-config/rbac/heapster-rbac.yaml
  165  kubectl get pod --all-namespaces
  166  kubectl get pod -n kube-system
  167  kubectl describe kube-apiserver-izm5ee51qo3lgnj6mo6sz9z -n kube-system
  168  kubectl get all -n kube-system
  169  kubectl describe service/kubernetes-dashboard -n kube-system
  170  kubectl describe service/kubernetes-dashboard -n kube-system -o yaml
  171  kubectl get service/kubernetes-dashboard -n kube-system -o yaml
  172  cd .kube/
  173  ls
  174  vi config 
  175  ls
  176  grep 'client-certificate-data' ~/.kube/config | head -n 1 | awk '{print $2}' | base64 -d >> kubecfg.crt
  177  grep 'client-key-data' ~/.kube/config | head -n 1 | awk '{print $2}' | base64 -d >> kubecfg.key
  178  ls
  179  openssl pkcs12 -export -clcerts -inkey kubecfg.key -in kubecfg.crt -out kubecfg.p12 -name "kubernetes-client"
  180  ls
  181  cd ..
  182  ls
  183  mkdir kubeback
  184  cd .kube/
  185  ls
  186  mv kubecfg.crt kubecfg.key kubecfg.p12 ../kubeback/
  187  ls
  188  cd ..
  189  ls
  190  cd kubeback/
  191  ls
  192  vi kubecfg.crt 
  193  vi kubecfg.key 
  194  ll
  195  ls
  196  cd ..
  197  ls
  198  cd .kube/
  199  ls
  200  cd
  201  ls
  202  vi admin-user.yaml
  203  kubectl create -f admin-user.yaml 
  204  vi admin-user-role-binding.yaml
  205  kubectl create -f  admin-user-role-binding.yaml
  206  kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
  207  history 
  208  history | grep apt
  209  reboot
  210  history 
```

### helm的安装
参考[helm-kubernetes包管理专家](http://www.cnblogs.com/vincenshen/p/8934442.html)
Helm部署方法二:
1. 安装Helm Client
  直接在[Helm Realese](https://github.com/kubernetes/helm/releases)页面下载二进制文件，这里下载的2.8.2版本，解压后将可执行文件helm拷贝到/usr/local/bin目录下即可，这样Helm客户端就在这台机器上安装完成了。
```
$ helm version
Client: &version.Version{SemVer:"v2.8.2", GitCommit:"a80231648a1473929271764b920a8e346f6de844", GitTreeState:"clean"}
```
2. 安装Helm Server
  + 执行命令`helm init`,
  + 由于 Helm 默认会去gcr.io拉取镜像，所以如果你当前执行的机器没有配置科学上网的话可以实现下面的命令代替：`helm init --upgrade --tiller-image cnych/tiller:v2.8.2`
  + 创建Tiller ServiceAccount
```
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'
```
查看结果:
```
$ helm version
Client: &version.Version{SemVer:"v2.8.2", GitCommit:"a80231648a1473929271764b920a8e346f6de844", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.8.2", GitCommit:"a80231648a1473929271764b920a8e346f6de844", GitTreeState:"clean"}
```
