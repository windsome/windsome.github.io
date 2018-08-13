### Docker管理
0. 参考
  [大白话Docker入门（一）](https://yq.aliyun.com/articles/63035?spm=a2c4e.11155435.0.0.754cdb563UjTYN)
  [大白话Docker入门（二）](https://yq.aliyun.com/articles/63517?spm=a2c4e.11153940.blogcont63035.15.7c565711cZjyZU)
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

