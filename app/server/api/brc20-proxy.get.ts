import { defineEventHandler, getQuery, setResponseStatus, setResponseHeaders } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const tick = query.tick as string || ''
    const limit = query.limit as string || '10'
    const offset = query.offset as string || '0'
    
    // 构建目标 API URL
    let apiUrl = `https://v2api.bestinslot.xyz/brc2.0`
    
    // 添加查询参数
    const params = new URLSearchParams()
    if (tick) params.append('tick', tick)
    if (limit) params.append('limit', limit)
    if (offset) params.append('offset', offset)
    
    if (params.toString()) {
      apiUrl += `?${params.toString()}`
    }
    
    console.log('Fetching API URL:', apiUrl) // 调试日志

    // 发起请求到目标 API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Nutkin-BRC20-Client/1.0'
      }
    })

    if (!response.ok) {
      setResponseStatus(event, response.status)
      return {
        error: true,
        message: `API request failed with status ${response.status}`,
        status: response.status
      }
    }

    // 获取响应数据
    const data = await response.json()

    // 设置适当的响应头
    setResponseHeaders(event, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })

    return data
  } catch (error: any) {
    console.error('Error fetching BRC20 data:', error)
    setResponseStatus(event, 500)
    return {
      error: true,
      message: 'Failed to fetch data from external API',
      details: error.message
    }
  }
})