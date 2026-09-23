// Cloudflare Pages Function固定入口函数
// 浏览器访问 /api/read 就会执行这个函数
export async function onRequest(context) {

  // 从Cloudflare后台环境变量读取Supabase网址
  // 代码里不会写真实网址，前端浏览器看不到
  const SUPABASE_URL = context.env.SUPABASE_URL;

  // 从Cloudflare后台环境变量读取Supabase密钥
  // 密钥存后台，不会出现在前端源码
  const SUPABASE_ANON_KEY = context.env.SUPABASE_ANON_KEY;

  // 导入supabase客户端库
  const { createClient } = require('@supabase/supabase-js');
  // 创建连接数据库的对象
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // 执行数据库查询：
  // from("data") → 查询表名叫 data 的表
  // select("info") → 只取出 info 这个jsonb字段
  // eq("id",1) → 后端硬编码，只操作id=1这一行，前端不传递id
  // single() → 只返回单行数据
  const { data, error } = await supabase
    .from("user_data")
    .select("user date")
    .eq("id", 1)
    .single();

  // 如果数据库查询出错，返回错误信息给前端
  if (error) {
    return Response.json({ error: error.message });
  }

  // 把查询得到的info对象返回给浏览器前端
  return Response.json({ info: data.info });
}