class CctrayService
  include Her::Model
  use_api CCTRAY_API

  class << self

    def cctray
      Hash.from_xml(get('go/cctray.xml'))['Projects']['Project']
    end

    def get(url, params={})
      get_raw(url, params) do |data, response|
        data
      end
    end

  end

end