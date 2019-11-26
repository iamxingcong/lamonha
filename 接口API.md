### 00 共用
```
1. 获取TelCode
    GET:/api/tel_code/
2. 判断用户(邮箱/手机号)是否注册
    GET:/api/user/check/?phone=13436711111
    GET:/api/user/check/?email=2922011111@qq.com
3. 发送验证码
    POST:/api/verify_code/
        参数：
            email	邮箱 email 与 phone有一项必填
            phone   手机号 email 与 phone有一项必填
            business_type: 必填
                PHONE_REGISTER      # 手机注册
                EMAIL_REGISTER      # 邮箱注册
                PHONE_CHANGE        # 手机更换
                EMAIL_CHANGE        # 邮箱更换
                PHONE_RESET_PWD     # 手机找回密码
                EMAIL_RESET_PWD     # 邮箱找回密码
                PHONE_VERIFY_USER   # 手机号验证是本人操作
                EMAIL_VERIFY_USER   # 邮箱验证是本人操作
                PHONE_SMS_LOGIN     # 手机验证码登录
4. 验证验证码是否有效 
    POST:/api/verify_code/check/
        参数：
            email	邮箱 email 与 phone有一项必填
            phone   手机号 email 与 phone有一项必填
            code    验证码     必填
            business_type   验证码业务类型     必填
```

### 1 用户注册
#### 手机注册
```
1. 获取TelCode
    GET:/api/tel_code/
2. 判断用户(邮箱/手机号)是否注册
    GET:/api/user/check/?phone=13436711111
    GET:/api/user/check/?email=2922011111@qq.com
3. 发送验证码(手机注册)
    POST:/api/verify_code/
4. 验证验证码是否有效(手机短信验证码)
    POST:/api/verify_code/check/
5. 手机号注册
    POST:/api/user/register/
        参数:
            phone
            password
            code
            business_type   PHONE_REGISTER
```

#### 邮箱注册
```
1. 判断用户(邮箱/手机号)是否注册
    GET:/api/user/check/?phone=13436711111
    GET:/api/user/check/?email=2922011111@qq.com
2. 发送验证码(邮箱注册)
    POST:/api/verify_code/
3. 验证验证码是否有效(邮箱验证码)
    POST:/api/verify_code/check/
4. 邮箱注册
    POST:/api/user/register/
        参数:
            email
            password
            code
            business_type   EMAIL_REGISTER
```


### 2 用户登录
#### 手机密码登录
```
1. 获取TelCode
    GET:/api/tel_code/
2. 判断用户(邮箱/手机号)是否注册
    GET:/api/user/check/?phone=13436711111
    GET:/api/user/check/?email=2922011111@qq.com
3. 手机密码登录
    POST:/api/user/login/
        参数:
            phone       手机号
            password    密码
```

#### 邮箱密码登录
```
1. 判断用户(邮箱/手机号)是否注册
    GET:/api/user/check/?phone=13436711111
    GET:/api/user/check/?email=2922011111@qq.com
2. 邮箱登录
    POST:/api/user/login/
        参数:
            email       邮箱
            password    密码
```

#### 手机验证码登录
```
1. 获取TelCode
    GET:/api/tel_code/
2. 判断用户(邮箱/手机号)是否注册
    GET:/api/user/check/?phone=13436711111
    GET:/api/user/check/?email=2922011111@qq.com
3. 发送验证码(手机验证码登录)
    POST:/api/verify_code/
4. 验证验证码是否有效(手机短信验证码)
    POST:/api/verify_code/check/
5. 手机验证码登录
    POST:/api/user/sms_login/
        参数:
            phone       手机号
            code        验证码
```


### 3. 找回密码
#### 手机找回密码
```
1. 获取TelCode
    GET:/api/tel_code/
2. 判断用户(邮箱/手机号)是否注册
    GET:/api/user/check/?phone=13436711111
    GET:/api/user/check/?email=2922011111@qq.com
3. 发送验证码(手机验证码)
    POST:/api/verify_code/
4. 验证验证码是否有效(手机短信验证码)
    POST:/api/verify_code/check/
5. 找回密码
    POST:/api/user/reset_password/
        参数:
            phone
            password
            code
            business_type   PHONE_RESET_PWD
```

#### 邮箱找回密码
```
1. 判断用户(邮箱/手机号)是否注册
    GET:/api/user/check/?phone=13436711111
    GET:/api/user/check/?email=2922011111@qq.com
2. 发送验证码(邮箱验证码)
    POST:/api/verify_code/
3. 验证验证码是否有效(邮箱验证码)
    POST:/api/verify_code/check/
4. 找回密码
    POST:/api/user/reset_password/
        参数:
            email
            password
            code
            business_type   EMAIL_RESET_PWD
```
