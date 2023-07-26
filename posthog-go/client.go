package posthog

type Client struct {
	// ...
}

func (c *Client) Page(url string) {
	c.Capture("$pageview", map[string]interface{}{"$current_url": url})
}