import PostHog from 'posthog-node';

PostHog.prototype.page = function(url: string) {
    this.capture('$pageview', {'$current_url': url});
};