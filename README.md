# AWS CloudFormation Template Example

### 1. Node Application on EC2 Instance

### 2. MySQL Engine of RDS Instance 

### 3. AWS::CloudFormation::Init Metadata Configuration on aws-cfn-bootstrap
#### 1. packages: yum install
#### 2. sources: tarball download from github's repository
#### 3. files
1. redhat SysV init scripts
2. db.env of mysql connection credential & Sequelize ORM Configuration
#### 4. commands: npm install
#### 5. services: sysvinit enable and start