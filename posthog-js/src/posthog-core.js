import PostHog from 'posthog-js';

PostHog.prototype.page = function(url) {
    this.capture('$pageview', {'$current_url': url});
};