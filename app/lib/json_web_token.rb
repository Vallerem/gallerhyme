class JsonWebToken
  # secret to encode and decode token
  HMAC_SECRET = Rails.application.credentials.secret_key_base

  def self.encode(payload, exp = 24.hours.from_now)
    # payload[:exp] = exp.to_i
    payload.reverse_merge!(meta)
    JWT.encode(payload, HMAC_SECRET)
  end

  def self.decode(token)
    # get payload; first index in decoded Array
    body = JWT.decode(token, HMAC_SECRET)[0]
    HashWithIndifferentAccess.new body
    # rescue from all decode errors
  rescue JWT::DecodeError => e
    # raise custom error to be handled by custom handler
    raise ExceptionHandler::InvalidToken, e.message
  end

  def self.valid_payload(payload)
    if expired(payload) || payload["iss"] != meta[:iss] || payload["aud"] != meta[:aud]
      return false
    else
      return true
    end
  end

  def self.meta
    {
      # exp: nil, No expiring Date
      iss: "issuer_name",
      aud: "client",
    }
  end

  def self.expired(payload)
    Time.at(payload["exp"]) < Time.now
  end
end
