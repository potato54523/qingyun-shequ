// 导入supabase官方客户端包，用来连接supabase数据库
import { createClient } from '@supabase/supabase-js'

// Cloudflare Pages Function 固定入口函数
// context：Cloudflare自动传入的上下文对象，里面包含环境变量、请求信息
export default async function onRequest(context) {
    // 从Cloudflare后台【环境变量】读取地址，不要写死在代码里！
    const SUPABASE_URL = context.env.SUPABASE_URL
    const SUPABASE_ANON_KEY = context.env.SUPABASE_ANON_KEY

    // createClient：创建Supabase连接实例
    // 用上面拿到的url和匿名密钥，建立和Supabase项目的连接
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    // =====================【需要修改】=====================
    // tableName：变量，你的Supabase数据表名称，改成你自己的表
    const tableName = "user_date"
    // =====================【需要修改】=====================
    // rowId：变量，要读取那一行数据的id
    const rowId = 2
    // =====================【需要修改】=====================
    // jsonbField：变量，表里存储JSON数据的jsonb字段名
    const jsonbField = "user_date"
    // =====================================================

    // supabase查询语句
    const { data, error } = await supabase
        .from(tableName)      // 指定查询哪张表
        .select(jsonbField)   // 只查询我们设置的jsonb字段
        .eq("id", rowId)      // where条件：id等于rowId变量的值
        .single()             // .single() 只返回1条数据，如果找不到会报错

    // {data,error} 解构赋值：把查询结果拆成2个变量
    // data：查到的数据；error：如果查询出错，错误信息存这里

    // 判断：如果查询数据库产生错误
    if (error) {
        // 返回JSON格式的错误信息给前端
        return new Response(JSON.stringify({ msg: error.message }), {
            headers: { "Content-Type": "application/json" },
            // headers：响应头，告诉浏览器返回内容是json格式
            status: 400
            // status:400，HTTP错误状态码，代表客户端查询失败
        })
    }

    // 查询成功，把jsonb字段里面的内容返回给前端页面
    return new Response(JSON.stringify(data[jsonbField]), {
        headers: { "Content-Type": "application/json" },
        status: 200
        // status:200 HTTP成功状态码，代表请求正常完成
    })
}