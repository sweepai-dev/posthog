require 'posthog'

class PostHog::Client
  def page(url)
    capture('$pageview', {'$current_url' => url})
  end
end