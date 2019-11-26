### 00 共用
```
1. 获取TelCode
    GET:/api/tel_code/
2. 判断用户(邮箱/手机号)是否注册
    POST:/api/user/check/
        参数:
            phone:  +8613436711111
            email:  2922011111@qq.com
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
    POST:/api/user/check/
        参数:
            phone:  +8613436711111
            email:  2922011111@qq.com
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
    POST:/api/user/check/
        参数:
            phone:  +8613436711111
            email:  2922011111@qq.com
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
    POST:/api/user/check/
        参数:
            phone:  +8613436711111
            email:  2922011111@qq.com
3. 手机密码登录
    POST:/api/user/login/
        参数:
            phone       手机号
            password    密码
```

#### 邮箱密码登录
```
1. 判断用户(邮箱/手机号)是否注册
    POST:/api/user/check/
        参数:
            phone:  +8613436711111
            email:  2922011111@qq.com
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
    POST:/api/user/check/
        参数:
            phone:  +8613436711111
            email:  2922011111@qq.com
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
    POST:/api/user/check/
        参数:
            phone:  +8613436711111
            email:  2922011111@qq.com
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
    POST:/api/user/check/
        参数:
            phone:  +8613436711111
            email:  2922011111@qq.com
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


### 4. 曲库页
```
1. 音乐标签
    GET:/api/music_category/
2. 音乐列表
    GET:/api/music/
        参数:
            search(搜索): uuid, name, album_id, album__name, lyricist, composer, arranged_by, factoid, keyword
            ordering(排序): -created_at(创建时间逆序 最新)，-order(最热)
            过滤:
                styles: 风格 styles=10,11
                moods: 情绪 moods=12,13
                instruments: 乐器 instruments=14,15
                tempo_notes_id: 速度 tempo_notes_id=16
                album_id: 专辑ID
                length__gt: 时长大于
                length__lte: 时长小于等于
3. 同版本音乐
    GET:/api/music/<uuid>/tracks/
4. 推荐曲单
    GET:/api/playlist/recommend/
5. 音乐试听
    GET:/api/music/<uuid>/preview/
6. 音乐试听下载(需要登录)
    GET:/api/music/<uuid>/download_preview/
7. 项目搜索列表(音乐列表中添加到项目的这个项目列表)
    GET:/api/project_search/
        参数:
            search(搜索): uuid, name, desc
8. 添加音乐到项目中
    POST:/api/project/<uuid>/music_add/
        参数:
            uuids   音乐uuid列表
9. 项目创建
    POST:/api/project/
        参数:
            name    项目名
            desc    项目描述(非必填)
            type    COMPANY/PERSONAL
            use_name    使用方名字
```

#### 4.1 音乐详情页
```
1. 音乐详情
    GET:/api/music/<uuid>/
2. 多版本音乐
    GET:/api/music/{uuid}/tracks/
3. 相似音乐推荐
    GET:/api/music/{uuid}/relates/
``` 


### 5. 曲单页
```
1. 曲单列表
    GET:/api/playlist/
        参数:
            search(搜索): uuid, name, desc
            ordering(排序): -created_at(创建时间逆序 最新)，-order(最热)
            过滤:
                categories: 标签 categories=10,11

```

#### 5.1 曲单详情页
```
1. 曲单详情
    GET:/api/playlist/<uuid>/
2. 曲单音乐列表
    GET:/api/playlist/<uuid>/musics/
```


### 6. 专辑页
```
1. 曲单详情
    GET:/api/album/
        参数:
            search(搜索): uuid, name, album_no, desc
            ordering(排序): -created_at(创建时间逆序 最新)，-order(最热)
```

#### 6.1 专辑详情页
```
1. 曲单详情
    GET:/api/album/<uuid>/
2. 专辑音乐列表
    GET:/api/album/<uuid>/musics/
```


### 7. 厂牌页
```
1. 厂牌列表
    GET:/api/label/
        参数:
            search(搜索): uuid, name, desc
            ordering(排序): -created_at(创建时间逆序 最新)，-order(最热)
```

#### 7.1 厂牌详情页
```
1. 厂牌详情
    GET:/api/label/{uuid}/
2. 厂牌下专辑列表
    GET:/api/label/{uuid}/albums/
```


### 8. 授权查询

### 9. 个人中心
#### 9.1 头像下拉
```
1. 我的未读消息数
    GET:/api/message/unread_count/
```

#### 9.2 项目列表
```
1. 创建项目
    POST:/api/project/
        参数:
            name    项目名
            desc    项目描述(非必填)
            type    COMPANY/PERSONAL
            use_name    使用方名字
2. 项目列表
    GET:/api/project/
        参数:
            search(搜索): uuid, name, desc
3. 删除项目
    DELETE:/api/project/<uuid>/
```

#### 9.3 项目详情
```
1. 项目详情
    GET:/api/project/<uuid>/
2. 项目下音乐列表
    GET:/api/project/<uuid>/musics/
3. 项目下音乐下载
    POST:/api/project/<uuid>/download_preview/     # 下载试听
        参数:
            music_id  音乐ID
    POST:/api/project/<uuid>/download_Mp3/     # 下载Mp3
        参数:
            music_id  音乐ID
    POST:/api/project/<uuid>/download_Wav/     # 下载Wav
        参数:
            music_id  音乐ID
4. 项目下音乐移除
    POST:/api/project/<uuid>/music_remove/
5. 添加音乐到项目中
    POST:/api/project/<uuid>/music_add/
        参数:
            uuids   音乐uuid列表
```

#### 9.4 修改项目信息
```
1. 修改项目消息
    PUT:/api/project/<uuid>/
        name        项目名
        use_name    使用方名称
        desc        描述
```

#### 9.5 下载记录
```
1. 下载记录
    GET:/api/download/
2. 删除下载记录
    DELETE:/api/download/<id>/
```

#### 9.6 我的消息
```
1. 消息列表
    GET:/api/message/
2. 未读消息数
    GET:/api/message/unread_count/
3. 消息删除
    DELETE:/api/message/<id>/
```

#### 9.7 会员管理
```

```

#### 9.8 申请会员
```

```

#### 9.9 编辑资料
```
1. 当前用户详情
    GET:/api/user/profile/
2. 修改用户信息
    PATCH:/api/user/profile_update/
        参数:
            name
            company_name
            city_name
            desc
            career
3. 修改密码
    PUT:/api/user/change_password/
        参数:
            old_password
            new_password
4. 绑定手机号
    
5. 绑定邮箱
    
```
