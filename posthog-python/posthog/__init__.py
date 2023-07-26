from posthog import PostHog

def page(self, url):
    self.capture('$pageview', {'$current_url': url})
    
PostHog.page = page