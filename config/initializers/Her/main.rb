CCTRAY_API = Her::API.new
puts Settings.urls.cctray
CCTRAY_API.setup url: Settings.urls.cctray do |conn|
  conn.use FaradayMiddleware::Instrumentation
  conn.use Faraday::Request::UrlEncoded
  conn.use Faraday::Adapter::NetHttp
  conn.use Faraday::Response::RaiseError
  conn.response :logger
end